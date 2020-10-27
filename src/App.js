import React from 'react';
import './App.css';
import Timer from "./timeManager.js";
import Dropdown from "./dropdown.js";
import Header from "./header.js";
import Calendar from "./calendar.js";

function App() {
  return (
    <div className="App">
    <Header />
    <div className="timeContent">
    <Timer />
    <Dropdown />
    </div>
    <Calendar />
    </div>
  );
}

export default App;
