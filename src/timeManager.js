import React from "react";
import Schedule from "./schedules.json";
import moment from "moment";
import timezone from "moment-timezone";

// moment.tz.setDefault("America/New_York");

var scheduleFile = JSON.parse(JSON.stringify({ Schedule }));

class TimeManager extends React.Component {
  constructor() {
    super();
    window.tm = this;
    this.getPeriod = this.getPeriod.bind(this);
    this.timeLeft = this.timeLeft.bind(this);
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({});
  }

  getPeriod() {
    for (var i = 0; i < scheduleFile.Schedule.schedule.length; i++) {
      var start = moment();
      var end = moment();

      start.set({
        hour: scheduleFile.Schedule.schedule[i].startTime.hour,
        minute: scheduleFile.Schedule.schedule[i].startTime.minute,
        second: 0,
      });
      end.set({
        hour: scheduleFile.Schedule.schedule[i].endTime.hour,
        minute: scheduleFile.Schedule.schedule[i].endTime.minute,
        second: 0,
      });

      // console.log(scheduleFile.Schedule.schedule[i].type + " " + scheduleFile.Schedule.schedule[i].startTime.hour + ":" + scheduleFile.Schedule.schedule[i].startTime.minute + " - " + scheduleFile.Schedule.schedule[i].endTime.hour + ":" + scheduleFile.Schedule.schedule[i].endTime.minute);
      if (
        start.valueOf() <= moment().valueOf() &&
        end.valueOf() >= moment().valueOf()
      ) {
        return end;
      }
    }
    return true;
  }

  timeLeft() {
    if(this.getPeriod()){
      return "End";
    }
    var time = this.getPeriod();
    var distance = time.valueOf() - moment().valueOf();
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return "" + hours + ":" + minutes + ":" + seconds;
  }

  render() {
    // console.log(this.getSchedule());
    return (
      <div> {this.timeLeft()} </div>
      // <Countdown date = {this.getPeriod()} />
    );
  }
}

export default TimeManager;
