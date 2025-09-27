// server.js — minimal on purpose. rubric just says "use Express".
// If I had more time I'd add compression / proper caching headers. (later me: do this?)

import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

// quick ping for Render etc.
app.get("/health", (req, res) => res.json({ ok: true, wip: true }));

app.listen(PORT, () => {
  console.log(`ICE 04 server up → http://localhost:${PORT}`);
});
