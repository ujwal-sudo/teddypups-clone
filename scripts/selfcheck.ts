// Self-checks for filter + enquiry logic. Run: npm test
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { matches } from "../src/lib/filters.ts";
import type { Puppy } from "../src/lib/site.ts";

const all: Puppy[] = JSON.parse(readFileSync(new URL("../src/data/puppies.json", import.meta.url), "utf8"));
const avail = all.filter((p) => p.status === "available");
const count = (f: Parameters<typeof matches>[1]) => avail.filter((p) => matches(p, f)).length;

assert.equal(avail.length, 15);
assert.equal(count({}), 15);
assert.equal(count({ breed: "pomeranian" }), 4); // same as the reference site
assert.equal(count({ breed: "cavapoo" }), 2); // Copper + "Maltipoo & Cavapoo"
assert.equal(count({ breed: "shih-tzu" }), 2);
assert.equal(count({ origin: "korean" }), 5);
assert.equal(count({ origin: "local" }), 0);
assert.ok(count({ sex: "boy" }) + count({ sex: "girl" }) > 15); // "Boy & girl" counts for both
console.log("filters ok");

// Enquiry form validation
import { validateEnquiry, enquiryEmail } from "../src/lib/enquiry.ts";
const base = { name: "Sara", phone: "+971 50 123 4567", email: "", area: "", puppy: "", message: "" };
assert.equal(validateEnquiry(base), undefined);
assert.ok(validateEnquiry({ ...base, name: "" })?.name);
assert.ok(validateEnquiry({ ...base, phone: "abc" })?.phone);
assert.ok(validateEnquiry({ ...base, phone: "123" })?.phone);
assert.ok(validateEnquiry({ ...base, email: "nope" })?.email);
assert.ok(!enquiryEmail({ ...base, message: "<script>x</script>" }).html.includes("<script>"));
console.log("enquiry ok");
