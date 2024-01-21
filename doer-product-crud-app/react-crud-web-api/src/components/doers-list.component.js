import React, { Component } from "react";
import DoerDataService from "../services/doer.service";
import { Link } from "react-router-dom";

export default class DoersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveDoers = this.retrieveDoers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDoer = this.setActiveDoer.bind(this);
    this.removeAllDoers = this.removeAllDoers.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      doers: [],
      currentDoer: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveDoers();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
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

  searchName() {
    this.setState({
      currentDoer: null,
      currentIndex: -1
    });

    DoerDataService.findByName(this.state.searchName)
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
    const { searchName, doers, currentDoer, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
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
                {currentDoer.rating}
              </div>
              <div>
              <label>
                <strong>Review Count:</strong>
              </label>{" "}
              {currentDoer.review_count}
            </div>
            <div>
            <label>
              <strong>Location:</strong>
            </label>{" "}
            {currentDoer.location}
          </div>
           <div>
            <label>
              <strong>Phone Number:</strong>
            </label>{" "}
            {currentDoer.phone_number}
          </div>
           <div>
            <img
              src={currentDoer.img_url} width="100" height="100"
            />{" "}
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
