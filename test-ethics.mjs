import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

test("Ethics Check kit is published with a live $42 checkout and a real ZIP", () => {
  const html = fs.readFileSync(path.join(root, "ethics", "index.html"), "utf8");
  assert.match(html, /aFa9AUce6afPdHb0aF1sQ05/);
  assert.match(html, /Fieldproof-Ethics-Check-Launch-Kit\.zip/);
  assert.match(html, /Pay \$42 for the Ethics Check kit/);
  assert.match(html, /buy\.stripe\.com\/eVq4gA91U3Rr1Yt6z31sQ00/);
  assert.match(html, /agentic-ai-governance-pack\?wanted=true/);
  assert.match(html, /Get the \$42 pack/);
  assert.match(html, /\/v1\/canons/);
  assert.doesNotMatch(html, /Pythara/i);
  const zip = path.join(root, "ethics", "Fieldproof-Ethics-Check-Launch-Kit.zip");
  assert.ok(fs.existsSync(zip));
  assert.ok(fs.statSync(zip).size > 20000);
  const system = fs.readFileSync(path.join(root, "ethics", "SYSTEM.md"), "utf8");
  assert.match(system, /seven canons/i);
  assert.doesNotMatch(system, /Pythara/i);
});
