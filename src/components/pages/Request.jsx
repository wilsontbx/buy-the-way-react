import React from "react";
import { Link } from "react-router-dom";
import Product from "./../Product";
import TransactionRequest from "./../TransactionRequest";
import Confirmation from "./../Comfirmation";
import "./Request.scss";

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productname: null,
      imageUrl: null,
      imageAlt: null,
      country: null,
      category: null,
      foodexpiry: null,
      foodchilled: null,
      foodspecial: null,
      collectspecial: null,
      url: null,
      qty: null,
      price: null,
      message: null,
      receipt: null,
    };
  }

  setCurrentState(e) {
    const state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  setImage(e) {
    this.setState(e);
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
            <Product
              setCurrentState={(e) => {
                this.setCurrentState(e);
              }}
              setImage={(e) => {
                this.setImage(e);
              }}
              item={this.state}
            />
            <TransactionRequest
              setCurrentState={(e) => {
                this.setCurrentState(e);
              }}
              item={this.state}
            />
            <Confirmation item={this.state} />
          </div>
        </div>
        <Link className="button is-primary">Next</Link>
      </div>
    );
  }
}

export default Request;
