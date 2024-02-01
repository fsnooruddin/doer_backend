import React, { Component } from "react";
import {Modal, Button} from 'react-bootstrap';
import { useState } from 'react';
import { Link } from "react-router-dom";
import DoerDataService from "../services/doer.service";

const utils = require("../utils/Utils.js");

export default class DoerApp extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.onChangeDoerLogin = this.onChangeDoerLogin.bind(this);
    this.acceptJobs = this.acceptJobs.bind(this);
    this.declineJobs = this.declineJobs.bind(this);
    this.completeJobs = this.completeJobs.bind(this);
    this.abandonJobs = this.abandonJobs.bind(this);
    this.addNoteToJob = this.addNoteToJob.bind(this);
    this.showAddNotesForm = this.showAddNotesForm.bind(this);
    this.processDoerLogin = this.processDoerLogin.bind(this);
    this.getAcceptedJobsLabel = this.getAcceptedJobsLabel.bind(this);
    this.renderAcceptedJobsTable = this.renderAcceptedJobsTable.bind(this);
    this.handlePopupFormSubmit = this.handlePopupFormSubmit.bind(this);

    this.state = {
      loginName: "",
      doerId: "",
      currentReservations: [],
      sentReservationRequests: [],
      acceptedReservationRequests: [],
      currentDoer: null,
      loggedIn: false
    };
  }

  componentDidMount() {
    this.processDoerLogin();
    let loginForm = document.getElementById("popupForm");
    loginForm.addEventListener("submit", this.addNoteToJob);
  }

onChangeDoerLogin(e) {
    const doerId = e.target.value;
    this.setState({
      doerId: doerId
    });
  }

  refreshList() {

        this.processDoerLogin();


    this.setState({
      currentReservations: []
    });
  }

handlePopupFormSubmit() {
    alert("this.handlePopupFormSubmit");
}

acceptJobs() {

 console.log(this.state.currentReservations);
 // alert("Sent Scheduling Requests!");
  // Get the modal
  var modal = document.getElementById("overlay-content");
  modal.style.display = "block";

  DoerDataService.acceptJobs(this.state.currentReservations, this.state.doerID);

  var doers_list = document.getElementsByClassName("doersRow");
  for(let i=0;i<doers_list.length;i++) {
      doers_list[i].bgColor = "";
      doers_list[i].childNodes[0].className = "cell-name-highlight";
  }

this.setState({
    currentReservations: []
  });
}

getAcceptedJobsLabel() {

    return <h4>Accepted Job Requests ... remember to mark them completed when youre done!</h4>;
}

renderAcceptedJobsTable() {

    if(this.state.acceptedReservationRequests.length > 0 ) {
        return true;
    }

    return false;
}

declineJobs() {

 console.log(this.state.currentReservations);
 // alert("Sent Scheduling Requests!");
  // Get the modal
  var modal = document.getElementById("overlay-content-declined-jobs");
  modal.style.display = "block";

  DoerDataService.declineJobs(this.state.currentReservations, this.state.doerID);

  var doers_list = document.getElementsByClassName("doersRow");
  for(let i=0;i<doers_list.length;i++) {
      doers_list[i].bgColor = "";
      doers_list[i].childNodes[0].className = "cell-name-highlight";
  }

this.setState({
    currentReservations: []
  });
}

abandonJobs() {

 console.log(this.state.currentReservations);
 // alert("Sent Scheduling Requests!");
  // Get the modal
  var modal = document.getElementById("overlay-content-abandon-jobs");
  modal.style.display = "block";

  DoerDataService.abandonJobs(this.state.currentReservations, this.state.doerID);

  var doers_list = document.getElementsByClassName("doersRow");
  for(let i=0;i<doers_list.length;i++) {
      doers_list[i].bgColor = "";
      doers_list[i].childNodes[0].className = "cell-name-highlight";
  }

this.setState({
    currentReservations: []
  });
}

showAddNotesForm() {
if(this.state.currentReservations.length == 0) {
    alert("please select some jobs to add notes");
    return;
  }

  var modal = document.getElementById("popupForm");
  modal.style.display = "block";

}

addNoteToJob() {

 console.log(this.state.currentReservations);
 // alert("Sent Scheduling Requests!");
  // Get the modal
  var modal = document.getElementById("popupForm");
  modal.style.display = "none";

  var notes = document.getElementById("notes-text");

  if(this.state.currentReservations.length == 0) {
    alert("please select one job to add notes");
    return;
  }

  if(this.state.currentReservations.length > 1) {
    alert("please select one to add notes");
    return;
  }

  DoerDataService.addNotesToJob(this.state.currentReservations[0], this.state.doerId, notes.value);

this.setState({
    currentReservations: []
  });
}

completeJobs() {

 console.log(this.state.currentReservations);
 // alert("Sent Scheduling Requests!");
  // Get the modal
  var modal = document.getElementById("overlay-content-complete-jobs");
  modal.style.display = "block";

  DoerDataService.completeJobs(this.state.currentReservations, this.state.doerID);

  var doers_list = document.getElementsByClassName("doersRow");
  for(let i=0;i<doers_list.length;i++) {
      doers_list[i].bgColor = "";
      doers_list[i].childNodes[0].className = "cell-name-highlight";
  }

this.setState({
    currentReservations: []
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

closeDialog3() {
    // Get the modal
    var modal = document.getElementById("overlay-content-complete-jobs");
    modal.style.display = "none";
  }

closeDialog4() {
    // Get the modal
    var modal = document.getElementById("overlay-content-abandon-jobs");
    modal.style.display = "none";
  }

closeDialog5() {
    // Get the modal
    var modal = document.getElementById("overlay-content-declined-jobs");
    modal.style.display = "none";
  }

closeDialog6() {
    // Get the modal
    var modal = document.getElementById("loginPopup");
    modal.style.display = "none";
  }


filterResultsByDoerId(doers) {
    if(this.state.doerId == null) {
        return doers;
    }

    const filteredDoers = doers.filter(filterIdFunction, this);

    function filterIdFunction(value, index, array) {
        console.log("...filtering...");
        console.log(value);
        //console.log(time);
        console.log(this.state);
        return (this.state.doerId == value.DoerId);
    }

    return filteredDoers;
}

processDoerLogin() {

     this.setState({
	 currentDoers: [],
	 sentReservationRequests: [],
     acceptedReservationRequests: []
     });

    if(this.state.doerId.length == 0) {
        return;
    }

     DoerDataService.getReservationsRequestsbyDoerIdandState(this.state.doerId, "requested")
	 .then(response => {
	 	     console.log("in processDoerLogin ... DB response response");
     	     console.log(response.data);

               this.setState({
                sentReservationRequests: response.data,
             	 loggedIn: true
                  });
	 })
	 .catch(e => {
             console.log(e);
	 });

     DoerDataService.getReservationsRequestsbyDoerIdandState(this.state.doerId, "accepted")
	 .then(response => {
	 	     console.log("in processDoerLogin ... DB response response");
     	     console.log(response.data);

             this.setState({
		        acceptedReservationRequests: response.data,
		         loggedIn: true
             });
	 })
	 .catch(e => {
             console.log(e);
	 });

	 DoerDataService.get(this.state.doerId)
	  .then(response => {
     	 	     console.log("in processDoerLogin ... DB response response");
          	     console.log(response.data);

                  this.setState({
     		        currentDoer: response.data
                  });
     	 })
     	 .catch(e => {
                  console.log(e);
     	 });

}

getActiveLabel(event, doer)
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
  this.state.currentReservations.push(doer);
}



  render() {
    const { processDoerLogin, searchServices, sentReservationRequests, acceptedReservationRequests, currentDoer } = this.state;

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

           { this.state.loggedIn ? (

           <div>
           <ul>
             <li><a href="#doers-request-table">Job Requests</a></li>
             <li><a href="#doers-accepted-request-table">Accepted Jobs</a></li>
             <li><a href="#doer-req-count-table">Jobs Summary</a></li>
             <li><a href="#doer-finance-table">Financial Summary</a></li>
           </ul>
           <div className="col-md-666">
             <h4>{"Job requests sent -- select the ones that you are interested in... "}</h4>

             <table className="doers-table"  className="doers-request-table">
             <thead>
              <tr>
                 <td>Name</td>
                 <td>Services Requested</td>
                 <td>Time Request</td>
                 <td>Request Sent At</td>
               </tr>
             </thead>
             <tbody>
                    {sentReservationRequests &&
                      sentReservationRequests.map((reservation, index) => (
                        <tr className="doersRow" id={"reservation"+index} onClick={(event) => this.getActiveLabel(event, reservation)} key={index}>
                          <td className="cell-name-highlight">{reservation.doer_name} </td>
                          <td className="cell-svcs-highlight">{reservation.requested_services} </td>
                          <td className="cell-time-highlight">{reservation.requested_time}</td>
                          <td className="cell-createtime-highlight">{utils.getJSDateTime(reservation.createdAt)}</td>
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

         {this.renderAcceptedJobsTable() ? (
         <div className="col-md-666">
                      {this.getAcceptedJobsLabel()}


                      <table className="doers-table" id="doers-accepted-request-table">
                      <thead>
                       <tr>
                          <td>Name</td>
                          <td>Services Requested</td>
                          <td>Time Request</td>
                          <td>Request Sent At</td>
                        </tr>
                      </thead>
                      <tbody>
                             {acceptedReservationRequests &&
                               acceptedReservationRequests.map((reservation, index) => (
                                 <tr className="doersRow" id={"reservation"+index} onClick={(event) => this.getActiveLabel(event, reservation)} key={index}>
                                   <td className="cell-name-highlight">{reservation.doer_name} </td>
                                   <td className="cell-svcs-highlight">{reservation.requested_services} </td>
                                   <td className="cell-time-highlight">{reservation.requested_time}</td>
                                   <td className="cell-createtime-highlight">{utils.getJSDateTime(reservation.createdAt)}</td>
                                 </tr>
                               ))}
                      </tbody>
                      </table>


                      <button
                        className="m-3 btn btn-sm btn-info"
                        onClick={this.completeJobs}
                      >
                        Complete Job Requests!
                      </button>

                      <button
                         className="btn btn-sm btn-danger"
                         onClick={this.abandonJobs}
                       >
                         Abandon Job Requests!
                       </button>

                       <button
                            className="btn btn-sm btn-info"
                            onClick={this.showAddNotesForm}
                          >
                            Send a note!
                          </button>
 </div>
        ) : (<div><span><h4>No accepted jobs.</h4></span></div>) }

           {currentDoer ? (
           <div className="col-md-666">
           <div className="doer-req-count-table-div" id="doer-req-count-table-div">
           <h4>{"Job Summary Table "}</h4>
           <table className="doer-req-count-table" id="doer-req-count-table">

             <thead>
              <tr>
                <th>Request Status</th>
                <th>Count</th>
              </tr>
               </thead>

              <tbody>
              <tr>
                <td>Accepted</td>
                <td>{currentDoer.accepted_reservations_count}</td>
              </tr>
              <tr>
                <td>Completed</td>
                <td>{currentDoer.completed_reservations_count}</td>
              </tr>
              <tr>
                  <td>Abandonded</td>
                  <td>{currentDoer.abandoned_reservations_count}</td>
                </tr>
               <tr>
                  <td>Declined</td>
                  <td>{currentDoer.declined_reservations_count}</td>
               </tr>
              </tbody>
            </table>
            </div>

            <div className="doer-finance-table-div" id="doer-finance-table-div">
           <h4>{"Finance Summary Table "}</h4>
           <table className="doer-finance-table" id="doer-finance-table">

             <thead>
              <tr>
                <th>Number of Jobs</th>
                <th>Amount Earnt</th>
              </tr>
               </thead>

              <tbody>
              <tr>
                <td>This Week</td>
                <td>{currentDoer.accepted_reservations_count}</td>
              </tr>
              <tr>
                <td>This Month</td>
                <td>{currentDoer.completed_reservations_count}</td>
              </tr>
              <tr>
                  <td>Year to Date</td>
                  <td>{currentDoer.abandoned_reservations_count}</td>
                </tr>
               <tr>
                  <td>All Time</td>
                  <td>{currentDoer.declined_reservations_count}</td>
               </tr>
              </tbody>
            </table>
            </div>
            </div>
                    ) : (<div><span><h4>No accepted jobs.</h4></span></div>) }

                     </div>
         ) : (
                <div></div>
         )}

   <div className="overlay-bg">
       <div id="overlay-content" className="overlay-content popup-doer-app">
         <p>Accepted Jobs! Goodluck!</p><br/>
         <button className="close-btn-doer-app" onClick={this.closeDialog1}>Close</button>
       </div>
    </div>

     <div className="overlay-bg">
       <div id="overlay-content-2" className="overlay-content-2 popup-doer-app">
          <p>Declined Jobs Check back soon for more jobs!</p>
          <button className="close-btn-doer-app" onClick={this.closeDialog2}>Close</button>
        </div>
     </div>


     <div className="overlay-bg">
          <div id="overlay-content-complete-jobs" className="overlay-content popup-doer-app">
            <p>Completed Jobs! Great Job!</p><br/>
            <button className="close-btn-doer-app" onClick={this.closeDialog3}>Close</button>
          </div>
       </div>

     <div className="overlay-bg">
          <div id="overlay-content-declined-jobs" className="overlay-content popup-doer-app">
            <p>Declined Jobs! Keep your eye open for new jobs!</p><br/>
            <button className="close-btn-doer-app" onClick={this.closeDialog5}>Close</button>
          </div>
       </div>


        <div className="overlay-bg">
          <div id="overlay-content-abandon-jobs" className="overlay-content-2 popup-doer-app">
             <p>Abandoned Jobs Check back soon for more jobs!</p>
             <button className="close-btn-doer-app" onClick={this.closeDialog4}>Close</button>
           </div>
        </div>

 <div class="loginPopup">
      <div class="formPopup" id="popupForm">
        <form action="#" className="formContainer" >
          <h2>Enter your notes here</h2>

          <input type="text" id="notes-text" placeholder="Notes..." name="notes" required/>
          <button type="submit" class="btn">Submit</button>
          <button type="button" class="btn cancel" onClick={this.closeDialog6}>Close</button>
        </form>
      </div>
    </div>

      </div>


    ); // end return
  }
}
