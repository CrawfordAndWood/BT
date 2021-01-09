import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Login = ({ logout, isAuthenticated }) => {
  const onSubmit = async (e) => {
    e.preventDefault();
    logout();
  };

  //Redirect if logged in
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
      <h2>Sign Out</h2>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <input type="submit" className="btn btn-primary" value="Sign Out" />
      </form>
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

export default connect(mapStateToProps, { logout })(Login);
