import React, { Component } from "react";
import {Modal, Button} from 'react-bootstrap';
import { useState } from 'react';
import DoerDataService from "../services/doer.service";
import { Link } from "react-router-dom";
const utils = require("../utils/Utils.js");

export default class ReservationsFind extends Component {
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

  render() {
    const { searchAvailability, searchServices, reservationRequests } = this.state;

    return (
      <div className="list row">
          <h4>{"Reservation Requests: "}</h4>
          <table className="doers-table">
          <thead>
           <tr>
              <td>Doer Name</td>
              <td>Services Requested</td>
              <td>Time Requested</td>
              <td>Time Request Sent to Doer</td>
              <td>Status</td>
            </tr>
            </thead>
            <tbody>
            {reservationRequests &&
              reservationRequests.map((reservation, index) => (
                <tr className={"doersRow-"+reservation.state} id={"reservation"+index} key={index}>
                  <td className="doersRow-cell-name-highlight">{reservation.doer_name} </td>
                  <td className="doersRow-cell-svcs-highlight">{reservation.requested_services} </td>
                  <td className="doersRow-cell-timerequested-highlight">{reservation.requested_time}</td>
                  <td className="doersRow-cell-createtime-highlight">{utils.getJSDateTime(reservation.createdAt)}</td>
                  <td className="doersRow-cell-status-highlight">{reservation.state}</td>
                </tr>

              ))}
              </tbody>
          </table>
        <br />
        <div>
        </div>
        <div className="col-md-6">
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
