import React from "react";
import { Component } from "react";


class ScheduleList extends Component {

    constructor() {
        super();
        window.sl = this;
        this.generateList = this.generateList.bind(this);
      }
      
      componentDidMount(){
          this.generateList();
      }

    generateList(){
        var s = window.tm.findSchedule();
        console.log(s);
        for(var i = 0; i < s.schedule.length; i++){
            if(s.schedule[i].period !== undefined){
                var p = s.schedule[i];
                var startH = (p.startTime.hour > 12) ? p.startTime.hour-12 : p.startTime.hour;
                var startM = (p.startTime.minute < 10) ? "0" + p.startTime.minute : p.startTime.minute;
                var endH = (p.endTime.hour > 12) ? p.endTime.hour-12 : p.endTime.hour;
                var endM = (p.endTime.minute < 10) ? "0" + p.endTime.minute : p.endTime.minute;
                console.log(p.period + " - " + startH + ":" + startM + " to " + endH + ":" + endM);
            }
           
        }
        
    }


    render() {
        return(
            <div>hello</div>
        );
    }
}

export default ScheduleList;