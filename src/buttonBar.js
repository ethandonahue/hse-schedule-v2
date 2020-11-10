import React from "react";
import { Component } from "react";



class ButtonBar extends Component {

    constructor() {
        super();
        this.hidePage = this.hidePage.bind(this);
      }

      hidePage(page){

        
           var listPage = document.getElementsByClassName("listPage")[0];
           var timePage = document.getElementsByClassName("timePage")[0];
           var calPage = document.getElementsByClassName("calPage")[0];
 

          if(page == 0){
            listPage.style.display = "block";
            timePage.style.display = "none";
            calPage.style.display = "none";
          } else if (page == 1){
            listPage.style.display = "none";
            timePage.style.display = "block";
            calPage.style.display = "none";
          } else if (page == 2){
            listPage.style.display = "none";
            timePage.style.display = "none";
            calPage.style.display = "block";
          }
      }


render(){

 

    return[
        
        <button onClick={() => this.hidePage(0)}>Bell</button>,
    <button onClick={() => this.hidePage(1)}>Main</button>,
    <button onClick={() => this.hidePage(2)}>Calendar</button>
    ];
}

}

export default ButtonBar;