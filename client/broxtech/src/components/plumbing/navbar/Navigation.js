//React, Redux, Routing
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
//Bulma
import { Heading } from "react-bulma-components";
import Icon from "react-bulma-components/lib/components/icon";
import Navbar from "react-bulma-components/lib/components/navbar";
import "react-bulma-components/dist/react-bulma-components.min.css";

//Brox Components
import BroxLogo from "./BroxLogo";

//actions
import { logout } from "../../../actions/auth";

const colors = {
  Default: "",
  primary: "primary",
  info: "info",
  danger: "danger",
  warning: "warning",
  success: "success",
  white: "white",
  black: "black",
  light: "light",
  dark: "dark",
  link: "link",
};

const Navigation = ({ logout, isAuthenticated }) => {
  //I'm passing state into here, if they're logged in then show logout
  //if they're not logged in show login or register
  useEffect(() => {}, []);
  return (
    <Fragment>
      <Navbar>
        <Navbar.Brand>
          <Link to="/">
            <Navbar.Item renderAs="a">
              <Heading>
                {" "}
                <BroxLogo />
              </Heading>
            </Navbar.Item>
          </Link>
          {/* <Navbar.Burger /> */}
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Container position="end">
            {isAuthenticated ? (
              <Fragment>
                <Navbar.Item dropdown hoverable>
                  <Navbar.Link>
                    {" "}
                    <Icon>
                      <FontAwesomeIcon icon={faUser} />
                    </Icon>
                  </Navbar.Link>
                  <Navbar.Dropdown>
                    <Navbar.Item onClick={() => logout()}>Logout</Navbar.Item>
                  </Navbar.Dropdown>
                </Navbar.Item>
              </Fragment>
            ) : (
              <Fragment>
                {" "}
                <Link to="/login">
                  <Navbar.Item>Sign In</Navbar.Item>
                </Link>
                <Link to="/register">
                  <Navbar.Item>Register</Navbar.Item>
                </Link>
              </Fragment>
            )}
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navigation);
