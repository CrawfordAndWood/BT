import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

import {
  Field,
  Control,
  Label,
  Input,
} from "react-bulma-components/lib/components/form";
import { Button, Container, Columns, Section } from "react-bulma-components";
import "react-bulma-components/dist/react-bulma-components.min.css";

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Section>
        <Container>
          <Columns>
            <Columns.Column size="one-fifth"></Columns.Column>
            <Columns.Column>
              {" "}
              <form className="form" onSubmit={(e) => onSubmit(e)}>
                <Field>
                  <Label>Name</Label>
                  <Control>
                    <Input
                      onChange={(e) => onChange(e)}
                      name="name"
                      type="name"
                      placeholder="Name"
                      value={name}
                      required
                    />
                  </Control>
                </Field>
                <Field>
                  <Label>Email</Label>
                  <Control>
                    <Input
                      onChange={(e) => onChange(e)}
                      name="email"
                      type="email"
                      placeholder="Email input"
                      value={email}
                      required
                    />
                  </Control>
                </Field>
                <Field>
                  <Label>Password</Label>
                  <Control>
                    <Input
                      onChange={(e) => onChange(e)}
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      required
                    />
                  </Control>
                </Field>
                <Field>
                  <Label>Password</Label>
                  <Control>
                    <Input
                      onChange={(e) => onChange(e)}
                      name="password2"
                      type="password"
                      placeholder="Password2"
                      value={password2}
                      required
                    />
                  </Control>
                </Field>
                <Button.Group>
                  <Button rounded color="primary">
                    Register
                  </Button>
                </Button.Group>{" "}
              </form>
            </Columns.Column>
            <Columns.Column size="one-fifth"></Columns.Column>
          </Columns>
        </Container>
      </Section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
