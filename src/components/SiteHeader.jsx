import React from "react";
import "./SiteHeader.scss";
import backendService from "../services/backendAPI";
import { Link, withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
class SiteHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      open: false,
      namelist: [],
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
    const username = this.state.username;
    const namelist = this.state.namelist;
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" id="logo">
            <img
              src="https://res.cloudinary.com/duc6i2tt0/image/upload/v1607177262/128878427_401576140894283_3860951528942828977_n_jnmrh2.png"
              alt=""
              width="100"
            />
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/postrequest" className="navbar-item">
              POST-REQUEST
            </Link>

            <Link to="/preorder" className="navbar-item">
              PRE-ORDER
            </Link>

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

          <div>
            <Autocomplete
              options={namelist.map((item) => item.productname)}
              freeSolo
              onChange={this.props.handleChangeAutoCom}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  variant="outlined"
                  size="small"
                  placeholder="Search"
                  // value={productname}
                  name="productname"
                  onChange={(e) => {
                    this.props.handleSearch(e);
                  }}
                />
              )}
            />
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
