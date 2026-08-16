import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

test("virtual C-suite contracts are fetchable for humans and agents", () => {
  const index = fs.readFileSync(path.join(root, "csuite", "index.html"), "utf8");
  assert.match(index, /Buy the role|load it/i);
  assert.match(index, /fractional-cmo-launch-kit\?wanted=true/);
  assert.match(index, /agentic-ai-governance-pack\?wanted=true/);
  assert.match(index, /buy\.stripe\.com\/eVq4gA91U3Rr1Yt6z31sQ00/);
  assert.match(index, /Pay \$42 with card/);
  assert.match(index, /Get the \$42 pack/);
  assert.match(index, /6oU28sa5Y9bLgTn9Lf1sQ01/);
  assert.match(index, /Pay \$42 for the CFO kit/);
  assert.match(index, /4gM7sM4LEafPcD72iN1sQ02/);
  assert.match(index, /Pay \$42 for the COO kit/);
  assert.match(index, /http-equiv="refresh"/);
  assert.match(index, /location\.replace\("https:\/\/buy\.stripe\.com\/eVq4gA91U3Rr1Yt6z31sQ00"\)/);
  assert.match(index, /rel="payment"/);
  for (const role of ["cmo", "cfo", "coo", "cto", "ciso"]) {
    const system = fs.readFileSync(path.join(root, "csuite", role, "SYSTEM.md"), "utf8");
    const kit = JSON.parse(fs.readFileSync(path.join(root, "csuite", role, "kit.json"), "utf8"));
    assert.match(system, /One-sentence position/);
    assert.match(system, /buy\.stripe\.com\/eVq4gA91U3Rr1Yt6z31sQ00/);
    assert.ok(kit.role);
    assert.equal(kit.checkoutUsd42, "https://buy.stripe.com/eVq4gA91U3Rr1Yt6z31sQ00");
    assert.ok((kit.audience || []).includes("LLM") || (kit.audience || []).includes("autonomous agent"));
    const roleHtml = fs.readFileSync(path.join(root, "csuite", role, "index.html"), "utf8");
    assert.match(roleHtml, /buy\.stripe\.com\/eVq4gA91U3Rr1Yt6z31sQ00/);
    assert.match(roleHtml, /agentic-ai-governance-pack\?wanted=true/);
    assert.match(roleHtml, /rel="payment"/);
    assert.match(roleHtml, /Get the \$42 pack/);
    assert.match(roleHtml, /http-equiv="refresh"/);
    assert.match(roleHtml, /location\.replace\("https:\/\/buy\.stripe\.com\/eVq4gA91U3Rr1Yt6z31sQ00"\)/);
  }
  const cmo = fs.readFileSync(path.join(root, "csuite", "cmo", "SYSTEM.md"), "utf8");
  assert.match(cmo, /Homepage test/);
  assert.doesNotMatch(index, /Self-buys do not count/i);
  const cooHtml = fs.readFileSync(path.join(root, "csuite", "coo", "index.html"), "utf8");
  assert.match(cooHtml, /4gM7sM4LEafPcD72iN1sQ02/);
  assert.match(cooHtml, /Fractional-COO-Launch-Kit\.zip/);
  assert.ok(fs.existsSync(path.join(root, "csuite", "coo", "Fractional-COO-Launch-Kit.zip")));
  assert.ok(fs.statSync(path.join(root, "csuite", "coo", "Fractional-COO-Launch-Kit.zip")).size > 20000);
});
