import React from "react";
import Schedule from "./schedules.json";
import moment from "moment";
import timezone from "moment-timezone";

// moment.tz.setDefault("America/New_York");

var scheduleFile = JSON.parse(JSON.stringify({ Schedule }));
var today = "Tuesday - Red";
var selectedLunch = "c";
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
    this.getLunchSchedule = this.getLunchSchedule.bind(this);

  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({});
  }

  getLunchSchedule(){
    // console.log("a");
    var lunchSchedule;

    for (var i = 0; i < todaysSchedule.schedule.length; i++) {

      if(todaysSchedule.schedule[i].type == "lunches"){
        if(selectedLunch === "a"){
          lunchSchedule = todaysSchedule.schedule[i].A;
        } else if (selectedLunch === "b"){
          lunchSchedule = todaysSchedule.schedule[i].B;
        } else if (selectedLunch === "c"){
          lunchSchedule = todaysSchedule.schedule[i].C;
        }
        for(var x = 0; x < lunchSchedule.length; x++){
          // console.log(x);
          var start = moment();
          var end = moment();

          // console.log(todaysSchedule.schedule[i].A);

          start.set({
            hour: lunchSchedule[x].startTime.hour,
            minute: lunchSchedule[x].startTime.minute,
            second: 0,
          });
          end.set({
            hour: lunchSchedule[x].endTime.hour,
            minute: lunchSchedule[x].endTime.minute,
            second: 0,
          });

          // console.log(scheduleFile.Schedule.schedule[i].type + " " + scheduleFile.Schedule.schedule[i].startTime.hour + ":" + scheduleFile.Schedule.schedule[i].startTime.minute + " - " + scheduleFile.Schedule.schedule[i].endTime.hour + ":" + scheduleFile.Schedule.schedule[i].endTime.minute);
          if (start.valueOf() <= moment().valueOf() && end.valueOf() >= moment().valueOf()) {
          // console.log(todaysSchedule.schedule[i].A[x]);
          return lunchSchedule[x];
          }
        }


    }
  }
  }

  findSchedule(){
    for(var i = 0; i < scheduleFile.Schedule.length; i++){
      if(scheduleFile.Schedule[i].metadata.name === today){
        todaysSchedule = scheduleFile.Schedule[i];
      }
    }
    //
    // console.log(todaysSchedule);
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
    if(seconds < 10){
      seconds = "0" + seconds;
    }
    if(hours < 1){
      return minutes + ":" + seconds;
    } else {
    return "" + hours + ":" + minutes + ":" + seconds;
  }
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
      if (start.valueOf() <= moment().valueOf() && end.valueOf() >= moment().valueOf()) {
        if(todaysSchedule.schedule[i].type === "lunches"){
          return this.getLunchSchedule();
        }

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
      } else if (currentPeriod.type === "lunches" || currentPeriod.type === "lunch"){
        return "Lunch";
      }
    } else {
      return "No Time Available";
    }
  }

  render() {
    // console.log(this.getSchedule());
    return [
      <div key="key1">{moment().format("HH:mm:ss")}</div>,
      <div key="key2">{this.getPeriodType()}</div>,
      <div key="key3">{this.timeLeft()}</div>
      // <Countdown date = {this.getPeriod()} />
    ];
}
}

export default TimeManager;
