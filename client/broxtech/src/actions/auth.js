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

const details = {
  email: "test@test.com",
  password: "pass",
};

export const login = (form) => async (dispatch) => {
  try {
    let result =
      Object.entries(details).toString() === Object.entries(form).toString();

    if (result) {
      dispatch({ type: LOGIN_SUCCESS });
    } else {
      dispatch(
        setAlert("Sorry, the credentials provided are invalid", "danger")
      );
      dispatch({ type: LOGIN_FAIL });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const logout = () => async (dispatch) => {
  try {
    console.log("logging out");
    dispatch({ type: LOGOUT });
  } catch (err) {
    console.log(err.message);
  }
};

export const register = () => async (dispatch) => {
  try {
    console.log("registering");
  } catch (err) {
    console.log(err.message);
  }
};
