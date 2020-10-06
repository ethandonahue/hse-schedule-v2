import React from "react";
import Schedule from "./schedules.json";
import moment from "moment";
import timezone from "moment-timezone";

// moment.tz.setDefault("America/New_York");

var scheduleFile = JSON.parse(JSON.stringify({ Schedule }));
var today = "Tuesday - Red";
var selectedLunch = "a";
var todaysSchedule;






class TimeManager extends React.Component {

  constructor() {
    super();
    window.tm = this;
    this.getPeriodTime = this.getPeriodTime.bind(this);
    this.getPeriodType = this.getPeriodType.bind(this);
    this.getPeriod = this.getPeriod.bind(this);
    this.timeLeft = this.timeLeft.bind(this);
    this.findSchedule = this.findSchedule.bind(this);
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({});
  }

  findSchedule(){
    for(var i = 0; i < scheduleFile.Schedule.length; i++){
      if(scheduleFile.Schedule[i].metadata.name === today){
        todaysSchedule = scheduleFile.Schedule[i];
      }
    }

  }

  getPeriodTime() {
    var currentPeriod = this.getPeriod();
    if(currentPeriod !== true){
      var end = moment();

      end.set({
        hour: currentPeriod.endTime.hour,
        minute: currentPeriod.endTime.minute,
        second: 0,
      });
      return end;
    } else {
      return true;
    }
  }

  timeLeft() {
    if(this.getPeriodTime() === true){
      return "End";
    }
    var time = this.getPeriodTime();
    var distance = time.valueOf() - moment().valueOf();
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return "" + hours + ":" + minutes + ":" + seconds;
  }

  getPeriod(){
    this.findSchedule();
    for (var i = 0; i < todaysSchedule.schedule.length; i++) {
      var start = moment();
      var end = moment();

      start.set({
        hour: todaysSchedule.schedule[i].startTime.hour,
        minute: todaysSchedule.schedule[i].startTime.minute,
        second: 0,
      });
      end.set({
        hour: todaysSchedule.schedule[i].endTime.hour,
        minute: todaysSchedule.schedule[i].endTime.minute,
        second: 0,
      });

      // console.log(scheduleFile.Schedule.schedule[i].type + " " + scheduleFile.Schedule.schedule[i].startTime.hour + ":" + scheduleFile.Schedule.schedule[i].startTime.minute + " - " + scheduleFile.Schedule.schedule[i].endTime.hour + ":" + scheduleFile.Schedule.schedule[i].endTime.minute);
      if (
        start.valueOf() <= moment().valueOf() &&
        end.valueOf() >= moment().valueOf()
      ) {
        return todaysSchedule.schedule[i];
      }
    }
    return true;
  }

  getPeriodType(){
    var currentPeriod = this.getPeriod();

    if(currentPeriod !== true){
      if(currentPeriod.type === "class"){
        return currentPeriod.periodName;
      } else if (currentPeriod.type === "passing"){
        return "Passing go to " + currentPeriod.to;
      } else if (currentPeriod.type === "lunches"){
        return "Lunch";
      }
    } else {
      return "No Time Available";
    }
  }

  render() {
    // console.log(this.getSchedule());
    return [
      <div key="key1">{this.getPeriodType()}</div>,
      <div key="key2">{this.timeLeft()}</div>
      // <Countdown date = {this.getPeriod()} />
    ];
}
}

export default TimeManager;
