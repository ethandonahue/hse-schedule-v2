import React from "react";
import { Component } from "react";


class ScheduleList extends Component {

    constructor() {
        super();
        window.sl = this;
        this.generateList = this.generateList.bind(this);
      }
      
    //   componentDidMount(){
    //       this.generateList();
    //   }

    generateList(sched){
        var scheduleArr = [];
        console.log(sched);
        var s;
        if(sched == null){
            s = window.tm.findSchedule();
        } else {
            s = sched;
        }
     
        console.log(s);
        if(s.schedule !== undefined){
        for(var i = 0; i < s.schedule.length; i++){
            if(s.schedule[i].period !== undefined){
                var p = s.schedule[i];
                var startH = (p.startTime.hour > 12) ? p.startTime.hour-12 : p.startTime.hour;
                var startM = (p.startTime.minute < 10) ? "0" + p.startTime.minute : p.startTime.minute;
                var endH = (p.endTime.hour > 12) ? p.endTime.hour-12 : p.endTime.hour;
                var endM = (p.endTime.minute < 10) ? "0" + p.endTime.minute : p.endTime.minute;
 
                scheduleArr.push(p.period + " - " + startH + ":" + startM + " to " + endH + ":" + endM);
                console.log(p.period + " - " + startH + ":" + startM + " to " + endH + ":" + endM);
                if(p.type == "lunches"){
                    for(var a = 0; a < p.A.length; a++){
                        if (p.A[a].type == "lunch"){
                            var startHA = (p.A[a].startTime.hour > 12) ? p.A[a].startTime.hour-12 : p.A[a].startTime.hour;
                            var startMA = (p.A[a].startTime.minute < 10) ? "0" + p.A[a].startTime.minute : p.A[a].startTime.minute;
                            var endHA = (p.A[a].endTime.hour > 12) ? p.A[a].endTime.hour-12 : p.A[a].endTime.hour;
                            var endMA = (p.A[a].endTime.minute < 10) ? "0" + p.A[a].endTime.minute : p.A[a].endTime.minute;
                        }
                        
                    }
                    scheduleArr.push("A Lunch" + " - " + startHA + ":" + startMA + " to " + endHA + ":" + endMA);

                    for(var b = 0; b < p.B.length; b++){
                        if (p.B[b].type == "lunch"){
                            var startHB = (p.B[b].startTime.hour > 12) ? p.B[b].startTime.hour-12 : p.B[b].startTime.hour;
                            var startMB = (p.B[b].startTime.minute < 10) ? "0" + p.B[b].startTime.minute : p.B[b].startTime.minute;
                            var endHB = (p.B[b].endTime.hour > 12) ? p.B[b].endTime.hour-12 : p.B[b].endTime.hour;
                            var endMB = (p.B[b].endTime.minute < 10) ? "0" + p.B[b].endTime.minute : p.B[b].endTime.minute;
                        }
                        
                    }

                    scheduleArr.push("B Lunch" + " - " + startHB + ":" + startMB + " to " + endHB + ":" + endMB);


                    for(var c = 0; c < p.C.length; c++){
                        if (p.C[c].type == "lunch"){
                            var startHC = (p.C[c].startTime.hour > 12) ? p.C[c].startTime.hour-12 : p.C[c].startTime.hour;
                            var startMC = (p.C[c].startTime.minute < 10) ? "0" + p.C[c].startTime.minute : p.C[c].startTime.minute;
                            var endHC = (p.C[c].endTime.hour > 12) ? p.C[c].endTime.hour-12 : p.C[c].endTime.hour;
                            var endMC = (p.C[c].endTime.minute < 10) ? "0" + p.C[c].endTime.minute : p.C[c].endTime.minute;
                        }
                        
                    }

                    scheduleArr.push("C Lunch" + " - " + startHC + ":" + startMC + " to " + endHC + ":" + endMC);


                    

                }
            }
        }
           
        } else {
            scheduleArr.push("Weekend");
        }
        console.log(scheduleArr);
        return scheduleArr.map((per) => <div className="schedList">{per}</div>);
        
    }


    render() {
        return(
            this.generateList(null)
        );
    }
}

export default ScheduleList;