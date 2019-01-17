import { FETCH_FAVS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_FAVS:
      return action.payload;
    default:
      return state;
  }
};
