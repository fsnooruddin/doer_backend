import React, { Component } from "react";
import DoerDataService from "../services/doer.service";
import { withRouter } from '../common/with-router';

class Doer extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeServices = this.onChangeServices.bind(this);
    this.getDoer = this.getDoer.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateDoer = this.updateDoer.bind(this);
    this.deleteDoer = this.deleteDoer.bind(this);

    this.state = {
      currentDoer: {
        id: null,
        Name: "",
        Services: "",
        published: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getDoer(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentDoer: {
          ...prevState.currentDoer,
          name: name
        }
      };
    });
  }

  onChangeServices(e) {
    const services = e.target.value;

    this.setState(prevState => ({
      currentDoer: {
        ...prevState.currentDoer,
        services: services
      }
    }));
  }

  getDoer(id) {
    DoerDataService.get(id)
      .then(response => {
        this.setState({
          currentDoer: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentDoer.id,
      Name: this.state.currentDoer.Name,
      Services: this.state.currentDoer.Services,
      published: status
    };

    DoerDataService.update(this.state.currentDoer.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentDoer: {
            ...prevState.currentDoer,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateDoer() {
    DoerDataService.update(
      this.state.currentDoer.id,
      this.state.currentDoer
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Doer was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteDoer() {
    DoerDataService.delete(this.state.currentDoer.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/Doers');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentDoer } = this.state;

    return (
      <div>
        {currentDoer ? (
          <div className="edit-form">
            <h4>Doer</h4>
            <form>
              <div className="form-group">
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  value={currentDoer.Name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Services">Services</label>
                <input
                  type="text"
                  className="form-control"
                  id="Services"
                  value={currentDoer.Services}
                  onChange={this.onChangeServices}
                />
              </div>

              <div className="form-group">
                <label htmlFor="availability">Availability</label>
                <input
                  type="text"
                  className="form-control"
                  id="availability"
                  value={currentDoer.availability}
                  onChange={this.onChangeAvailability}
                />
              </div>


              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentDoer.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentDoer.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteDoer}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateDoer}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Doer...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Doer);