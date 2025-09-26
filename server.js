import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

/*const express = require('express'),
    app = express(),
    cors = require('cors'),
    path = require('path')*/

app.use(cors())
app.use(express.static('./'))

// serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
