import { TRANSFER } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case TRANSFER:
      return action.payload;
    default:
      return state;
  }
};
