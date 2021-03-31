import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import { Component } from "react";

class progressBar extends Component{

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1);
   
      }
    
      tick() {
        this.setState({});
      }

render(){

   
    
        return(
              <ProgressBar animated now={window.tm.rawTimeLeft()} />
            
        );
    }
    
}
    
    export default progressBar;