import React from "react";
import Schedule from "./schedules/schedules.json";
import moment from "moment";
import timezone from "moment-timezone";
import ScheduleList from "./scheduleList";

moment.tz.setDefault("America/New_York");

var scheduleFile = JSON.parse(JSON.stringify({ Schedule }));
var today;
var selectedLunch = "";
var todaysSchedule;

var scheduleDays = {
	1:"Friday - Blue",
	2:"Wednesday - Blue",
	3:"Thursday - Blue",
	4:"Friday - Blue",
	5:"Weekend",
  6:"Weekend",
  7:"Monday - Red",
	8:"Tuesday - Red",
	9:"Wednesday - Red",
	10:"Thursday - Blue",
	11:"Friday - Blue",
	12:"Weekend",
  13:"Weekend",
  14:"Monday - Red",
	15:"Tuesday - Red",
	16:"Wednesday - Blue",
	17:"Thursday - Blue",
	18:"Friday - Blue",
	19:"Weekend",
	20:"Weekend",
	21:"Monday - Red",
  22:"Tuesday - Red",
	23:"Weekend",
  24:"Weekend",
  25:"Weekend",
  26:"Weekend",
  27:"Weekend",
  28:"Monday - Red",
  29:"Monday - Red",
  30:"Monday - Red",
  31:"Monday - Red"
};







today = scheduleDays[moment().date()];

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
    this.setLunch = this.setLunch.bind(this);
    this.setCalendarColor = this.setCalendarColor.bind(this);
    this.rawTimeLeft = this.rawTimeLeft.bind(this);
    this.getSchedules = this.getSchedules.bind(this);
    this.scheduleAtDay = this.scheduleAtDay.bind(this);
  }

  scheduleAtDay(today){
    for(var i = 0; i < scheduleFile.Schedule.length; i++){
      if(scheduleFile.Schedule[i].metadata.name === today){
        return scheduleFile.Schedule[i];
      }
    }
  }
  
setCalendarColor(){
  for(var i = 1; i <= Object.keys(scheduleDays).length; i++){
    var color = "#D3D3D3";
    if(this.scheduleAtDay(scheduleDays[i]).metadata.dayColor == "blue"){
      color = "#add8e6";
    } else if (this.scheduleAtDay(scheduleDays[i]).metadata.dayColor == "red"){
      color = "#ffcccb";
    }
    var day = document.getElementsByClassName("day" + i);
    // day[0].style.backgroundColor = color;
}

}

getSchedules(){
  return scheduleDays;
}

setLunch(e){

   selectedLunch = e.value.charAt(0).toLowerCase();
   console.log(e.value.charAt(0).toLowerCase());
}


  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    this.setCalendarColor();
  }

  tick() {
    this.setState({});
  }

  getLunchSchedule(){

    var lunchSchedule;

    for (var i = 0; i < todaysSchedule.schedule.length; i++) {

      if(todaysSchedule.schedule[i].type == "lunches"){

        if(selectedLunch === "a"){
          lunchSchedule = todaysSchedule.schedule[i].A;
        } else if (selectedLunch === "b"){
          lunchSchedule = todaysSchedule.schedule[i].B;
        } else if (selectedLunch === "c"){
          lunchSchedule = todaysSchedule.schedule[i].C;
        } else {

          lunchSchedule = todaysSchedule.schedule[i];
					return lunchSchedule;
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
    return todaysSchedule;
    //
    // console.log(todaysSchedule);
  }

  getPeriodTime() {
    var currentPeriod;
    if(this.getPeriod() !== "end"){
    currentPeriod = this.getPeriod();
    } else {
    currentPeriod = false;
    }
    if(currentPeriod !== true && currentPeriod !== false){
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
      return "School Day Over";
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
    if(minutes < 10){
      minutes = "0" + minutes;
    }
    if(hours < 1){
      return minutes + ":" + seconds;
    } else {
    return "" + hours + ":" + minutes + ":" + seconds;
  }
  }

  rawTimeLeft() {
    if(this.getPeriodTime() === true){
      return null;
    }

    var start = moment();
      var end = moment();



      start.set({
        hour: this.getPeriod().startTime.hour,
        minute: this.getPeriod().startTime.minute,
        second: 0,
      });
      end.set({
        hour: this.getPeriod().endTime.hour,
        minute: this.getPeriod().endTime.minute,
        second: 0,
      });

    var totalTime = end.valueOf() - start.valueOf();
    var time = this.getPeriodTime();
    var distance = time.valueOf() - moment().valueOf();
    return ((1 - distance/totalTime) * 100);
    // var percent = totalTime / 




    // var start = moment();
    // var end = moment();



    // start.set({
    //   hour: todaysSchedule.schedule[i].startTime.hour,
    //   minute: todaysSchedule.schedule[i].startTime.minute,
    //   second: 0,
    // });
    // end.set({
    //   hour: todaysSchedule.schedule[i].endTime.hour,
    //   minute: todaysSchedule.schedule[i].endTime.minute,
    //   second: 0,
    // });

    // var totalTime = end.valueOf() - start.valueOf();
    // var distance = time.valueOf() - moment().valueOf();
    //  return distance;
  }
  

  getPeriod(){
    // todaysSchedule.type !== "weekend" || 
    this.findSchedule();
 
		if(todaysSchedule.schedule.length !== undefined){
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
	}
    return "end";
  }

  getPeriodType(){
    var currentPeriod = this.getPeriod();

    if(currentPeriod !== "end"){
      if(currentPeriod.type === "class"){
        return currentPeriod.periodName;
      } else if (currentPeriod.type === "passing"){
        return "Passing go to " + currentPeriod.to;
      } else if (currentPeriod.type === "lunch"){
        return "Lunch";
      } else {
				return currentPeriod.periodName;
			}
    } else {
      return "";
    }
  }

  render() {
    // console.log(this.getSchedule());
    return [
      <div className="date" key="key0">{moment().format("dddd, MMMM Do YYYY")}</div>,
      <div className="time" key="key1">{moment().format("hh:mm:ss a")}</div>,
      <div className="period" key="key2">{this.getPeriodType()}</div>,
      <div className="timeLeft" key="key3">{this.timeLeft()}</div>
      // <Countdown date = {this.getPeriod()} />
    ];
}
}


export default TimeManager;
