import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddDoer from "./components/add-doer.component";
import Doer from "./components/doer.component";
import DoersList from "./components/doers-list.component";
import DoersFind from "./components/doers-find.component";
import ReservationsFind from "./components/reservations-find.component";
import Categories from "./components/categories-list.component";
import ReservationsFinances from "./components/reservation-finances.component";
import DoerApp from "./components/doer-app.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/find"} className="navbar-brand">
            Doer v1
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/find"} className="nav-link">
                Find Doers
              </Link>
            </li>
           <li className="nav-item">
                <Link to={"/doerapp"} className="nav-link">
                  Doer App
                </Link>
            </li>
           <li className="nav-item">
                <div className="dropdown">
                  <Link to={"/management"} className="nav-link">
                    Management
                  </Link>
                  <div className="dropdown-content">
                       <a href="/reservations">Reservation Stats</a>
                       <a href="/">Doer Stats</a>
                       <a href="/finances">Finances</a>
                        <a href="/categories">Categories</a>
                       <a href="/add">Add Doers</a>
                  </div>
                </div>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<DoersList/>} />
            <Route path="/management" element={<DoersList/>} />
            <Route path="/add" element={<AddDoer/>} />
            <Route path="/find" element={<DoersFind/>} />
            <Route path="/reservations" element={<ReservationsFind/>} />
            <Route path="/finances" element={<ReservationsFinances/>} />
              <Route path="/categories" element={<Categories/>} />
            <Route path="/doers/:id" element={<Doer/>} />
            <Route path="/doerapp" element={<DoerApp/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
