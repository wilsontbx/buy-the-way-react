import React from "react";
import "./SiteHeader.scss";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSearch } from '@fortawesome/free-solid-svg-icons'

class NavBarHeader extends React.Component {
  render() {
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
            <Link to="/postrequest" className="navbar-item">POST-REQUEST</Link>

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
              <div className="buttons">
                <Link className="button is-primary">
                  <strong>Sign up</strong>
                </Link>
                <Link className="button is-light">Log in</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBarHeader;
