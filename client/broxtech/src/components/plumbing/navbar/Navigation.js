//React, Redux, Routing
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

//Bulma
import { Heading } from "react-bulma-components";
import Navbar from "react-bulma-components/lib/components/navbar";
import "react-bulma-components/dist/react-bulma-components.min.css";

//Brox Components
import BroxLogo from "./BroxLogo";

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

const Navigation = () => {
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
          <Navbar.Burger />
        </Navbar.Brand>
        <Navbar.Menu>
          {/* <Navbar.Container>
            <Navbar.Item dropdown hoverable href="#">
              <Navbar.Link>First</Navbar.Link>
              <Navbar.Dropdown>
                <Navbar.Item href="#">Subitem 1</Navbar.Item>
                <Navbar.Item href="#">Subitem 2</Navbar.Item>
              </Navbar.Dropdown>
            </Navbar.Item>
            <Navbar.Item href="#">Second</Navbar.Item>
          </Navbar.Container> */}
          <Navbar.Container position="end">
            <Link to="/login">
              <Navbar.Item>Sign In</Navbar.Item>
            </Link>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    </Fragment>
  );
};

export default Navigation;
