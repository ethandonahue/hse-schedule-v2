import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';


var schedule = [new Date("September 22, 2020 11:13:00"), new Date("September 22, 2020 11:15:00"), new Date("September 23, 2020 00:11:00"), new Date("September 24, 2020 00:11:00")];




class TimeManager extends React.Component{

    constructor(){
        super();
        window.tm = this;
        this.getPeriod = this.getPeriod.bind(this);
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

  getPeriod(){


    var now = new Date().getTime();
    for(var i = 0; i < schedule.length; i++){
      if (schedule[i].getTime() - now >= 0){
        return schedule[i];
      }
    }

  }



    render(){
      return (
        <Countdown
        date={this.getPeriod()}

        />
      );
    }
}

export default TimeManager;
