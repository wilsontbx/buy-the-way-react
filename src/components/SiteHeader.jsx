import React from "react";
import "./SiteHeader.scss";
import backendService from "../services/backendAPI";
import { Link, withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
class SiteHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      open: false,
      searchlist: [],
      searchquery: "",
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

  handleAutoCom(event, value) {
    event.preventDefault();
    let searchResult = value?.productslug || "";
    this.props.history.push(`/products/${searchResult}`);
    this.setState({
      searchlist: [],
      searchquery: "",
    });
  }
  aftersearch(e) {
    this.setState({
      searchquery: "",
      searchlist: [],
    });
  }
  handleSearch(e) {
    const value = e.target.value;
    backendService.search(value).then((response) => {
      if (!response.data.success) {
        return;
      }
      let searchResult = [];
      if (value !== "" && value !== " ") {
        searchResult = response.data.result;
      }
      console.log(searchResult);

      this.setState({
        searchquery: value,
        searchlist: searchResult,
      });
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
          this.logout();
          console.log(err);
        });
    }
  }

  render() {
    const username = this.state.username;
    const searchlist = this.state.searchlist;
    const searchquery = this.state.searchquery;
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
                <a
                  href="https://www.cathaypacific.com/cx/en_SG/travel-bubble/hong-kong-singapore/overview.html"
                  target="_blank"
                  rel="noreferrer"
                  className="navbar-item"
                >
                  Travel Bubble Information
                </a>
                {/* <Link className="navbar-item">What to do before you leave</Link>
                <Link className="navbar-item">
                  What to do when you get back
                </Link>
                <hr className="navbar-divider" />
                <Link className="navbar-item">Contact Us</Link> */}
              </div>
            </div>
          </div>

          <div>
            <Autocomplete
              style={{ width: 300 }}
              options={searchlist}
              getOptionLabel={(option) => option.productname}
              freeSolo
              onChange={(e, v) => {
                this.handleAutoCom(e, v);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  variant="outlined"
                  size="small"
                  placeholder="Search..."
                  value={searchquery}
                  name="searchquery"
                  onChange={(e) => {
                    this.handleSearch(e);
                  }}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              renderOption={(option, { inputValue }) => {
                const matches = match(option.productname, inputValue);
                const parts = parse(option.productname, matches);

                return (
                  <Link
                    to={`/${option.productslug}`}
                    onClick={(e) => this.aftersearch(e)}
                  >
                    <div>
                      <img
                        src={`${option.imageUrl}`}
                        alt={""}
                        height={50}
                        width={50}
                      />
                      {parts.map((part, index) => (
                        <span
                          key={index}
                          style={{ fontWeight: part.highlight ? 900 : 100 }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              }}
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
                    <Link to="/users/dashboard"className="navbar-item">Dashboard</Link>
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
                  <Link to="/users/login">
                    <Button variant="contained">Log In</Button>
                  </Link>
                  <Link to="/users/register">
                    <Button variant="contained" color="primary">
                      Sign up
                    </Button>
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
