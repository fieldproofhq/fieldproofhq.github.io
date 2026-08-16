import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const html = fs.readFileSync(new URL("./index.html", import.meta.url), "utf8");

test("mission page pay CTAs are visible and point at live $42 store rails", () => {
  assert.match(html, /--accent\s*:/);
  assert.doesNotMatch(html, /starts at \$3/);
  assert.doesNotMatch(html, /from \$3/);
  assert.match(html, /href="https:\/\/store\.3labs\.io"/);
  assert.match(html, /agentic-ai-governance-pack\?wanted=true/);
  assert.match(html, /tip-jar\?wanted=true/);
  assert.match(html, /Browse the store/);
  assert.match(html, /fractional-cmo-launch-kit\?wanted=true/);
  assert.match(html, /csuite\/cmo/);
  assert.doesNotMatch(html, /Self-buys do not count/i);
  assert.match(html, /background:var\(--accent\)/);
});
