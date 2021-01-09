import React, { Fragment } from "react";
import { connect } from "react-redux";

const NotFound = () => {
  return (
    <Fragment>
      <h2>Sorry, Not found</h2>
    </Fragment>
  );
};

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// });

export default NotFound;
