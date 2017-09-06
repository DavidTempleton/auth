//axios makes ajax calls for us.
import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';
//base URL for calls to API server
const ROOT_URL = 'http://localhost:3090';

//funtionally dispatched action by using thunk to make async calls to API
export function signinUser({email, password}) {
  return function(dispatch) {
    //submit emai/password to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        //if request is good...
        // - update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        //if request is bad...
        // - show an error to the user
        dispatch(authError('Bad username or password'))
      });
  }
}
//funtionally dispatched action by using thunk to make async calls
export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
    .then(response => {
      //if request is good...
      // - update state to indicate user is authenticated
      dispatch({ type: AUTH_USER });
      // - save the JWT token
      localStorage.setItem('token', response.data.token);
      // - redirect to route '/feature'
      browserHistory.push('/feature');
    })
    //if request is bad...
    // - show an error to the user
    .catch(error => {
      dispatch(authError(error.response.data.error));
    });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
//removes auth token from local storage then changes user auth type
export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}
