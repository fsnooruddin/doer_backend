import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import TutorialsFind from "./components/tutorials-find.component";
import ReservationsFind from "./components/reservations-find.component";
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
                <div class="dropdown">
                  <Link to={"/management"} className="nav-link">
                    Management
                  </Link>
                  <div class="dropdown-content">
                       <a href="/reservations">Reservation Stats</a>
                       <a href="/">Doer Stats</a>
                       <a href="/add">Add Doers</a>
                  </div>
                </div>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<TutorialsList/>} />
            <Route path="/management" element={<TutorialsList/>} />
            <Route path="/add" element={<AddTutorial/>} />
            <Route path="/find" element={<TutorialsFind/>} />
            <Route path="/reservations" element={<ReservationsFind/>} />
            <Route path="/tutorials/:id" element={<Tutorial/>} />
            <Route path="/doerapp" element={<DoerApp/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
