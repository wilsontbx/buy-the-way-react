import React from "react";
import { Link } from 'react-router-dom'
import "./PostRequest.scss";

class PostRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      showfood: false,
      showcollectible: false,
      productname: null,
      imageurl: null,
      country: null,
      foodexpiry: null,
      foodchilled: null,
      foodspecial: null,
      collectspecial: null,
      collectnextday: null,
      url: null,
      qty: null,
      price: null,
      message: null,
      receipt: null


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
  handleInputChange(e) {
    const state = {}
    state[e.target.name] = e.target.value
    this.setState(state)
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
                  onChange={e => { this.handleInputChange(e) }}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Photo</label>
              <div className="file is-boxed">
                <label className="file-label">
                  <input className="file-input" type="file" name="imageurl"
                    onChange={e => { this.handleInputChange(e) }} />
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
                  <select name="country" onChange={e => { this.handleInputChange(e) }}>
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
                    <input type="checkbox" name="foodexpiry" onChange={e => { this.handleInputChange(e) }} />
                      Does it have an  expiry of 3-5 days?
                  </div>

                  <div className="control">
                    <label className="checkbox">
                      <input type="checkbox" name="foodchilled" onChange={e => { this.handleInputChange(e) }} />
                          Does it need to be chilled?
                    </label>
                  </div>

                  <label className="checkbox">
                    <input type="checkbox" name="foodspecial" onChange={e => { this.handleInputChange(e) }} />
                          Do you require special handling?
                  </label>
                </div>
              </div>
            ) : null}


            {this.state.showcollectible ? (
              <div id="collectible">
                <label className="label">Is this item fragile?</label>
                <div className="field">
                  <div className="control">
                    <label className="checkbox">
                      <input type="checkbox" name="collectspecial" onChange={e => { this.handleInputChange(e) }} />
                      Yes, it requires special handling
                    </label>

                    <label className="checkbox">
                      <input type="checkbox" name="collectnextday" onChange={e => { this.handleInputChange(e) }} />
                      No, the item is safe for the next-day delivery
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
                  onChange={e => { this.handleInputChange(e) }}
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
                  onChange={e => { this.handleInputChange(e) }}
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
                  onChange={e => { this.handleInputChange(e) }}
                />
              </p>
            </div>

            <label className="label">Message</label>
            <div className="control mb-2">
              <textarea
                className="textarea has-fixed-size"
                name="message"
                placeholder="Please indicate colors, special handling, etc"
                onChange={e => { this.handleInputChange(e) }}
              ></textarea>
            </div>

            <div className="control">
              <strong>Do you require a receipt? </strong>

              <label className="radio px-2">
                <input type="radio" name="receipt" onChange={e => { this.handleInputChange(e) }} />
                Yes
              </label>
              <label className="radio px-2">
                <input type="radio" name="receipt" onChange={e => { this.handleInputChange(e) }} />

                No
              </label>
            </div>
          </div>
        </div >

        <div>
          <p className="control">
            <Link to={{

              pathname: "/PostConfirmation",
              state: {
                productname: this.state.productname,
                imageurl: this.state.imageurl,
                category: this.state.category,
                country: this.state.country,
                foodexpiry: this.state.foodexpiry,
                foodchilled: this.state.foodchilled,
                foodspecial: this.state.foodspecial,
                collectspecial: this.state.collectspecial,
                collectnextday: this.state.collectnextday,
                url: this.state.url,
                qty: this.state.qty,
                price: this.state.price,
                message: this.state.message,
                receipt: this.state.receipt

              }
            }}
              className="button is-primary">Next</Link>
          </p>
        </div>

      </div >
    );
  }
}

export default PostRequest;
