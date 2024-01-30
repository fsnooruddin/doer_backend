import React, { Component } from "react";
import {Modal, Button} from 'react-bootstrap';
import { useState } from 'react';
import DoerDataService from "../services/doer.service";
import { Link } from "react-router-dom";
const utils = require("../utils/Utils.js");

export default class ReservationsFinances extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchAvailability = this.onChangeSearchAvailability.bind(this);
    this.onChangeSearchServices = this.onChangeSearchServices.bind(this);
    this.retrieveReservations = this.retrieveReservations.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.scheduleDoers = this.scheduleDoers.bind(this);
    this.searchAvailability = this.searchAvailability.bind(this);
    //this.searchServices = this.searchServices.bind(this);

    this.state = {
      reservationRequests: [],
      searchAvailability: "",
      searchTitle: "",
      searchServices: "",
      currentReservations: []
    };
  }

  componentDidMount() {
    this.retrieveReservations();
  }

  onChangeSearchAvailability(e) {
    const searchAvailability = e.target.value;
    this.setState({
      searchAvailability: searchAvailability
    });
  }

  onChangeSearchServices(e) {
      const searchServices = e.target.value;
      this.setState({
        searchServices: searchServices
      });
    }

  refreshList() {
    this.retrieveReservations();
    this.setState({
      currentDoers: [],
      currentReservations: []
    });
  }

scheduleDoers() {

   console.log(this.state.currentDoers);
   // alert("Sent Scheduling Requests!");
    // Get the modal
    var modal = document.getElementById("overlay-content");
    modal.style.display = "block";

    DoerDataService.scheduleDoers(this.state.currentDoers, this.state.searchAvailability);

    var doers_list = document.getElementsByClassName("doersRow");
    for(let i=0;i<doers_list.length;i++) {
        doers_list[i].bgColor = "";
        doers_list[i].childNodes[0].className = "cell-name-highlight";
    }
  }

  retrieveReservations() {
    console.log("In reservation-find.componennt.js retreiveReservations");
    console.log("this.state");
    console.log(this.state);
    DoerDataService.getAllReservationsRequests()
         .then(response => {
            console.log("response from DoerDataService.getAllReservationsRequests is");
            console.log(response);
            this.setState({
              reservationRequests: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
  }

 closeDialog() {
    // Get the modal
    var modal = document.getElementById("overlay-content");
    modal.style.display = "none";
  }

  getDayFromAvailability(availability) {
    const retArray = availability.split(":");
        return retArray[0];
  }

  getTimeFromAvailability(availability) {
    const retArray = availability.split(":");
    if(retArray[1] === undefined) {
        return null;
    } else {
        return retArray[1];
    }
  }

  timesMatch(reqSlotTime, slotTime) {

    let retArray=slotTime.split("-");
    let doerStartTime = parseInt(retArray[0]);
    let doerCloseTime = parseInt(retArray[1]);
    console.log("doer start time = " + doerStartTime);
    console.log("doer end time = " + doerCloseTime);

    retArray=reqSlotTime.split("-");
    let reqStartTime = parseInt(retArray[0]);
    let reqCloseTime = parseInt(retArray[1]);
    console.log("req start time = " + reqStartTime);
    console.log("req end time = " + reqCloseTime);

	if(reqStartTime >= doerStartTime) {
      console.log("start times match...");
      if(reqCloseTime <= doerCloseTime) {
     	 console.log("close times match...");
      	 return true;
      }
    }
    return false;
  }

filterResultsByTime(tutorials) {
    if(this.state.searchAvailability == null) {
        return tutorials;
    }

    const filteredDoers = tutorials.filter(filterTimeFunction, this);

    function filterTimeFunction(value, index, array) {
        console.log("...filtering...");
        console.log(value);
        //console.log(time);
        console.log(this.state);
        return utils.processTimeMatch(this.state.searchAvailability, value.availability);
    }

    return filteredDoers;
}

 searchAvailability() {
     this.setState({
	 currentDoers: [],
     });

     DoerDataService.findByAvailability(this.state.searchAvailability)
	 .then(response => {
	 	     console.log("in search availability ... DB response response");
     	     console.log(response.data);

             const filteredResponse = this.filterResultsByTime(response.data);
             this.setState({
		        tutorials: filteredResponse
             });
	     console.log("in search availability ... filtered response");
	     console.log(filteredResponse);
	 })
	 .catch(e => {
             console.log(e);
	 });
}

getActiveLabel(event, tutorial)
{
  if(event.currentTarget.className == "doersRow") {
    if(event.currentTarget.bgColor == "aef2b3") {
        event.currentTarget.bgColor = "";
        event.currentTarget.childNodes[0].className = "cell-name-highlight";
    } else {
        event.currentTarget.bgColor = "aef2b3"
        event.currentTarget.childNodes[0].className = "";
    }
  }
  this.state.currentDoers.push(tutorial);
}

getJSDateTime(mysqlDateTime)
{
 var t = mysqlDateTime.split("T");
 var r = t[1].split(".");
 return (t[0]+ " " + r[0]);
}

  render() {
    const { searchAvailability, searchServices, reservationRequests } = this.state;

    return (
       <div className="list row">
         <div className="finance-table-header-container">
      <div className="finance-table-header">
          <h4>{"Finance Summary:"}</h4>
         </div>

         <div className="finance-table">
          <table className="finance-summary-table">

          <tr>
                    <td className="cell-name-highlight"></td>
                    <th className="cell-svcs-highlight">This Month</th>

                    <th className="cell-status-highlight">Year to Date</th>
                  </tr>


           <tr>
                  <td className="cell-name-highlight">Total Amount Spent on Jobs:</td>
                  <td className="cell-svcs-highlight">jj </td>

                  <td className="cell-status-highlight">jj</td>
                </tr>

           <tr>
                  <td className="cell-name-highlight">Amount Sent to Doers:</td>
                  <td className="cell-svcs-highlight">jj </td>

                  <td className="cell-status-highlight">jj</td>
                </tr>

           <tr>
                  <td className="cell-name-highlight">Average Revenue per Job:</td>
                  <td className="cell-svcs-highlight">jj </td>

                  <td className="cell-status-highlight">jj</td>
                </tr>
          </table>
        </div>
        </div>

<div className="finance-table-header-container">
 <div className="finance-table-header">
          <h4>{"Doer Summary:"}</h4>
         </div>

         <div className="finance-table">
          <table className="finance-summary-table">

            <tr>
                  <td className="cell-name-highlight"></td>
                  <th className="cell-svcs-highlight">This Month</th>

                  <th className="cell-status-highlight">Year to Date</th>
                </tr>



           <tr>
                  <td className="cell-name-highlight">Top Earning Doer:</td>
                  <td className="cell-svcs-highlight">jj </td>

                  <td className="cell-status-highlight">jj</td>
                </tr>

           <tr>
                  <td className="cell-name-highlight">Highest per hour rate:</td>
                  <td className="cell-svcs-highlight">jj </td>

                  <td className="cell-status-highlight">jj</td>
                </tr>

           <tr>
                  <td className="cell-name-highlight">Longest Job:</td>
                  <td className="cell-svcs-highlight">jj </td>

                  <td className="cell-status-highlight">jj</td>
                </tr>
          </table>
        </div>
        </div>

<div className="overlay-bg">

<div id="overlay-content" className="overlay-content popup1">
<p>Sent Scheduling Request!</p>
    <button className="close-btn" onClick={this.closeDialog}>Close</button>
</div>
 </div>
</div>
    );
  }
}
