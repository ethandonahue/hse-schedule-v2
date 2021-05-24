import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";


class MyApp extends Component {
  state = {
    date: new Date(),
  }

 switchAndHide(e){
  var listPage = document.getElementsByClassName("listPage")[0];
  var timePage = document.getElementsByClassName("timePage")[0];
  var calPage = document.getElementsByClassName("calPage")[0];

  listPage.style.display = "block";
  timePage.style.display = "none";
  calPage.style.display = "none";
var scheds = window.tm.getSchedules();
console.log(scheds[e.getDate()]);

window.sl.generateList(window.tm.scheduleAtDay(scheds[e.getDate()]));
  
 }
  

  render() {
  

    return (
      <div className="cal">
        <Calendar
          onChange={this.switchAndHide}
          value={this.state.date}
          calendarType="US"
          showNeighboringMonth={false}
          tileClassName={({ activeStartDate, date, view }) => view === 'month' && 'day' + date.getDate()}
        />
      </div>
    );
  }
}

export default MyApp;
 // onChange = date => this.setState({ date })
