import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import {
  Field,
  Control,
  Label,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Help,
  InputFile,
} from "react-bulma-components/lib/components/form";
import {
  Heading,
  Button,
  Container,
  Columns,
  Section,
} from "react-bulma-components";
import "react-bulma-components/dist/react-bulma-components.min.css";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, name, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  //Redirect if logged in
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
                <Button.Group>
                  <Button rounded color="primary">
                    Login
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
