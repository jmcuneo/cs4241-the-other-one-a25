const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "jeronimo", "index.html"));
});

app.get("/franco", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "matthew", "index.html"));
});

app.get("/nemeti", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Nemeti", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Three.js: http://localhost:${port}/jeronimo/`);
  console.log(`D3:  http://localhost:${port}/franco/`);
  console.log(`Tone.js: https://localhost:${port}/nemeti`);
});
