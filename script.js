/* script.js — functional btut not complete.

   Things I finished:
     - File upload path (MediaElementSource → Analyser → Canvas)
     - Two rendering modes: "bars" and "radial"
     - 4+ interactive controls (bars, hue, sensitivity, trail, mode)
   Things I left as WIp 
     - Microphone input (commened out for now)
     - Third mode ("dots") — stub + commented block
     - Smoothing control (decided o keep scope tight for ICE

   Random notes to self:
     - lol these magic numbers for heights look fine enough for ICE
     - remember to clamp values if someone drags sensitivity to 1 and blows up bars
*/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const fileInput = document.getElementById("fileInput");
const micBtn    = document.getElementById("micBtn");

const modeSel = document.getElementById("mode");
const barsInp = document.getElementById("bars");
const hueInp  = document.getElementById("hue");
const sensInp = document.getElementById("sensitivity");
const trailInp= document.getElementById("trail");

const barsVal = document.getElementById("barsVal");
const hueVal  = document.getElementById("hueVal");
const sensVal = document.getElementById("sensVal");
const trailVal= document.getElementById("trailVal");

// Audio graph bits
let audioCtx = null;
let analyser = null;
let sourceNode = null;
let dataArray = null;
const fftSize = 1024; // workable default (TODO: expose via UI later? maybe.)

// UI state
let mode = "bars";
let bars = +barsInp.value;
let baseHue = +hueInp.value;
let sensitivity = +sensInp.value;
let trail = +trailInp.value;
// let smoothing = 0.7; // WIP (see index.html)

// time param for gentle rotation
let t = 0;

function ensureAnalyser() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (!analyser) {
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = fftSize;
    // analyser.smoothingTimeConstant = smoothing; // WIP: not using until I expose control
    dataArray = new Uint8Array(analyser.frequencyBinCount);
  }
}

function connectAudioElement(el) {
  ensureAnalyser();
  if (sourceNode) {
    try { sourceNode.disconnect(); } catch {}
  }
  sourceNode = audioCtx.createMediaElementSource(el);
  sourceNode.connect(analyser);
  analyser.connect(audioCtx.destination);
}

// WIP: mic input — left commented to show intent and keep ICE scope tight
/*
async function connectMicrophone() {
  ensureAnalyser();
  if (sourceNode) {
    try { sourceNode.disconnect(); } catch {}
  }
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  sourceNode = audioCtx.createMediaStreamSource(stream);
  sourceNode.connect(analyser);
  // not connecting analyser to destination to avoid feedback (headphones recommended anyway)
}
*/

function sampleBins(targetCount) {
  const bins = dataArray;
  const out = new Array(targetCount).fill(0);
  const step = bins.length / targetCount;
  for (let i = 0; i < targetCount; i++) {
    const start = Math.floor(i * step);
    const end = Math.floor((i + 1) * step);
    let sum = 0, n = 0;
    for (let j = start; j < end; j++) { sum += bins[j]; n++; }
    out[i] = n ? sum / n : 0;
  }
  return out;
}

function drawBars() {
  const vals = sampleBins(bars);
  const w = canvas.width, h = canvas.height;
  const barW = w / vals.length;

  for (let i = 0; i < vals.length; i++) {
    // clamp-ish: dividing by sensitivity can make huge bars at low values
    const v = Math.min(255, vals[i]) / Math.max(1, sensitivity);
    const height = Math.min(h * 0.9, v * 2.2); // lol magic number 2.2 looks nice
    const x = i * barW;
    const y = h - height;

    ctx.fillStyle = `hsl(${(baseHue + i) % 360}, 100%, 55%)`;
    ctx.fillRect(x + 1, y, barW - 2, height);
  }
}

function drawRadial() {
  const vals = sampleBins(bars);
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = Math.min(cx, cy) * 0.45;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(t * 0.6); // slow spin so it feels alive

  for (let i = 0; i < vals.length; i++) {
    const v = Math.min(255, vals[i]) / Math.max(1, sensitivity);
    const len = radius + v * 0.9;
    const angle = (i / vals.length) * Math.PI * 2;

    ctx.save();
    ctx.rotate(angle);
    ctx.fillStyle = `hsl(${(baseHue + i * 2) % 360}, 100%, 60%)`;
    ctx.fillRect(0, -2, len, 4);
    ctx.restore();
  }

  ctx.restore();
}

// WIP: third mode — dots/orbit. Keeping the stub for clarity.
/*
function drawDots() {
  const vals = sampleBins(bars);
  const cx = canvas.width / 2, cy = canvas.height / 2;
  const baseR = Math.min(cx, cy) * 0.35;
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(-t * 0.7);

  for (let i = 0; i < vals.length; i++) {
    const v = Math.min(255, vals[i]) / Math.max(1, sensitivity);
    const angle = (i / vals.length) * Math.PI * 2;
    const r = baseR + Math.sin(t * 2 + i * 0.07) * 10;
    const x = Math.cos(angle) * r, y = Math.sin(angle) * r;
    const size = 2 + (v / 28);
    ctx.beginPath();
    ctx.fillStyle = `hsl(${(baseHue + i * 4) % 360}, 100%, 65%)`;
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}
*/

function animate() {
  requestAnimationFrame(animate);

  if (!analyser) {
    // blank slate until audio starts
    ctx.fillStyle = "#090a12";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return;
  }

  analyser.getByteFrequencyData(dataArray);

  // trail fade — higher trail = faster clearing; 0 = very smeary (fun but messy)
  ctx.fillStyle = `rgba(9,10,18, ${0.12 + trail})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  switch (mode) {
    case "bars":   drawBars();   break;
    case "radial": drawRadial(); break;
    // case "dots":   drawDots();   break; // WIP
  }

  t += 0.006 + (trail * 0.01);
}

// file upload → connect audio element to graph
fileInput.addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  const audio = new Audio(url);
  audio.crossOrigin = "anonymous";
  audio.addEventListener("canplay", () => { audio.play(); });
  connectAudioElement(audio);
});

// mic button is disabled in HTML; leaving handler commented for clarity
/*
micBtn.addEventListener("click", async () => {
  try {
    await connectMicrophone();
  } catch (err) {
    alert("Mic permission denied/unavailable.");
    console.error(err);
  }
});
*/

modeSel.addEventListener("input", e => { mode = e.target.value; });
barsInp.addEventListener("input", e => { bars = +e.target.value; barsVal.textContent = bars; });
hueInp .addEventListener("input", e => { baseHue = +e.target.value; hueVal.textContent = baseHue; });
sensInp.addEventListener("input", e => { sensitivity = +e.target.value; sensVal.textContent = sensitivity; });
trailInp.addEventListener("input", e => { trail = +e.target.value; trailVal.textContent = trail.toFixed(2); });

// start loop immediately; shows dark background until audio begins
animate();
