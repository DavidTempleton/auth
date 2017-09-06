//gets the type from actions to be used by reducers
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from '../actions/types';

//catches actions to update state if any types match, just passes state on.
/*...state is es2015 syntax for taking all the prev states making a copy and
then adding a the new state to the end of the copy to keep it immuable*/
export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true};
    case UNAUTH_USER:
      return { ...state, authenticated: false};
    case AUTH_ERROR:
      return {...state, error: action.payload};
    case FETCH_MESSAGE:
      return {...state, message: action.payload};
  }

  return state;
}
