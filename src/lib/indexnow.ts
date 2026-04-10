// IndexNow integration. Filename of the key file in /public IS the key value.
// Used by /api/indexnow/route.ts and scripts/submit-indexnow.ts.

export const INDEXNOW_KEY = "1a2f2ae1dc5846a194019a0d9c7a677f";
export const INDEXNOW_HOST = "tourdefore.com";
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export function buildIndexNowPayload(urls: string[]): IndexNowPayload {
  return {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: urls,
  };
}

export async function submitToIndexNow(urls: string[]): Promise<{
  ok: boolean;
  status: number;
  submitted: number;
}> {
  if (urls.length === 0) return { ok: true, status: 200, submitted: 0 };
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(buildIndexNowPayload(urls)),
  });
  return { ok: res.ok, status: res.status, submitted: urls.length };
}
