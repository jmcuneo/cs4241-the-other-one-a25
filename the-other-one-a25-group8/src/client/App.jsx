import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Group 8 Assignment 4</h1>
      <form>
        <input type="text" id="stormname" placeholder="Storm name here"></input>
        <input type="text" id="year" placeholder="Year here"></input>
        <input type="text" id="windspeed" placeholder="Wind speed here (mph)"></input>
        <input type="text" id="airpressure" placeholder="Air pressure here (mbar)"></input>
        <button class="changer">submit</button>
        <button id="delete" class="changer">delete</button>

      </form>
    </div>
  );
}

export default App;
