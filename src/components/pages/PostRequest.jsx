import React from "react";
import "./PostRequest.scss";

class PostRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      showfood: false,
      showcollectible: false,
    };
  }

  categoryChange(e) {
    this.setState({
      category: e.target.value,
    });
    if (e.target.value === "Food") {
      this.setState({
        showfood: true,
        showcollectible: false,
      });
    } else if (e.target.value === "Collectible") {
      this.setState({
        showfood: false,
        showcollectible: true,
      });
    } else {
      this.setState({
        showcollectible: false,
        showfood: false,
      });
    }
  }

  render() {
    return (
      <div className="container">
        <h2 className="title mt-2">
          <strong>Post Request</strong>
        </h2>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Product name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="productname"
                  placeholder="Enter the product name"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Photo</label>
              <div className="file is-boxed">
                <label className="file-label">
                  <input className="file-input" type="file" name="imageurl" />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label has-text-grey">
                      Choose a file…
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <div className="field">
              <label className="label">Country</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select name="country">
                    <option>Hong Kong</option>
                    <option>Japan</option>
                    <option>Korea</option>
                  </select>
                </div>
              </div>
              <p className="help is-black is-italic">
                Current available country is Hong Kong only
              </p>
            </div>

            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    onChange={(e) => {
                      this.categoryChange(e);
                    }}
                    id="category"
                    name="category"
                  >
                    <option value="Select">Select dropdown</option>
                    <option value="Food">Food</option>
                    <option value="Collectible">Collectible item</option>
                  </select>
                </div>
              </div>
            </div>

            {this.state.showfood ? (
              <div id="food">
                <label className="label">
                  What is the nature of the product
                </label>
                <div className="field">
                  <div className="control">
                    <label className="checkbox">
                      Does it have an expiry of 3-5 days?
                      <input type="checkbox" name="foodexpiry" />
                    </label>
                    {/* <div className="control"> */}
                    <label className="checkbox">
                      Does it need to be chilled?
                      <input type="checkbox" name="foodchilled" />
                    </label>
                    {/* </div> */}
                    <label className="checkbox">
                      Do you require special handling?
                      <input type="checkbox" name="foodspecial" />
                    </label>
                  </div>
                </div>
              </div>
            ) : null}

            {this.state.showcollectible ? (
              <div id="collectible">
                <label className="label">Is this item fragile?</label>
                <div className="field">
                  <div className="control">
                    <label className="radio px-2">
                      Yes, it requires special handling
                      <input type="radio" name="collectspecial" />
                    </label>
                    {/* <div className="control"> */}
                    <label className="radio">
                      No,the item is safe for the next-day delivery
                      <input type="radio" name="collectnextday" />
                    </label>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="column is-offset-1">
            <div className="field">
              <label className="label">Product reference link (optional)</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="url"
                  placeholder="Enter the URL for reference"
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
                />
              </p>
            </div>

            <label className="label">Message</label>
            <div className="control mb-2">
              <textarea
                className="textarea has-fixed-size"
                name="message"
                placeholder="Please indicate colors, special handling, etc"
              ></textarea>
            </div>

            <div className="control">
              <strong>Do you require a receipt? </strong>
              <label className="radio px-2">
                <input type="radio" name="receipt" />
                Yes
              </label>
              <label className="radio px-2">
                <input type="radio" name="receipt" />
                No
              </label>
            </div>
          </div>
        </div>
        <div>
          <p className="control">
            <a className="button is-primary">Next</a>
          </p>
        </div>
      </div>
    );
  }
}

export default PostRequest;
