import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      console.log("setting alert", state, payload);
      return [...state, payload];
    case REMOVE_ALERT:
      console.log("remove alert", state, payload);
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
