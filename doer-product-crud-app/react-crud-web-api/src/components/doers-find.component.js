import React, { Component } from "react";
import {Modal, Button} from 'react-bootstrap';
import { useState } from 'react';
import DoerDataService from "../services/doer.service";
import { Link } from "react-router-dom";

export default class DoersFind extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchAvailability = this.onChangeSearchAvailability.bind(this);
    this.onChangeSearchServices = this.onChangeSearchServices.bind(this);
    this.retrieveDoers = this.retrieveDoers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.scheduleDoers = this.scheduleDoers.bind(this);
    this.searchAvailability = this.searchAvailability.bind(this);

    this.state = {
      Doers: [],
      currentDoers: [],
      searchAvailability: "",
      searchServices: ""
    };
  }

  componentDidMount() {
    this.retrieveDoers();
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

  retrieveDoers() {

    DoerDataService.getAll()
      .then(response => {
        this.setState({
          Doers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDoers();
    this.setState({
      currentDoers: [],
      searchAvailability: "",
      searchServices: ""
    });
  }

scheduleDoers() {

  if(this.state.searchAvailability.length == 0 && this.state.searchServices.length == 0) {
      var modal = document.getElementById("overlay-content-find-doers-input-validation");
        modal.style.display = "block";
           window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
    return;
  }

  if(this.state.currentDoers.length == 0 ) {
       var modal = document.getElementById("overlay-content-find-doers-select-doers");
           modal.style.display = "block";
              window.scrollTo({
                   top: 0,
                   behavior: 'smooth'
                 });
    return;
  }


   console.log(this.state.currentDoers);
   // alert("Sent Scheduling Requests!");
    // Get the modal
    var modal = document.getElementById("overlay-content-find-doers");
    modal.style.display = "block";

    DoerDataService.scheduleDoers(this.state.currentDoers, this.state.searchAvailability, this.state.searchServices);

    var doers_list = document.getElementsByClassName("doersRow");
    for(let i=0;i<doers_list.length;i++) {
        doers_list[i].bgColor = "";
        doers_list[i].childNodes[0].className = "cell-name-highlight";
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
  }

 closeDialog() {
    // Get the modal
    var modal = document.getElementById("overlay-content-find-doers");
    modal.style.display = "none";

    this.refreshList();
  }

closeDialogInputValidation() {
    // Get the modal
    var modal = document.getElementById("overlay-content-find-doers-input-validation");
    modal.style.display = "none";

  }

closeDialogInputValidationSelectDoers() {
    // Get the modal
    var modal = document.getElementById("overlay-content-find-doers-select-doers");
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

filterResultsByTime(Doers) {
    if(this.state.searchAvailability.length == 0) {
        return Doers;
    }

    const filteredDoers = Doers.filter(filterTimeFunction, this);

    function filterTimeFunction(value, index, array) {
        console.log("...filtering...");
        console.log(value);
        //console.log(time);
        console.log(this.state);
        return this.processTimeMatch(this.state.searchAvailability, value.availability);
    }

    return filteredDoers;
}

 searchAvailability() {
     this.setState({
	 currentDoers: [],
     });

     DoerDataService.findByAvailabilityandServices(this.state.searchAvailability, this.state.searchServices)
	 .then(response => {
	 	     console.log("in search availability ... DB response response");
     	     console.log(response.data);

             const filteredResponse = this.filterResultsByTime(response.data);
             this.setState({
		        Doers: filteredResponse
             });
	     console.log("in search availability ... filtered response");
	     console.log(filteredResponse);
	 })
	 .catch(e => {
             console.log(e);
	 });
}

getActiveLabel(event, Doer)
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
  this.state.currentDoers.push(Doer);
}

  render() {
    const { searchAvailability, searchServices, Doers } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">

          <input
            type="text"
            className="form-control"
            placeholder="Search by Services"
            value={searchServices}
            onChange={this.onChangeSearchServices}
            />
            &nbsp;
            <input
              type="text"
              className="form-control"
              placeholder="Search by Schedule"
              value={searchAvailability}
              onChange={this.onChangeSearchAvailability}
            />
            &nbsp;
            &nbsp;
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

        <div className="col-md-666">
          <h4>{"Doers List Available During: " + this.state.searchAvailability}</h4>

          <table className="doers-table">
          <thead>
           <tr>
              <td>Name</td>
              <td>Services Offered</td>
              <td>Availability</td>
            </tr>
            </thead>
            <tbody>
            {Doers &&
              Doers.map((Doer, index) => (
                <tr className="doersRow" id={Doer.title} onClick={(event) => this.getActiveLabel(event, Doer)} key={index}>
                  <td className="cell-name-highlight">{Doer.name}</td>

                  <td className="cell-description-highlight">{Doer.services} </td>
                  <td className="cell-availability-highlight"> {Doer.availability} </td>
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

<div id="overlay-content-find-doers" className="overlay-content-find-doers">
<p>Your request has been sent to Doers! Sit tight, will confirm soon!</p><br/>
<p></p>
    <button className="close-btn-find-doers" onClick={this.closeDialog}>Close</button>
</div>
 </div>

 <div className="overlay-bg">

 <div id="overlay-content-find-doers-input-validation" className="overlay-content-find-doers-input-validation">
 <p>Please select what services you need AND when you need them...thanks!</p><br/>
 <p></p>
     <button className="close-btn-find-doers-input-validation" onClick={this.closeDialogInputValidation}>Close</button>
 </div>
  </div>

<div className="overlay-bg">

 <div id="overlay-content-find-doers-select-doers" className="overlay-content-find-doers-select-doers">
 <p>Please select some doers...thanks!</p><br/>
 <p></p>
     <button className="close-btn-find-doers-select-doers" onClick={this.closeDialogInputValidationSelectDoers}>Close</button>
 </div>
  </div>

</div>
    );
  }
}
