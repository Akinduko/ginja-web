/* eslint-disable import/prefer-default-export */
import { utilsConstants } from '../constants';
import APIRequest from '+services/api-services';
import APIServiceError from '+services/error-services';

const apiBaseUrl = process.env.REACT_APP_API_BASE || 'http://localhost:3000';
const apiRequest = new APIRequest(apiBaseUrl);

export function doSomething() {
  function request() {
    return { type: utilsConstants.DO_SOMETHING_REQUEST, noLoader: true };
  }
  function success(data) {
    return { type: utilsConstants.DO_SOMETHING_SUCCESS, data };
  }
  function failure(errors) {
    return { type: utilsConstants.DO_SOMETHING_FAILURE, errors };
  }

  return async dispatch => {
    try {
      dispatch(request());
      const response = await apiRequest.doSomething();
      dispatch(success(response.data));
    } catch (error) {
      if (error instanceof APIServiceError) {
        dispatch(failure(error));
        throw error.response.data;
      }
    }
  };
}
