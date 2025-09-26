# Web Application Title: Click Game ICE04 
## Group 17 Members: 
Shawn Patel, Tim Hutzley, Peter Czepiel, Rohit Tallapragada, Batyrkhan Saparuly
## Group Contribution: 
The development of this project was a fully collaborative effort. Every team member contributed to all aspects of the application, from planning the gameplay mechanics to implementing the React components and connecting them to the backend. We worked together to design the Game component, ensuring smooth real-time interaction for the 10-second clicker gameplay, and carefully coordinated the state management using React hooks (useState, useEffect, useRef). All members participated in building the Leaderboard component and the Row sub-component, focusing on displaying scores in a clean, user-friendly table and enabling local and server-side score storage. We collectively handled edge cases, such as deduplicating scores, handling offline saves, and updating the leaderboard in real time via custom events. Additionally, the team collaborated on utility functions like the api helper and escapeHtml, ensuring consistent server communication and secure rendering of user input. While some features, such as full editing and deletion of server-saved scores, were only partially implemented due to time and dependency issues, the group made joint decisions on prioritization and implementation strategy. Overall, this project benefited from the combined strengths of the team, with everyone actively participating in coding, testing, debugging, and reviewing each other’s work. The collaborative approach ensured that the application is modular, maintainable, and demonstrates best practices in React component design and state management.


## Overview
This project is a 10-second clicker game, extended from Peter’s A3 assignment. The core gameplay is simple: users click a button as many times as possible within 10 seconds. We enhanced the original project by changing the entire frontend to be refactored into React components, making the application more modular, maintainable, and responsive. We were not able to fix/convert the edit and delete functionalities within the class timeframe. **Also when attempting to deploy, we ran into issues with Render and Railway saying there arent any available ports (we are providing source code as professor requested).**

## React Components Overview
### Game Component
- Purpose: Main game interface where the user plays the 10-second clicker game.
- Responsibilities:
  - Handles user login (optional name entry).
  - Manages game state: clicks, timer, and whether the game is active.
  - Updates clicks in real time as the user clicks.
  - Handles game start and end logic, including score calculations (clicks per second).
  - Saves scores locally and sends them to the server if the user is logged in.
  - Displays messages about game state (e.g., "Run complete", "Saved locally").
- State Hooks Used: useState, useRef, useEffect
- Key Elements:
  - <form> for entering name/label
  - <div> to display clicks and timer
  - <button> for registering clicks

### Leaderboard Component
- Purpose: Displays the scores from both local storage and server.
- Responsibilities:
  - Loads scores from local storage and the server.
  - Deduplicates scores based on unique IDs.
  - Sorts scores by highest to lowest.
  - Listens for the scoreSaved event to update the leaderboard automatically.
  - Allows editing and deleting scores (partially implemented).
- State Hooks Used: useState, useEffect
- Key Elements:
  - table to display scores
  - <thead> and <tbody> for structured score display
  - Row component instances for each score


### Row Component (used inside Leaderboard)
- Purpose: Represents a single score entry in the leaderboard.
- Responsibilities:
  - Displays score details: name, clicks, clicks per second (CPS), timestamp.
  - Allows inline editing of name, score, and CPS.
  - Handles saving and cancelling edits.
  - Provides buttons to trigger edit, save, cancel, or delete actions.
- State Hooks Used: useState
- Key Elements:
  - <tr> for the row container
  - <td> for individual cells
  - <input> elements for editing
  - <button> elements for actions
  
### api Helper Function
- Not a component, but a reusable async function for HTTP requests to the Express server.
- Handles JSON parsing, errors, and credentials for session handling.

### escapeHtml Utility Function
- Used to safely render user-entered text in the DOM.
- Switching to React improved the development experience by making the UI more modular and easier to manage. Components allow the game logic and display to be separated cleanly, which simplifies updates and debugging. Fetching and displaying scores is more straightforward with React state and hooks. The main challenge was integrating backend interactions like edit and delete, but overall the new technology streamlined development.
