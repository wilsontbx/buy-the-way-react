import React from "react";

class TransactionRequest extends React.Component {
  render() {
    return (
      <div>
        <div className="field">
          <label className="label">Product reference link (optional)</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="url"
              placeholder="Enter the URL for reference"
              onChange={(e) => {
                this.props.setCurrentState(e);
              }}
            />
          </div>
        </div>

        <label className="label">Qty of purchase</label>
        <div className="field has-addons">
          <p className="control is-expanded">
            <input
              className="input"
              type="text"
              name="qty"
              placeholder=""
              onChange={(e) => {
                this.props.setCurrentState(e);
              }}
            />
          </p>
          <p className="control">
            <span className="select">
              <select>
                <option>pc</option>
                <option>box</option>
              </select>
            </span>
          </p>
        </div>

        <label className="label">Transaction Price</label>
        <div className="field has-addons">
          <p className="control">
            <a className="button is-static">S$</a>
          </p>
          <p className="control is-expanded">
            <input
              className="input"
              type="text"
              name="price"
              placeholder="Amount in SGD"
              onChange={(e) => {
                this.props.setCurrentState(e);
              }}
            />
          </p>
        </div>

        <label className="label">Message</label>
        <div className="control mb-2">
          <textarea
            className="textarea has-fixed-size"
            name="message"
            placeholder="Please indicate colors, special handling, etc"
            onChange={(e) => {
              this.props.setCurrentState(e);
            }}
          ></textarea>
        </div>

        <div className="control">
          <strong>Do you require a receipt? </strong>

          <label className="radio px-2">
            <input
              type="radio"
              name="receipt"
              onChange={(e) => {
                this.props.setCurrentState(e);
              }}
            />
            Yes
          </label>
          <label className="radio px-2">
            <input
              type="radio"
              name="receipt"
              onChange={(e) => {
                this.props.setCurrentState(e);
              }}
            />
            No
          </label>
        </div>
      </div>
    );
  }
}

export default TransactionRequest;
