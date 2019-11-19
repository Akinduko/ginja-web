import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import requestMiddleware from '+utils/request-middleware';
import APIRequest from '+services/api-services';

import rootReducer from './reducers';

// Redux think allows you to implement async operations in your actions
// as actions are normally meant to be synchronous
const apiRequest = new APIRequest();
const middlewares = [thunkMiddleware, requestMiddleware(apiRequest)];

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

export function configureStore(preloadedState) {
  return createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));
}
export const store = configureStore();
