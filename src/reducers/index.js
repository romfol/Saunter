import { combineReducers } from 'redux';

import data from './dataReducer';
import transfered from './transfered';
import favourites from './favourites';

export default combineReducers({
  data,
  transfered,
  favourites,
});
