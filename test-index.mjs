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
  assert.match(html, /Pay \$42 with card/);
  assert.match(html, /fieldproofhq\.github\.io\/pay\//);
  assert.match(html, /buy\.stripe\.com\/eVq4gA91U3Rr1Yt6z31sQ00/);
  assert.match(html, /fractional-cmo-launch-kit\?wanted=true/);
  assert.match(html, /csuite\/cmo/);
  assert.doesNotMatch(html, /Self-buys do not count/i);
  assert.match(html, /background:var\(--accent\)/);
  const reference = fs.readFileSync(new URL("./agent-governance-reference.html", import.meta.url), "utf8");
  assert.match(reference, /buy\.stripe\.com\/eVq4gA91U3Rr1Yt6z31sQ00/);
  const pay = fs.readFileSync(new URL("./pay/index.html", import.meta.url), "utf8");
  assert.match(pay, /Pay \$42 with card/);
  assert.match(pay, /buy\.stripe\.com\/eVq4gA91U3Rr1Yt6z31sQ00/);
  assert.match(pay, /create-qr-code/);
  assert.match(pay, /Affirm/);
  assert.doesNotMatch(pay, /Self-buys do not count/i);
  const llms = fs.readFileSync(new URL("./llms.txt", import.meta.url), "utf8");
  assert.match(llms, /buy\.stripe\.com\/eVq4gA91U3Rr1Yt6z31sQ00/);
  assert.match(llms, /fieldproofhq\.github\.io\/pay\//);
});
