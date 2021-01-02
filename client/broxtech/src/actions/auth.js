import axios from "axios";
//import { setAlert } from "./alert";
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

export const login = () => async (dispatch) => {
  try {
    console.log("logging in");
    dispatch({ type: LOGIN_SUCCESS });
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
