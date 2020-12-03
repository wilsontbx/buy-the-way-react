import React from "react";
import Button from "@material-ui/core/Button";
import Product from "../Product";
import TransactionRequest from "../TransactionRequest";
import Confirmation from "../Comfirmation";
import "./PostRequest.scss";

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productname: null,
      imageUrl: null,
      imageAlt: null,
      country: null,
      category: null,
      foodexpiry: true,
      foodchilled: true,
      foodspecial: true,
      collectspecial: "no",
      url: null,
      qty: null,
      price: null,
      message: null,
      receipt: null,
      step: 1,
    };
  }

  setCurrentState(e) {
    const state = {};
    this.setState({ ...state, [e.target.name]: e.target.value });
  }

  setImage(e) {
    this.setState(e);
  }

  setCheckedBox(e) {
    const state = {};
    this.setState({ ...state, [e.target.name]: e.target.checked });
  }

  setForm(e, value) {
    let step = this.state.step;
    this.setState({
      step: step + value,
    });
  }

  render() {
    return (
      <div className="container">
        <h2 className="title mt-2">
          <strong>Post Request</strong>
        </h2>
        <div className="columns">
          <div className="column"></div>
          <div className="column">
            {this.state.step === 1 ? (
              <Product
                setCurrentState={(e) => {
                  this.setCurrentState(e);
                }}
                setImage={(e) => {
                  this.setImage(e);
                }}
                setCheckedBox={(e) => {
                  this.setCheckedBox(e);
                }}
                item={this.state}
              />
            ) : this.state.step === 2 ? (
              <TransactionRequest
                setCurrentState={(e) => {
                  this.setCurrentState(e);
                }}
                item={this.state}
              />
            ) : (
              <Confirmation item={this.state} />
            )}
          </div>
        </div>
        <div className="field is-grouped is-grouped-right">
          {this.state.step === 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                this.setForm(e, 1);
              }}
            >
              Next
            </Button>
          ) : this.state.step > 2 ? (
            <div>
              <Button
                variant="contained"
                onClick={(e) => {
                  this.setForm(e, -1);
                }}
              >
                Back
              </Button>
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant="contained"
                onClick={(e) => {
                  this.setForm(e, -1);
                }}
              >
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  this.setForm(e, 1);
                }}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Request;
