import React, { Component } from "react";
import {Modal, Button} from 'react-bootstrap';
import { useState } from 'react';
import DoerDataService from "../services/doer.service";
import { Link } from "react-router-dom";
const utils = require("../utils/Utils.js");

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchAvailability = this.onChangeSearchAvailability.bind(this);
    this.onChangeSearchServices = this.onChangeSearchServices.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.getCategories = this.getCategories.bind(this);

    this.state = {
      reservationRequests: [],
      searchAvailability: "",
      searchTitle: "",
      searchServices: "",
      currentReservations: []
    };
  }

  componentDidMount() {
    this.getCategories();
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
    this.getCategories();
    this.setState({
      currentDoers: [],
      currentReservations: []
    });
  }


 getCategories() {
     this.setState({
	 currentDoers: [],
     });

     DoerDataService.getAllCategories()
	 .then(response => {
	 	     console.log("in search availability ... DB response response");
     	     console.log(response.data);

	     console.log("in  get categories ...  response");
	     console.log(response.data);
	 })
	 .catch(e => {
             console.log(e);
	 });
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
