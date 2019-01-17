import { combineReducers } from 'redux';

import data from './dataReducer';
import transfered from './transfered';
import favourites from './favsReducer';

export default combineReducers({
  data,
  transfered,
  favourites,
});
