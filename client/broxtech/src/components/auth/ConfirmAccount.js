import React, { Fragment, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { confirmNewAccount } from "../../actions/auth";
import Spinner from "../plumbing/layout/Spinner";

//Bulma
import {
  Field,
  Control,
  Label,
  Input,
} from "react-bulma-components/lib/components/form";
import { Button, Container, Columns, Section } from "react-bulma-components";
import "react-bulma-components/dist/react-bulma-components.min.css";

const ConfirmAccount = ({ confirmNewAccount, isAuthenticated }) => {
  useEffect(() => {
    confirmNewAccount(window.location.href);
  }, []);

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
            <Columns.Column></Columns.Column>
            <p>Please wait as your details are confirmed</p>
            <Spinner />
            <Columns.Column size="one-fifth"></Columns.Column>
          </Columns>
        </Container>
      </Section>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { confirmNewAccount })(ConfirmAccount);
