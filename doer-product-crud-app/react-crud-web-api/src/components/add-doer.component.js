import React, { Component } from "react";
import DoerDataService from "../services/doer.service";

export default class AddDoer extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAvailability = this.onChangeAvailability.bind(this);
    this.saveDoer = this.saveDoer.bind(this);
    this.newDoer = this.newDoer.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      availability: "",
      published: "",

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeAvailability(e) {
    this.setState({
      availability: e.target.value
    });
  }

  saveDoer() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      availability: this.state.availability,
      published: this.state.published
    };

    DoerDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          availability: response.data.availability,
          published: response.data.published,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newDoer() {
    this.setState({
      id: null,
      title: "",
      description: "",
      availability: "",
      published: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newDoer}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Name of Business</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Services Offered</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

           <div className="form-group">
              <label htmlFor="availability">Availability</label>
              <input
                type="text"
                className="form-control"
                id="availability"
                required
                value={this.state.availability}
                onChange={this.onChangeAvailability}
                name="availability"
              />
            </div>

            <button onClick={this.saveDoer} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
