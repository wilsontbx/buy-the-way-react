import React from "react";
import { Button, Columns, Form } from "react-bulma-components";
import { Link, withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

const { Field, Control, Label } = Form;

class Register extends React.Component {
  render() {
    return (
      <div class="columns is-mobile mt-2 has-text-centered">
        <div class="column is-one-third is-offset-one-third">
          <h2 className="title mt-2 ">
            <strong>Welcome to BUY THE WAY</strong>
          </h2>
          <Label>Please create an account</Label>
          <Columns className="mb-0">
            <Columns.Column>
              <FormControl fullWidth>
                <TextField id="standard-basic" type="text" label="First name" />
              </FormControl>
            </Columns.Column>
            <Columns.Column>
              <FormControl fullWidth>
                <TextField id="standard-basic" type="text" label="Last name" />
              </FormControl>
            </Columns.Column>
          </Columns>
          <Field>
            <FormControl fullWidth>
              <TextField id="standard-basic" type="text" label="Username" />
            </FormControl>
          </Field>
          <Field className="mt-3">
            <FormControl fullWidth>
              <TextField
                id="standard-basic"
                type="password"
                label="Password"
                placeholder="••••••••"
              />
            </FormControl>
          </Field>

          <Field className="mt-5">
            <Control>
              <Button color="button is-primary is-fullwidth">
                <strong>Create an account</strong>
              </Button>
            </Control>
          </Field>
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
