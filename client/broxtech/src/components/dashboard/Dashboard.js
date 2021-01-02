import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  useEffect(() => {}, []);
  return (
    <Fragment>
      <h1>Test Component</h1>
      <p>Fed up? Why not Logout?</p>
      <Link to="/logout">
        <div className="action-item" data-tip="logout" data-type="success">
          Here
        </div>
      </Link>
    </Fragment>
  );
};

export default Dashboard;
