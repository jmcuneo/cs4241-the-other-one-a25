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
  - <table> to display scores
  - <thead> and <tbody> for structured score display
  - <Row> component instances for each score

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
