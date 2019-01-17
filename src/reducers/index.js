import { combineReducers } from 'redux';

import data from './dataReducer';
import transfered from './transfered';

export default combineReducers({
  data,
  transfered,
});
