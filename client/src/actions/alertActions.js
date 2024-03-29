import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './actionTypes';

export const setAlert =
  (msg, alertType, alertTime = 5000) =>
  dispatch => {
    const id = uuid();
    dispatch({ type: SET_ALERT, payload: { msg, alertType, id } });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), alertTime);
  };
