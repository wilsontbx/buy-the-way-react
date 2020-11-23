import React from "react";
import { Button, Form } from "react-bulma-components";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import { withCookies } from "react-cookie";
import backendService from "../../services/backendAPI";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

const { Field, Control, Label } = Form;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formErr: "",
    };
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
      .login(this.state.email, this.state.password)
      .then((response) => {
        if (!response.data.success) {
          this.setState({
            formErr: "The email address and password you entered don't match.",
          });
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
  }

  render() {
    return (
      <div className="columns is-mobile mt-2">
        <div className="column is-one-fifth is-offset-two-fifths has-text-centered">
          <h1 className="title mt-2">
            <strong>We’ve missed you!</strong>
          </h1>
          <form
            onSubmit={(e) => {
              this.handleFormSubmission(e);
            }}
          >
            <Label>Please enter username and password</Label>
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
            <Field>
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
                <Button type="submit" color="button is-primary is-fullwidth">
                  <strong>Login</strong>
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
