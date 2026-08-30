import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const home = fs.readFileSync(new URL("./index.html", import.meta.url), "utf8");
const proof = fs.readFileSync(new URL("./proof/index.html", import.meta.url), "utf8");
const sitemap = fs.readFileSync(new URL("./sitemap.xml", import.meta.url), "utf8");

test("home nav, footer, and free-copy link the public proof note", () => {
  assert.match(home, /<nav class="links">[\s\S]*href="proof\/">Proof/);
  assert.match(home, /<footer>[\s\S]*href="proof\/">Proof/);
  assert.match(home, /href="proof\/">heat-lot → body stamp → MTR chain/);
  assert.match(sitemap, /https:\/\/fieldproofhq\.github\.io\/proof\//);
});

test("proof page states the heat-lot → stamp → MTR chain and allowed facts only", () => {
  assert.match(proof, /Heat lot → body stamp → MTR/);
  assert.match(proof, /Fieldproof proof/);
  assert.match(proof, /not a pipe catalog/);
  assert.match(proof, /not a product for sale/);
  assert.match(proof, /A stranger can use it without paying/);
  assert.match(proof, /The pour is the heat/);
  assert.match(proof, /mill cert \(MTR\) writes chemistry and mechanicals for that specific heat/);
  assert.match(proof, /The stamp on the piece is the only link/);
  assert.match(proof, /If the heat on the body does not appear on the MTR, treat the piece as unidentified/);
  assert.match(proof, /Type 3\.1 is mill QA/);
  assert.match(proof, /signed independent of production/);
  assert.match(proof, /Type 3\.2 adds independent inspection/);
  assert.match(proof, /Type 2\.2 is not a heat-specific 3\.1 or 3\.2/);
  assert.match(proof, /PMI \(API RP 578 \/ MSS SP-137\) is a second instrument on the metal/);
  assert.match(proof, /It does not replace the MTR/);
});

test("proof page cites NTIA as primary and Pathnovo as vendor-not-primary", () => {
  assert.match(proof, /Primary cite/);
  assert.match(proof, /NTIA/);
  assert.match(proof, /Valve Nameplates, MTRs &amp; Material Identification/);
  assert.match(proof, /5 Feb 2026/);
  assert.match(proof, /https:\/\/ntia\.no\/valve-nameplates-mtrs-material-identification\//);
  assert.match(proof, /nameplate vs PO\/datasheet/);
  assert.match(proof, /MTR vs specified grade/);
  assert.match(proof, /physical marks\/PMI vs both/);
  assert.match(proof, /Heat number on the valve must appear on the MTR/);
  assert.match(proof, /Vendor note — not primary/);
  assert.match(proof, /Pathnovo/);
  assert.match(proof, /https:\/\/pathnovo\.com\/standards\/mtr/);
  assert.match(proof, /heat number is on the material and on the cert/i);
});

test("proof page stays free: no paywall, store prices, or invented figures", () => {
  assert.doesNotMatch(proof, /gumroad/i);
  assert.doesNotMatch(proof, /store\.3labs\.io/);
  assert.doesNotMatch(proof, /buy\.stripe\.com/);
  assert.doesNotMatch(proof, /\$42/);
  assert.doesNotMatch(proof, /\$39/);
  assert.doesNotMatch(proof, /\$168/);
  assert.doesNotMatch(proof, /wanted=true/);
  assert.doesNotMatch(proof, /rel="payment"/);
  assert.doesNotMatch(proof, /class="cta"/);
  assert.doesNotMatch(proof, /Pay \$/);
  assert.doesNotMatch(proof, /Buy /);
  assert.doesNotMatch(proof, /Hill POST/i);
  assert.doesNotMatch(proof, /TAM|total addressable|market size|billion/i);
  assert.doesNotMatch(proof, /university|WashU|Washington University|Saint Louis University|\bSLU\b/i);
  assert.doesNotMatch(proof, /180,000|90%/);
  const citeHrefs = [...proof.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
  const allowed = new Set([
    "https://x.com/FieldProofAI",
    "https://github.com/fieldproofhq",
    "https://ntia.no/valve-nameplates-mtrs-material-identification/",
    "https://pathnovo.com/standards/mtr",
  ]);
  for (const href of citeHrefs) {
    assert.ok(allowed.has(href), `unexpected outbound link: ${href}`);
  }
});
