import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const Dashboard = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <Fragment>
      <h1>Test Component</h1>
      <p>You are now logged in. Here's your latest results.</p>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Dashboard);
