import { FETCH_PATHS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PATHS:
      return action.payload;
    default:
      return state;
  }
};
