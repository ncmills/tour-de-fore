/**
 * Final gap filler — adds remaining course URLs and second lodging options.
 * Run: npx tsx scripts/final-gaps.ts
 */

import * as fs from "fs";
import * as path from "path";

const urls: Record<string, string> = {
  // Southwest
  "The Rim Golf Club": "https://www.rimgolf.com",
  // Pacific NW
  "Widgi Creek Golf Club": "https://www.widgi.com",
  // Mountain West
  "Tomahawk Country Club": "https://www.golftomahawk.com",
  "Arrowhead Country Club": "https://www.arrowheadcc.com",
  // Southeast
  "The Oaks Golf Club": "https://www.theoaksgolfclub.com",
  "Bay Creek Resort - Nicklaus Course": "https://www.baycreekresort.com/golf",
  "Bay Creek Resort - Palmer Course": "https://www.baycreekresort.com/golf",
  "Hells Point Golf Club": "https://www.hellspoint.com",
  "Cypress Point Country Club": "https://www.cypresspointcc.com",
  "Caledonia Golf & Fish Club": "https://www.caledoniagolfandfishclub.com",
  "Sea Island Golf Club - Seaside Course": "https://www.seaisland.com/golf",
  "Sea Island Golf Club - Plantation Course": "https://www.seaisland.com/golf",
  "Sea Island Golf Club - Retreat Course": "https://www.seaisland.com/golf",
  "The King and Prince Golf Course": "https://www.kingandprince.com/golf",
  "Reynolds - The Oconee Course": "https://www.reynoldslakeoconee.com/golf",
  "Reynolds - The National Course": "https://www.reynoldslakeoconee.com/golf",
  "Reynolds - The Landing Course": "https://www.reynoldslakeoconee.com/golf",
  "Reynolds - The Creek Club": "https://www.reynoldslakeoconee.com/golf",
  "Reynolds - Great Waters": "https://www.reynoldslakeoconee.com/golf",
  // Northeast
  "Willowbend Country Club": "https://www.willowbendcc.com",
  "Lake Placid Club - Peaks Course": "https://www.lakeplacidclub.com",
  "Kingsmill Resort - Woods Course": "https://www.kingsmill.com/golf",
  "Golden Horseshoe - Green Course": "https://www.colonialwilliamsburg.org/golf",
  "Ballston Spa Country Club": "https://www.ballstonspacc.com",
  "Airway Meadows Golf Club": "https://www.airwaymeadowsgolf.com",
  "Seneca Lake Country Club": "https://www.senecalakecc.com",
  "Reservoir Creek Golf Club": "https://www.reservoircreekgolf.com",
  "Buck Hill Golf Club": "https://www.buckhillgolf.com",
  "Taconic Golf Club": "https://www.taconicgolf.com",
  "Waubeeka Golf Links": "https://www.waubeeka.com",
  "Wahconah Country Club": "https://www.wahconahcc.com",
  "Country Club of Vermont": "https://www.ccvermont.com",
  "Purpoodock Club": "https://www.purpoodockclub.com",
  "Val Halla Golf Course": "https://www.valhallagolf.com",
  "Webhannet Golf Club": "https://www.webhannet.com",
  "Cape Arundel Golf Club": "https://www.capearundelgolfclub.com",
  "Green Valley Country Club": "https://www.greenvalleycc.com",
  "Montaup Country Club": "https://www.montaupcc.com",
  "Wanumetonomy Golf & Country Club": "https://www.wanumetonomy.com",
  "Hershey Links": "https://www.hersheypa.com/things-to-do/golf",
  "Iron Valley Golf Club": "https://www.ironvalleygc.com",
  "Windham Mountain Golf Club": "https://www.windhammountain.com/golf",
  "Sunny Hill Resort & Golf Course": "https://www.sunnyhill.com",
  "Thunderhart Golf Course": "https://www.thunderhartgolf.com",
  "Christman's Windham House Golf Course": "https://www.christmansgolf.com",
  "Bethlehem Country Club": "https://www.bethlehemcc.com",
  "Bar Harbor Golf Course": "https://www.barharborgolfcourse.com",
  "Northeast Harbor Golf Club": "https://www.nehgc.com",
  "Rocky Ridge Golf Club": "https://www.rockyridgevt.com",
  "Kwiniaska Golf Club": "https://www.kwiniaska.com",
  "Christman's Golf Course": "https://www.christmansgolf.com",
  "Avalon Golf Club": "https://www.avalonlinks.com",
  "Shennecossett Golf Course": "https://www.shennecossettgolf.com",
  "Elmridge Golf Course": "https://www.elmridgegolf.com",
  "Casperkill Golf Club": "https://www.casperkillgolf.com",
  "Beekman Country Club": "https://www.beekmancountryclub.com",
  // South Central
  "Comanche Trace": "https://www.comanchetrace.com",
  "Hot Springs Country Club - Arlington Course": "https://www.hotspringscc.com",
  "Hot Springs Country Club - Majestic Course": "https://www.hotspringscc.com",
  "Diamante Golf Club": "https://www.diamantegolfclub.com",
  "Belvedere Country Club": "https://www.belvederecc.com",
  "Falconhead Golf Club": "https://www.falconheadaustin.com",
  "Avery Ranch Golf Club": "https://www.averyranchgolf.com",
  "Texas Star Golf Course": "https://www.texasstargolf.com",
  "Wildcat Golf Club - Highlands": "https://www.wildcatgolfclub.com",
  "BlackHorse Golf Club - North Course": "https://www.blackhorsegolfclub.com",
  "Moody Gardens Golf Course": "https://www.moodygardensgolf.com",
  "Persimmon Ridge Golf Club": "https://www.persimmonridgegolf.com",
  "Chariot Run Golf Course": "https://www.chariotrun.com",
  "Quail Chase Golf Club": "https://www.quailchasegolf.com",
  "Heritage Hill Golf Club": "https://www.heritagehillgolf.com",
  "The Club at Indian Springs - East Course": "https://www.indianspringsgolf.com",
  "Battle Creek Golf Club": "https://www.battlecreekgolf.com",
  "Forest Ridge Golf Club": "https://www.forestridgegc.com",
  "Mohawk Park Golf Course": "https://www.mohawkparkgolf.com",
  "Jimmie Austin OU Golf Club": "https://www.soonergolf.com",
  "Lincoln Park Golf Course - East Course": "https://www.okc.gov/golf",
  "Earlywine Park Golf Course": "https://www.okc.gov/golf",
  "The Golf Club of Edmond": "https://www.golfedmond.com",
  "The Golf Club at Stonebridge": "https://www.stonebridgegolf.com",
  "Querbes Park Golf Course": "https://www.shreveportla.gov/golf",
  "Northwood Hills Golf Course": "https://www.northwoodhillsgolf.com",
  "East Ridge Country Club": "https://www.eastridgecc.com",
  "Chenal Country Club": "https://www.chenalcc.com",
  "Rebsamen Park Golf Course": "https://www.rebsamengolf.com",
  "Maumelle Country Club": "https://www.maumellecc.com",
  "The Alotian Club": "https://www.thealotianclub.com",
  "Santa Maria Golf Course": "https://www.santamariagolf.com",
  "Webb Memorial Golf Course": "https://www.webbparkmunigolf.com",
  "Sycamore Creek Golf Club": "https://www.sycamorecreekgolf.com",
  "Galveston Country Club": "https://www.galvestoncc.com",
  "Wildcat Golf Club - Lakes Course": "https://www.wildcatgolfclub.com",
  "Bay Oaks Country Club": "https://www.bayoakscc.com",
};

const dataDir = path.join(__dirname, "..", "src", "data");
const files = fs.readdirSync(dataDir).filter(f => f.startsWith("destinations-") && f.endsWith(".ts"));

let urlsAdded = 0;
let ratingsAdded = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;

  for (const [courseName, url] of Object.entries(urls)) {
    const nameStr = `name: "${courseName}"`;
    const idx = content.indexOf(nameStr);
    if (idx === -1) continue;

    let bc = 0, cs = content.lastIndexOf("{", idx), ce = cs;
    for (let i = cs; i < content.length; i++) {
      if (content[i] === "{") bc++;
      if (content[i] === "}") bc--;
      if (bc === 0) { ce = i; break; }
    }
    const block = content.slice(cs, ce + 1);

    if (!block.includes("url:")) {
      const hi = block.indexOf("highlight:");
      if (hi > 0) {
        const insertAt = cs + hi;
        content = content.slice(0, insertAt) + `url: "${url}",\n        ` + content.slice(insertAt);
        modified = true;
        urlsAdded++;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${file}`);
  }
}

console.log(`\nURLs added: ${urlsAdded}`);
