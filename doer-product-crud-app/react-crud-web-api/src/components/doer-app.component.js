import React, { Component } from "react";
import {Modal, Button} from 'react-bootstrap';
import { useState } from 'react';
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class DoerApp extends Component {
  constructor(props) {
    super(props);
    this.retrieveReservations = this.retrieveReservations.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.onChangeDoerLogin = this.onChangeDoerLogin.bind(this);
    this.scheduleDoers = this.scheduleDoers.bind(this);
    this.acceptJobs = this.acceptJobs.bind(this);
    this.declineJobs = this.declineJobs.bind(this);
    this.processDoerLogin = this.processDoerLogin.bind(this);

    this.state = {
      loginName: "",
      doerId: "",
      currentReservations: []
    };
  }

  componentDidMount() {
    this.retrieveReservations();
  }

onChangeDoerLogin(e) {
    const doerId = e.target.value;
    this.setState({
      doerId: doerId
    });
  }

  refreshList() {
    this.retrieveReservations();
    this.setState({
      currentReservations: []
    });
  }

  acceptJobs() {

     console.log(this.state.currentReservations);
     // alert("Sent Scheduling Requests!");
      // Get the modal
      var modal = document.getElementById("overlay-content");
      modal.style.display = "block";

      TutorialDataService.acceptJobs(this.state.currentReservations, this.state.doerID);

      var doers_list = document.getElementsByClassName("doersRow");
      for(let i=0;i<doers_list.length;i++) {
          doers_list[i].bgColor = "";
          doers_list[i].childNodes[0].className = "cell-name-highlight";
      }

    this.setState({
        currentReservations: []
      });
    }

    declineJobs() {

     console.log(this.state.currentReservations);
     // alert("Sent Scheduling Requests!");
      // Get the modal
      var modal = document.getElementById("overlay-content-2");
      modal.style.display = "block";

      TutorialDataService.declineJobs(this.state.currentReservations, this.state.doerID);

      var doers_list = document.getElementsByClassName("doersRow");
      for(let i=0;i<doers_list.length;i++) {
          doers_list[i].bgColor = "";
          doers_list[i].childNodes[0].className = "cell-name-highlight";
      }

    this.setState({
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

 closeDialog1() {
    // Get the modal
    var modal = document.getElementById("overlay-content");
    modal.style.display = "none";
  }

 closeDialog2() {
    // Get the modal
    var modal = document.getElementById("overlay-content-2");
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

filterResultsByDoerId(tutorials) {
    if(this.state.doerId == null) {
        return tutorials;
    }

    const filteredTutorials = tutorials.filter(filterIdFunction, this);

    function filterIdFunction(value, index, array) {
        console.log("...filtering...");
        console.log(value);
        //console.log(time);
        console.log(this.state);
        return (this.state.doerId == value.tutorialId);
    }

    return filteredTutorials;
}

processDoerLogin() {
     this.setState({
	 currentTutorials: [],
     });

     TutorialDataService.getAllReservationsRequests()
	 .then(response => {
	 	     console.log("in processDoerLogin ... DB response response");
     	     console.log(response.data);

             const filteredResponse = this.filterResultsByDoerId(response.data);
             this.setState({
		        reservationRequests: filteredResponse
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
  this.state.currentReservations.push(tutorial);
}

getJSDateTime(mysqlDateTime)
{
 var t = mysqlDateTime.split("T");
 var r = t[1].split(".");
 return (t[0]+ " " + r[0]);
}

  render() {
    const { processDoerLogin, searchServices, reservationRequests } = this.state;

    return (
         <div className="list row">
           <div className="col-md-8">
             <div className="input-group mb-3">

             <input
               type="text"
               className="form-control"
               placeholder="Doer Login"
               value={searchServices}
               onChange={this.onChangeDoerLogin}
               />
               &nbsp;
               &nbsp;
               &nbsp;
               <div className="input-group-append">
                 <button
                   className="btn btn-outline-secondary"
                   type="button"
                   onClick={this.processDoerLogin}
                 >
                   Login
                 </button>
               </div>
             </div>
           </div>

           <div className="col-md-666">
             <h4>{"Job requests sent -- select the ones that you are interested in... "}</h4>

             <table className="doers-table">
             <thead>
              <tr>
                 <td>Name</td>
                 <td>Services Requested</td>
                 <td>Time Request</td>
                 <td>Request Sent At</td>
               </tr>
               </thead>
               <tbody>
            {reservationRequests &&
              reservationRequests.map((reservation, index) => (
                <tr className="doersRow" id={"reservation"+index} onClick={(event) => this.getActiveLabel(event, reservation)} key={index}>
                  <td className="cell-name-highlight">{reservation.doer_name} </td>
                  <td className="cell-svcs-highlight">{reservation.requested_services} </td>
                  <td className="cell-time-highlight">{reservation.requested_time}</td>
                  <td className="cell-createtime-highlight">{this.getJSDateTime(reservation.createdAt)}</td>
                </tr>

              ))}
               </tbody>
             </table>

             <button
               className="m-3 btn btn-sm btn-info"
               onClick={this.acceptJobs}
             >
               Accept Job Requests!
             </button>

                         <button
                            className="btn btn-sm btn-danger"
                            onClick={this.declineJobs}
                          >
                            Decline Job Requests!
                          </button>
                              </div>


           <br />
           <div>
           </div>
           <div className="col-md-6">
           </div>

   <div className="overlay-bg">

   <div id="overlay-content" className="overlay-content popup-doer-app">
   <p>Accepted Jobs! Goodluck!</p><br/>
   <p></p>
       <button className="close-btn-doer-app" onClick={this.closeDialog1}>Close</button>
   </div>
    </div>

     <div className="overlay-bg">

       <div id="overlay-content-2" className="overlay-content-2 popup-doer-app">
       <p>Declined Jobs Check back soon for more jobs!</p>

           <button className="close-btn-doer-app" onClick={this.closeDialog2}>Close</button>
       </div>
        </div>

   </div>

    ); // end return
  }
}
