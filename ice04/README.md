# Click Game — ICE 04 (CS4241)

**Title:** Click Game — Persistence  
**Deployed:** `https://a3-peterczepiel-production.up.railway.app/` 


This project is a simple 10-second clicker game extended from Peter's A2. Users can register/login, play a timed run, and save their scores. The app now uses React components for the entire game interface, improving modularity and interactivity, with an Express server and MongoDB providing persistent per-user data. All functionality is fully implemented in React except for the edit and delete score functionality, which we didn't have time for (Took us a while to organize repo and then some of us had dependency/node issues). The user login is changed from a username/password to just optional login with name for easy use.

Reflection on New Technology:
Switching to React improved the development experience by making the UI more modular and easier to manage. Components allow the game logic and display to be separated cleanly, which simplifies updates and debugging. Fetching and displaying scores is more straightforward with React state and hooks. The main challenge was integrating backend interactions like edit and delete, but overall the new technology streamlined development.
