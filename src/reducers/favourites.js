import { ADD_FAV } from '../actions/types';

const initialState = {
  favourites: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAV:
      return { ...state, favourites: state.favourites.concat(action.payload) };
    default:
      return state;
  }
};
