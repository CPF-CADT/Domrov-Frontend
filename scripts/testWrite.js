const fs = require("fs");
const path = require("path");
const file = path.join(process.cwd(), "src/data/classes.json");
try {
  console.log("Attempting to read", file);
  const raw = fs.readFileSync(file, "utf-8");
  console.log("Read ok, length", raw.length);
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) throw new Error("Not an array");
  data.push({ id: "node-test-" + Date.now(), name: "Node Test" });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log("Write ok");
} catch (err) {
  console.error("Write test failed:", err.message || err);
  process.exit(1);
}
