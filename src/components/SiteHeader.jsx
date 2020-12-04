import React from "react";
import "./SiteHeader.scss";
import backendService from "../services/backendAPI";
import { Link, withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import { Modal } from "react-bulma-components";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

class SiteHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      open: false,
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
          if (!response.data.success) {
            this.setState({
              formErr:
                "The email address and password you entered don't match.",
            });
            this.logout();
            return;
          }
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
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Slide in alert dialog
            </Button>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {"Use Google's location service?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Disagree
                </Button>
                <Button onClick={handleClose} color="primary">
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div>
            <button onClick={() => this.setState({ open: true })}>Open</button>
            <Modal
              show={this.state.open}
              onClose={() => this.setState({ open: false })}
            >
              <div class="modal-background"></div>
              <div class="modal-content-width">Some error occur.</div>
            </Modal>
          </div>

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
