import React, { Component } from "react";
import DoerDataService from "../services/doer.service";
import { Link } from "react-router-dom";

export default class DoersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveDoers = this.retrieveDoers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDoer = this.setActiveDoer.bind(this);
    this.removeAllDoers = this.removeAllDoers.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      doers: [],
      currentDoer: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveDoers();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveDoers() {
    DoerDataService.getAll()
      .then(response => {
        this.setState({
          doers: response.data
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
      currentDoer: null,
      currentIndex: -1
    });
  }

  setActiveDoer(Doer, index) {
    this.setState({
      currentDoer: Doer,
      currentIndex: index
    });
  }

  removeAllDoers() {
    DoerDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentDoer: null,
      currentIndex: -1
    });

    DoerDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          doers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, doers, currentDoer, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Service / Speciality"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
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
          <h4>Doers List</h4>

          <ul className="list-group">
            {doers &&
              doers.map((doer, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveDoer(doer, index)}
                  key={index}
                >
                  {doer.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllDoers}
          >
            Remove All
          </button>
        </div>
        <br />
        <div>
        </div>
        <div className="col-md-6">
          {currentDoer ? (
            <div>
              <h4>Doer</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentDoer.name}
              </div>
              <div>
                <label>
                  <strong>Offered Services:</strong>
                </label>{" "}
                {currentDoer.services}
              </div>
            <div>
              <label>
                <strong>Availability:</strong>
              </label>{" "}
              {currentDoer.availability}
            </div>
              <div>
                <label>
                  <strong>Rating:</strong>
                </label>{" "}
                {Math.floor(Math.random() * 99)}
              </div>
              <div>
                <label>
                  <strong>Id:</strong>
                </label>{" "}
                {currentDoer.id}
              </div>
// TO DO -- Add stats around jobs completed, declined, requested
              <Link
                to={"/Doers/" + currentDoer.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>

            </div>
          )}
        </div>
      </div>
    );
  }
}
