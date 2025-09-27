# ICE 04 — Creative Coding: Audio Visualizer (Web Audio + Canvas)

**Hosting link:** - " unable to complete hoting within time constraint
**Group #:** SOLO
**Members:** Aditya Patel (solo)  
**Contributions:** built the full stack: xxpress server, beb Audio analysis pipeline, canvas rendering, ui controls, and documentation.

---

## What this is
An interactive audio visulaizr that uses the **Web Audio API** to analyze frequency data from either an uploaded audio file or the microphone, and draws animated visuals on an HTML **Canvas**. The interface exposes multiple parameters so users can steer the visualization in real time.

**Technologies**: Express (server), Web Audio API, Canvas 2D, vanilla JS + HTML.

---

## How to use
1. Open the app link :/ WIP

## How to use temp
1. Open the project folder in **Visual Studio Code**.  
2. Make sure you have the **Live Server** extension installed.  
3. Right-click `index.html` → “Open with Live Server”.  
4. The app will run at **http://127.0.0.1:5500/**.  
   (If your port differs, check the Live Server output in VS Code.)


   
2. // Click **Choose audio** to load a song *or* click **Use microphone** to visualize your mic input./  WIP


3. Tweak the controls:
   - **Mode**: Bars / Radial / Dots
   - **Bars / Points**: Number of visual elements
   - **Base Hue**: Color hue (HSL)
   - **Sensitivity**: Scales amplitude → height/size
   - **Smoothing**: Analyser’s smoothingTimeConstant (temporal averaging)
   - **Trail**: Motion blur amount (background fade)

Help text is visible at the top on page load.

---

## Why this satisfies the ICE 04 requirements
- **Server using Express**: `server.js` serves static files and a `/health` route.
- **Client-side interactive experience using a web multimedia tech**:
  - **Web Audio API** for analysis
  - **Canvas** for visualization
- **≥4 parameters exposed**: Mode, Bars, Hue, Sensitivity, Smoothing, Trail (6 total).
- **Basic documentation displayed on load**: Provided via a `<details open>` block.

---

## Local development
```bash
npm install
npm start
# search  http://localhost:3000
