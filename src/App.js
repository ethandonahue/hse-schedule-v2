import React from 'react';
import './App.css';
import Timer from "./timeManager.js";
import Dropdown from "./dropdown.js";
import Header from "./header.js";
import Calendar from "./calendar.js";
import List from "./scheduleList.js";
import ButtonBar from "./buttonBar.js";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="mainContent">
    
    <div className="timeContent timePage">
    <Timer />
    <Dropdown />
    </div>
    <div className="calPage">
    <Calendar />
    </div>
   <div className="listPage">
   <List />
   </div>
   
    </div>
    <div className="buttonBarContainer">
    <div className="buttonBar">
    <ButtonBar />
    </div>
    </div>
    </div>
  );
}

export default App;
