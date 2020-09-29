import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';
import DaFile from './schedules.json';


var schedule = [
    ['Period 1', new Date("September 23, 2020 12:00:00"), new Date("September 23, 2020 12:01:00")],
    ['Period 2', new Date("September 23, 2020 12:03:00"), new Date("September 23, 2020 12:04:00")],
    ['Period 3', new Date("September 24, 2020 11:51:00"), new Date("September 24, 2020 11:56:00")],
    ['Period 4', new Date("September 24, 2020 11:57:00"), new Date("September 24, 2020 11:59:00")]

var myObject = JSON.parse(JSON.stringify({DaFile}));
console.log(myObject);
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
                console.log("school done");

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
      console.log(this.getSchedule());
        return [
          <div>{this.getSchedule()}</div>,
          <Countdown date = {this.getPeriod()} />
        ];
    }
}


export default TimeManager;
