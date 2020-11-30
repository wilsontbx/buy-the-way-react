import React from "react";
import { Button, Columns, Form } from "react-bulma-components";
import { Link, withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import moment from "moment";
import backendService from "../../services/backendAPI";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

const { Field, Control, Label } = Form;

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
    };
  }

  handleFirstnameChange(e) {
    this.setState({
      firstname: e.target.value,
    });
  }

  handleLastnameChange(e) {
    this.setState({
      lastname: e.target.value,
    });
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePasswrdChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleFormSubmission(e) {
    e.preventDefault();
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
            this.props.history.push("/");
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
  }
  render() {
    return (
      <div className="columns is-mobile mt-2 has-text-centered">
        <div className="column is-one-third is-offset-one-third">
          <h1 className="title mt-2 ">
            <strong>Welcome to BUY THE WAY</strong>
          </h1>
          <form
            onSubmit={(e) => {
              this.handleFormSubmission(e);
            }}
          >
            <Label>Please create an account</Label>
            <Columns className="mb-0">
              <Columns.Column>
                <FormControl fullWidth>
                  <TextField
                    id="standard-basic"
                    type="text"
                    label="First name"
                    onChange={(e) => {
                      this.handleFirstnameChange(e);
                    }}
                  />
                </FormControl>
              </Columns.Column>
              <Columns.Column>
                <FormControl fullWidth>
                  <TextField
                    id="standard-basic"
                    type="text"
                    label="Last name"
                    onChange={(e) => {
                      this.handleLastnameChange(e);
                    }}
                  />
                </FormControl>
              </Columns.Column>
            </Columns>
            <Field>
              <FormControl fullWidth>
                <TextField
                  id="standard-basic"
                  type="text"
                  label="Username"
                  onChange={(e) => {
                    this.handleUsernameChange(e);
                  }}
                />
              </FormControl>
            </Field>
            <Field>
              <FormControl fullWidth>
                <TextField
                  id="standard-basic"
                  type="email"
                  label="Email"
                  placeholder="example@email.com"
                  onChange={(e) => {
                    this.handleEmailChange(e);
                  }}
                />
              </FormControl>
            </Field>
            <Field className="mt-3">
              <FormControl fullWidth>
                <TextField
                  id="standard-basic"
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  onChange={(e) => {
                    this.handlePasswrdChange(e);
                  }}
                />
              </FormControl>
            </Field>
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
                  className="button is-primary is-fullwidth"
                >
                  <strong>Create an account</strong>
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
