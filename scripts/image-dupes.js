#!/usr/bin/env node
/**
 * Duplicate-image check over the content photos listed in
 * public/photos/manifest.json: sha256 of each photo (same bytes under a
 * different name) plus a difference hash (dHash) of the full image AND its
 * centre 60% crop, compared pairwise (distance > 10 = not a dupe). A crop
 * is only caught when it is near a 20% margin (the centre crop is 20%-80%):
 * measured on a real photo, a 10% margin gives distance 15 and a 30% margin
 * gives 21, both over the threshold of 10. No multi-scale matching. Includes
 * a positive control: a synthetic 20%-margin crop of a real photo is run
 * through the same pair-compare code as the catalog and must be reported,
 * so a silently-broken hash or loop can't pass by never triggering.
 *
 * No new dependency: sharp ships with next (its image optimizer).
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const MANIFEST_PATH = path.join(ROOT, "public", "photos", "manifest.json");

async function dhash(buf, centre) {
  let img = sharp(buf).greyscale();
  if (centre) {
    const { width = 0, height = 0 } = await sharp(buf).metadata();
    img = img.extract({
      left: Math.round(width * 0.2),
      top: Math.round(height * 0.2),
      width: Math.round(width * 0.6),
      height: Math.round(height * 0.6),
    });
  }
  const px = await img.resize(9, 8, { fit: "fill" }).raw().toBuffer();
  let h = 0n;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      h = (h << 1n) | (px[y * 9 + x] > px[y * 9 + x + 1] ? 1n : 0n);
    }
  }
  return h;
}

function bits(n) {
  return n.toString(2).replace(/0/g, "").length;
}

function resolveFile(key) {
  // manifest keys are relative to public/, e.g. "photos/2026/foo.jpg" or
  // "bar-photo.webp"
  return path.join(ROOT, "public", key);
}

const THRESHOLD = 10;

// The one pair-compare used by both the catalog scan and the control.
function findPairs(list) {
  const out = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const a = list[i];
      const b = list[j];
      const d = Math.min(
        bits(a.full_hash ^ b.full_hash),
        bits(a.full_hash ^ b.centre_hash),
        bits(a.centre_hash ^ b.full_hash),
      );
      if (d <= THRESHOLD) out.push({ a, b, d });
    }
  }
  return out;
}

async function main() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  const keys = Object.keys(manifest).sort();

  // Only hash actual image files (manifest is image-only already, but be
  // defensive about extension).
  const imageKeys = keys.filter((k) => /\.(jpe?g|png|webp)$/i.test(k));

  console.log(`Hashing ${imageKeys.length} content photos from manifest.json...`);

  const entries = [];
  for (const key of imageKeys) {
    const full = resolveFile(key);
    const buf = fs.readFileSync(full);
    const sha256 = crypto.createHash("sha256").update(buf).digest("hex");
    const full_hash = await dhash(buf, false);
    const centre_hash = await dhash(buf, true);
    entries.push({ key, sha256, full_hash, centre_hash });
  }

  const failures = [];

  // 1. Exact-byte duplicates (same file content under a different name).
  const bySha = new Map();
  for (const e of entries) {
    if (!bySha.has(e.sha256)) bySha.set(e.sha256, []);
    bySha.get(e.sha256).push(e.key);
  }
  for (const [sha, fileKeys] of bySha) {
    if (fileKeys.length > 1) {
      failures.push({
        type: "identical-bytes",
        files: fileKeys,
        detail: `sha256 ${sha.slice(0, 12)}...`,
      });
    }
  }

  // 2. Perceptual duplicates / re-crops (dHash distance <= 10).
  for (const p of findPairs(entries)) {
    failures.push({
      type: "perceptual-duplicate",
      files: [p.a.key, p.b.key],
      detail: `dHash distance ${p.d} (threshold > ${THRESHOLD})`,
    });
  }

  // 3. Positive control: add a synthetic centre crop of a real photo as an
  // extra entry and run it through the SAME pair-compare (findPairs) as the
  // catalog; the control passes only if that loop reports the pair.
  const controlEntry = entries.find((e) => /\.(jpe?g)$/i.test(e.key));
  let controlPassed = false;
  let controlDistance = null;
  if (controlEntry) {
    const buf = fs.readFileSync(resolveFile(controlEntry.key));
    const { width = 0, height = 0 } = await sharp(buf).metadata();
    const crop = await sharp(buf)
      .extract({
        left: Math.round(width * 0.2),
        top: Math.round(height * 0.2),
        width: Math.round(width * 0.6),
        height: Math.round(height * 0.6),
      })
      .jpeg()
      .toBuffer();
    const synthetic = {
      key: "__control-centre-crop__",
      full_hash: await dhash(crop, false),
      centre_hash: await dhash(crop, true),
    };
    const reported = findPairs([controlEntry, synthetic]).find(
      (p) => p.a === controlEntry && p.b === synthetic,
    );
    controlPassed = Boolean(reported);
    controlDistance = reported ? reported.d : null;
  }

  console.log("");
  if (failures.length === 0) {
    console.log("No duplicate images found among manifest content photos.");
  } else {
    console.log(`Found ${failures.length} potential duplicate pair(s)/group(s):`);
    for (const f of failures) {
      console.log(`  [${f.type}] ${f.files.join("  <->  ")}  (${f.detail})`);
    }
  }

  console.log("");
  console.log(
    controlPassed
      ? `Positive control OK: a re-crop of ${controlEntry.key} was correctly flagged (distance ${controlDistance}).`
      : `Positive control FAILED: a re-crop of ${controlEntry ? controlEntry.key : "n/a"} was NOT reported by the pair loop - the check cannot be trusted.`,
  );

  if (!controlPassed) {
    process.exitCode = 1;
  }
  // Duplicates are reported, not treated as a build failure per the brief
  // (list them, don't fix / don't block).
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
