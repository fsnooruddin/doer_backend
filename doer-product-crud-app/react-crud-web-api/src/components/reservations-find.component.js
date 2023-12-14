import React, { Component } from "react";
import {Modal, Button} from 'react-bootstrap';
import { useState } from 'react';
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

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
      currentTutorials: [],
      currentReservations: []
    });
  }

scheduleDoers() {

   console.log(this.state.currentTutorials);
   // alert("Sent Scheduling Requests!");
    // Get the modal
    var modal = document.getElementById("overlay-content");
    modal.style.display = "block";

    TutorialDataService.scheduleDoers(this.state.currentTutorials, this.state.searchAvailability);

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
    TutorialDataService.getAllReservationsRequests()
         .then(response => {
            console.log("response from TutorialDataService.getAllReservationsRequests is");
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

  processTimeMatch(reqSlot, avail) {

        let reqSlotDay=this.getDayFromAvailability(reqSlot);
        console.log("reqSlot " + reqSlotDay);

        let reqSlotTime=this.getTimeFromAvailability(reqSlot);
        console.log("reqSlot " + reqSlotTime);

        const availArray = avail.split(",");
        const len = availArray.length;

        for(let i=0;i<len;i++) {
            let dayMatch = false;
            let timeMatch = false;

            let slot=availArray[i];
            console.log("slot = " + slot);

            let slotDay=this.getDayFromAvailability(slot);
            console.log(slotDay);

            let slotTime=this.getTimeFromAvailability(slot);
            console.log(slotTime);

            if(slotDay.indexOf(reqSlotDay) !== -1) {
                    dayMatch = true;
            }

            timeMatch = this.timesMatch(reqSlotTime, slotTime);

            if(dayMatch === true && timeMatch === true) {
                    return true;
            }
        }

        return false;
    }

filterResultsByTime(tutorials) {
    if(this.state.searchAvailability == null) {
        return tutorials;
    }

    const filteredTutorials = tutorials.filter(filterTimeFunction, this);

    function filterTimeFunction(value, index, array) {
        console.log("...filtering...");
        console.log(value);
        //console.log(time);
        console.log(this.state);
        return this.processTimeMatch(this.state.searchAvailability, value.availability);
    }

    return filteredTutorials;
}

 searchAvailability() {
     this.setState({
	 currentTutorials: [],
     });

     TutorialDataService.findByAvailability(this.state.searchAvailability)
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
  this.state.currentTutorials.push(tutorial);
}

  render() {
    const { searchAvailability, searchServices, reservationRequests } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Schedule"
              value={searchAvailability}
              onChange={this.onChangeSearchAvailability}
            />

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Servics"
                        value={searchServices}
                        onChange={this.onChangeSearchServices}
                  />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchAvailability}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div>
        <br />
        <br />
        </div>
        <div className="col-md-6">
          <h4>{"Doers List Available During: " + this.state.searchAvailability}</h4>

          <table className="doers-table">
          <thead>
           <tr>
              <td>Doer Name</td>
              <td>Services Requested</td>
              <td>Time Requested</td>
              <td>Request Time</td>
            </tr>
            </thead>
            <tbody>
            {reservationRequests &&
              reservationRequests.map((reservation, index) => (
                <tr className="doersRow" id={"reservation"+index} onClick={(event) => this.getActiveLabel(event, reservation)} key={index}>
                  <td className="cell-name-highlight">{reservation.doer_name} </td>
                  <td>{reservation.requested_services} </td>
                  <td> {reservation.requested_time} </td>
                   <td> {reservation.createdAt} </td>
                </tr>

              ))}
              </tbody>
          </table>

          <button
            className="m-3 btn btn-sm btn-info"
            onClick={this.scheduleDoers}
          >
            Schedule Doers!
          </button>
        </div>
        <br />
        <div>
        </div>
        <div className="col-md-6">
        </div>

<div className="overlay-bg">
</div>
<div id="overlay-content" className="overlay-content popup1">
<div id="overlay-content" className="overlay-content popup1"></div>
<p>Sent Scheduling Request!</p>
    <button className="close-btn" onClick={this.closeDialog}>Close</button>
</div>

 </div>

    );
  }
}