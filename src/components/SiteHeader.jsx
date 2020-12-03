import React from "react";
import "./SiteHeader.scss";
import backendService from "../services/backendAPI";
// import { Button } from "react-bulma-components";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link, withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";

class SiteHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
    };
  }
  isAuthenticated() {
    const token = this.props.cookies.get("token");
    if (!token || token === "undefined" || token === "null") {
      return false;
    }
    return true;
  }
  logout(e) {
    e.preventDefault();
    this.props.cookies.remove("token");
    this.setState({
      username: null,
    });
  }
  componentDidMount() {
    const token = this.props.cookies.get("token");
    if (token || !token === "undefined" || token === "null") {
      backendService
        .getUserInfo(token)
        .then((response) => {
          this.setState({
            username: response.data.username,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    let username = this.state.username;
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="https://bulma.io" className="navbar-item">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
              alt=""
            />
          </Link>

          <Link
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/postrequest" className="navbar-item">
              POST-REQUEST
            </Link>

            <Link className="navbar-item">PRE-ORDER</Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <Link className="navbar-link">More Info</Link>
              <div className="navbar-dropdown">
                <Link className="navbar-item">Travel Bubble Information</Link>
                <Link className="navbar-item">What to do before you leave</Link>
                <Link className="navbar-item">
                  What to do when you get back
                </Link>
                <hr className="navbar-divider" />
                <Link className="navbar-item">Contact Us</Link>
              </div>
            </div>
          </div>
          <div className="field search has-addons">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="buy this for me"
              />
            </div>
            <div className="control">
              <Link className="button is-primary">Search</Link>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {this.isAuthenticated() ? (
                <div className="navbar-item has-dropdown is-hoverable">
                  <Link className="navbar-link">
                    <strong>{username != null ? username : ""}</strong>
                  </Link>
                  <div className="navbar-dropdown is-right">
                    <Link className="navbar-item">Dashboard</Link>
                    <hr className="navbar-divider" />
                    <Link
                      to="/"
                      onClick={(e) => {
                        this.logout(e);
                      }}
                      className="navbar-item"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="buttons">
                  <Link to="/users/register" className="button is-primary">
                    <strong>Sign up</strong>
                  </Link>
                  <Link to="/users/login" className="button is-light">
                    Log in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withCookies(withRouter(SiteHeader));
