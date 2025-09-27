# ICE 4

## Overview
This Car Tracker application now includes interactive Canvas based visualizations.

https://cs4241-the-other-one-a25-afwk.onrender.com/

Our group is Joseph Abata, Riley Meyers, and Michael Napoleone. We are Group 13.

## New Features
- Canvas Visualization with real time animated cars with color coding by fuel type
- Interactive controls for: Speed, size, trails, color intensity, labels
- A help system: Comprehensive guide modal

## Contributions

Michael 
- Added the visualization section to the existing dashboard.html
- Created visualization.css for the new canvas and controls
- Styled the new visualization area to match the existing design
- Added the help popup/modal to explain the new features, and styled it up

Riley 

- Added the /api/user endpoint so that we can show a user's username in the navbar
- Modified dashboard.js to connect the existing car data to the visualization stuff
- Made sure the new visualization works with the existing login system

Joseph 

- Created visualization.js for the moving cars on canvas
- Made visualization-controls.js for the sliders and controls
- Added the ability to click to create demo cars
- Integrated the animation with the existing car data

## Setup
1. Install dependencies: `npm install`
2. Create `.env` file with MongoDB connection
3. Start server: `npm start`
4. Open http://localhost:3000

## Technologies Demonstrated
- Canvas API: 2D graphics, animation, particle systems
