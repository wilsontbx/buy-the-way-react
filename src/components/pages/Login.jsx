import React from "react";
import { Form } from "react-bulma-components";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import { withCookies } from "react-cookie";
import backendService from "../../services/backendAPI";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const { Field, Control, Label } = Form;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formErr: "",
      showPassword: false,
    };
  }
  // handleEmailChange(e) {
  //   this.setState({
  //     email: e.target.value,
  //   });
  // }

  // handlePasswrdChange(e) {
  //   this.setState({
  //     password: e.target.value,
  //   });
  // }

  setCurrentState(e) {
    const state = {};
    this.setState({ ...state, [e.target.name]: e.target.value });
  }

  handleClickShowPassword(e) {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  }

  handleMouseDownPassword(e) {
    e.preventDefault();
  }

  handleFormSubmission(e) {
    e.preventDefault();
    backendService
      .login(this.state.email, this.state.password)
      .then((response) => {
        if (!response.data.success) {
          this.setState({
            formErr: "The email address and password you entered don't match.",
          });
          return;
        }
        this.props.cookies.set("token", response.data.token, {
          path: "/",
          expires: moment.unix(response.data.expiresAt).toDate(),
        });
        window.location.reload();
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          formErr: "Error occurred in form, please check values",
        });
      });
  }

  render() {
    return (
      <div className="columns is-mobile mt-2">
        <div className="column is-one-fifth is-offset-two-fifths has-text-centered">
          <Typography variant="h4" gutterBottom>
            We’ve missed you!
          </Typography>
          <form
            onSubmit={(e) => {
              this.handleFormSubmission(e);
            }}
          >
            <Typography variant="h7" gutterBottom>
              Please enter username and password
            </Typography>

            <Field>
              <FormControl fullWidth>
                <TextField
                  id="standard-basic"
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="example@email.com"
                  onChange={(e) => {
                    this.setCurrentState(e);
                  }}
                />
              </FormControl>
            </Field>

            <FormControl fullWidth>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                placeholder="••••••••"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                name="password"
                onChange={(e) => {
                  this.setCurrentState(e);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={(e) => {
                        this.handleClickShowPassword(e);
                      }}
                      onMouseDown={(e) => {
                        this.handleMouseDownPassword(e);
                      }}
                    >
                      {this.state.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {this.state.formErr !== "" ? (
              <div className="form-group">
                <p>{this.state.formErr}</p>
              </div>
            ) : (
              ""
            )}
            <Field className="mt-5">
              <Control>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </Control>
            </Field>
          </form>
          <p>
            Don't have an account yet?
            <Link to="/users/register"> Register</Link>
          </p>
        </div>
      </div>
    );
  }
}
export default withRouter(withCookies(Login));
