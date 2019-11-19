import { combineReducers } from 'redux';
import loader from './loader';
import { utils } from './utils';

const rootReducer = combineReducers({
  loader,
  utils
});

export default rootReducer;
