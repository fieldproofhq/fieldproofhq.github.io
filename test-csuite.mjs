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
  assert.match(index, /buy\.stripe\.com\/eVq4gA91U3Rr1Yt6z31sQ00/);
  assert.match(index, /Pay \$42 with card/);
  for (const role of ["cmo", "cfo", "coo", "cto", "ciso"]) {
    const system = fs.readFileSync(path.join(root, "csuite", role, "SYSTEM.md"), "utf8");
    const kit = JSON.parse(fs.readFileSync(path.join(root, "csuite", role, "kit.json"), "utf8"));
    assert.match(system, /One-sentence position/);
    assert.ok(kit.role);
    assert.ok((kit.audience || []).includes("LLM") || (kit.audience || []).includes("autonomous agent"));
  }
  const cmo = fs.readFileSync(path.join(root, "csuite", "cmo", "SYSTEM.md"), "utf8");
  assert.match(cmo, /Homepage test/);
  assert.doesNotMatch(index, /Self-buys do not count/i);
});
