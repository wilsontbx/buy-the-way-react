/* eslint-disable no-useless-escape */
import React from "react";
import { Columns, Form } from "react-bulma-components";
import { Link, withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import moment from "moment";
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
import "./Register.scss";

const { Field, Control } = Form;
const checkSpace = RegExp(/[_\- ]+$/);
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      formErr: "",
      errors: {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
      },
      showPassword: false,
    };
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case "firstname":
        errors.firstname =
          value.length <= 0 || checkSpace.test(value)
            ? "cannot empty or contain any space"
            : "";
        break;
      case "lastname":
        errors.lastname =
          value.length <= 0 || checkSpace.test(value)
            ? "cannot empty or contain any space"
            : "";
        break;
      case "username":
        errors.username =
          value.length <= 0 || checkSpace.test(value)
            ? "cannot empty or contain any space"
            : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length <= 0 || checkSpace.test(value)
            ? "cannot empty or contain any space"
            : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

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
    if (
      validateForm(this.state.errors) &&
      this.state.firstname &&
      this.state.lastname &&
      this.state.username &&
      this.state.email &&
      this.state.password
    ) {
      console.log("hehr");
      backendService
        .register(
          this.state.firstname,
          this.state.lastname,
          this.state.username,
          this.state.email,
          this.state.password
        )
        .then((response) => {
          if (!response.data.success) {
            this.setState({
              formErr: "This email address already exists",
            });
            return;
          }
          backendService
            .login(this.state.email, this.state.password)
            .then((response) => {
              if (!response.data.success) {
                this.setState({
                  formErr: "This email address already exists",
                });
                return;
              }
              this.props.cookies.set("token", response.data.token, {
                path: "/",
                expires: moment.unix(response.data.expiresAt).toDate(),
              });
              window.location.reload();
            })
            .catch((err) => {
              this.setState({
                formErr: "Error occurred in form, please check values",
              });
            });
        })
        .catch((err) => {
          this.setState({
            formErr: "Error occurred in form, please check values",
          });
        });
    } else {
      this.setState({
        formErr: "Error occurred in form, please check values",
      });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="columns is-mobile mt-2 has-text-centered">
        <div className="column is-one-third is-offset-one-third">
          <Typography variant="h4" gutterBottom>
            Welcome to BUY THE WAY
          </Typography>
          <form
            onSubmit={(e) => {
              this.handleFormSubmission(e);
            }}
          >
            <Typography variant="h7" gutterBottom>
              Please create an account
            </Typography>
            <Columns className="mb-0">
              <Columns.Column>
                <FormControl fullWidth>
                  <TextField
                    id="standard-basic"
                    type="text"
                    name="firstname"
                    label="First name"
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                    noValidate
                  />
                  {errors.firstname.length > 0 && (
                    <span className="error">{errors.firstname}</span>
                  )}
                </FormControl>
              </Columns.Column>
              <Columns.Column>
                <FormControl fullWidth>
                  <TextField
                    id="standard-basic"
                    type="text"
                    name="lastname"
                    label="Last name"
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                    noValidate
                  />
                  {errors.lastname.length > 0 && (
                    <span className="error">{errors.lastname}</span>
                  )}
                </FormControl>
              </Columns.Column>
            </Columns>
            <Field>
              <FormControl fullWidth>
                <TextField
                  id="standard-basic"
                  type="text"
                  name="username"
                  label="Username"
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                  noValidate
                />
                {errors.username.length > 0 && (
                  <span className="error">{errors.username}</span>
                )}
              </FormControl>
            </Field>
            <Field>
              <FormControl fullWidth>
                <TextField
                  id="standard-basic"
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="example@email.com"
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                  noValidate
                />
                {errors.email.length > 0 && (
                  <span className="error">{errors.email}</span>
                )}
              </FormControl>
            </Field>

            <FormControl fullWidth>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                placeholder="••••••••"
                name="password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={(e) => {
                  this.handleChange(e);
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
                noValidate
              />
              {errors.password.length > 0 && (
                <span className="error">{errors.password}</span>
              )}
            </FormControl>
            {this.state.formErr !== "" ? (
              <div className="error">
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
                  Create an account
                </Button>
              </Control>
            </Field>
          </form>
          <p>
            Already have an account?
            <Link to="/users/login"> Login</Link>
          </p>
        </div>
      </div>
    );
  }
}
export default withRouter(withCookies(Register));
