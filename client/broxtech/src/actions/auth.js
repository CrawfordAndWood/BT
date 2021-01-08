import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

const prefix = "http://127.0.0.1:5000";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const confirmNewAccount = (token) => async (dispatch) => {
  console.log("conf");
  try {
    const res = await axios.get(`${prefix}/api/confirm/${token}`);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
//Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  console.log("local", localStorage);
  try {
    const res = await axios.get(`${prefix}/api/auth`);
    console.log("user loading", res.data);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const register = ({ name, email, postcode, password }) => async (
  dispatch
) => {
  const body = JSON.stringify({ name, email, postcode, password });

  try {
    const res = await axios.post(`${prefix}/api/auth/register`, body, config);
    // dispatch({
    //   type: REGISTER_SUCCESS,
    //   payload: res.data,
    // });
    dispatch(
      setAlert(
        "Account Created, a confirmation email has been sent. Please follow the link inside to confirm your account",
        "success"
      )
    );
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post(`${prefix}/api/auth`, credentials, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout

export const logout = (history, activeUserId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
  try {
    const body = JSON.stringify({ activeUserId });

    axios.post(`/api/auth/logout`, body, config);
  } catch (error) {
    console.log(error);
  }
  history.push("/login");
};
