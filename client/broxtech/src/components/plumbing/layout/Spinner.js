import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default () => {
  return (
    <Fragment>
      <FontAwesomeIcon className="loader" icon={faSpinner} size="lg" spin />
    </Fragment>
  );
};
