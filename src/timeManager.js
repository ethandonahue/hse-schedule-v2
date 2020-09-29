import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';
import Schedule from './schedules.json';
import moment from 'moment';
import timezone from 'moment-timezone';
require('moment-timezone');
// var moment = require('moment-timezone');


var schedule = [
    ['Period 1', new Date("September 23, 2020 12:00:00"), new Date("September 23, 2020 12:01:00")],
    ['Period 2', new Date("September 23, 2020 12:03:00"), new Date("September 23, 2020 12:04:00")],
    ['Period 3', new Date("September 24, 2020 11:51:00"), new Date("September 24, 2020 11:56:00")],
    ['Period 4', new Date("September 24, 2020 11:57:00"), new Date("September 24, 2020 11:59:00")]
];


// moment.tz.setDefault("America/New_York");
// console.log(moment().local().get('hour'));
// console.log(a.get('hour'));
// var m = moment.tz(new Date(), 'MMM Do YYYY h:mmA', 'America/Chicago');
// a.hour(4);
// console.log(a);
console.log(moment().format());
var m = moment.tz("2013-11-18 11:55", "America/Toronto");
console.log(m);
// var a = moment.tz("America/New_York");
// var b = moment.tz("2013-11-18 11:55", "America/Toronto");

 // 2013-11-18T11:55:00+08:00
 // 2013-11-18T11:55:00-05:00




var myObject = JSON.parse(JSON.stringify({Schedule}));
console.log(myObject);

console.log(moment().get('hour'));
for(var i = 0; i < myObject.Schedule.schedule.length; i++){
  if(moment().get('hour') >= myObject.Schedule.schedule[i].startTime.hour && moment().get('hour') <= myObject.Schedule.schedule[i].endTime.hour && moment().get('minute') >= myObject.Schedule.schedule[i].startTime.minute && moment().get('minute') <= myObject.Schedule.schedule[i].endTime.minute){
    console.log(i);
  }
}


console.log(myObject.Schedule.schedule[0]);
// var newDate = new Date(myObject.Schedule.schedule[0].startTime.hour myObject.Schedule.schedule[0].startTime.minute);
var newTime = "September 11, 2014 " + myObject.Schedule.schedule[0].startTime.hour + ":" +  myObject.Schedule.schedule[0].startTime.minute + ":00";
// var test = moment();
// test.hour(4);
// console.log(test);
// console.log(moment().get('hour'));

// var date = "2017-03-13";
// var time = "18:00";
//
// var timeAndDate = moment(time);
//
// console.log(timeAndDate);


//
// var yes = [
//   "period 1"{
//     time: "yes";
//   }
// ];

// [new Date("September 22, 2020 11:13:00"), new Date("September 22, 2020 11:15:00"), new Date("September 23, 2020 00:11:00"), new Date("September 24, 2020 00:11:00")];




class TimeManager extends React.Component {

    constructor() {
        super();
        window.tm = this;
        this.getPeriod = this.getPeriod.bind(this);
        this.getSchedule = this.getSchedule.bind(this);
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    tick() {
        this.setState({});
    }

    getPeriod() {
        var now = new Date().getTime();
        for (var i = 0; i < schedule.length; i++) {

            if (now >= schedule[i][1].getTime() && now <= schedule[i][2].getTime()) {
                return schedule[i][2];
            } else if ((i + 1) < schedule.length && now >= schedule[i][2].getTime() && now <= schedule[i + 1][1].getTime()) {
                return schedule[i + 1][1];
            } else if (now > schedule[schedule.length - 1][2]) {
                // console.log("school done");

                clearInterval(this.timerID);
            }
        }

    }

    getSchedule(){
      var now = new Date().getTime();

      for (var i = 0; i < schedule.length; i++) {

          if (now >= schedule[i][1].getTime() && now <= schedule[i][2].getTime()) {
            console.log("f1ff");
              return schedule("FFFFFFFFF");
    }
  }
}





    render() {
      // console.log(this.getSchedule());
        return [
          <div>{this.getSchedule()}</div>,
          <Countdown date = {this.getPeriod()} />
        ];
    }
}


export default TimeManager;
