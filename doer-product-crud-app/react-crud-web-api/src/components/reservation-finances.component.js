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

    this.refreshList = this.refreshList.bind(this);


    this.state = {
      reservationRequests: [],
      searchAvailability: "",
      searchTitle: "",
      searchServices: "",
      currentReservations: []
    };
  }

  componentDidMount() {

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

    this.setState({
      currentDoers: [],
      currentReservations: []
    });
  }




 closeDialog() {
    // Get the modal
    var modal = document.getElementById("overlay-content");
    modal.style.display = "none";
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
                  <td className="cell-svcs-highlight">{"$" + (Math.random()*100000).toFixed(2)}</td>

                  <td className="cell-status-highlight">{"$" + (Math.random()*100000).toFixed(2)}</td>
                </tr>

           <tr>
                  <td className="cell-name-highlight">Amount Sent to Doers:</td>
                  <td className="cell-svcs-highlight">{"$" + (Math.random()*100000).toFixed(2)}</td>

                  <td className="cell-status-highlight">{"$" + (Math.random()*100000).toFixed(2)}</td>
                </tr>

           <tr>
                  <td className="cell-name-highlight">Average Revenue per Job:</td>
                  <td className="cell-svcs-highlight">{"$" + (Math.random()*100000).toFixed(2)}</td>

                  <td className="cell-status-highlight">{"$" + (Math.random()*100000).toFixed(2)}</td>
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

           <tbody>
            <tr>
                  <td className="cell-name-highlight"></td>
                  <th className="cell-svcs-highlight">This Month</th>

                  <th className="cell-status-highlight">Year to Date</th>
                </tr>



           <tr>
                  <td className="cell-name-highlight">Top Earning Doer:</td>
                  <td className="cell-svcs-highlight">{"$" + (Math.random()*100000).toFixed(2)}</td>

                  <td className="cell-status-highlight">{"$" + (Math.random()*100000).toFixed(2)}</td>
                </tr>

           <tr>
                  <td className="cell-name-highlight">Highest per hour rate:</td>
                  <td className="cell-svcs-highlight">{"$" + (Math.random()*100000).toFixed(2)}</td>

                  <td className="cell-status-highlight">{"$" + (Math.random()*100000).toFixed(2)}</td>
                </tr>

           <tr>
                  <td className="cell-name-highlight">Longest Job:</td>
                  <td className="cell-svcs-highlight">{"$" + (Math.random()*100000).toFixed(2)}</td>

                  <td className="cell-status-highlight">{"$" + (Math.random()*100000).toFixed(2)}</td>
                </tr>
            </tbody>
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
