import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";

class MyApp extends Component {
  state = {
    date: new Date(),
  }

  onChange = date => this.setState({ date })

  render() {
    return (
      <div className="cal">
        <Calendar
          onChange={this.onChange}
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
