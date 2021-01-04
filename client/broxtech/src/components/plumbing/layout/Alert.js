import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

//Bulma
import Button from "react-bulma-components/lib/components/button";
import Notification from "react-bulma-components/lib/components/notification";
import Section from "react-bulma-components/lib/components/section";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Fragment>
      <Notification key={alert.id} color={alert.alertType}>
        {" "}
        {alert.msg}
        <Button remove />
      </Notification>
    </Fragment>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
