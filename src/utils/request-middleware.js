import APIRequest from '+services/api-services';
import { authConstants } from '+redux/constants';

const apiRequest = new APIRequest();
const authAPIBaseURL = process.env.REACT_APP_AUTH_API_BASE || 'http://localhost:3000/api';

const authApiRequest = new APIRequest(authAPIBaseURL);

export default function requestMiddleware() {
  return ({ dispatch, getState }) => next => async action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    if (typeof action === 'object' && typeof action.type === 'string') {
      if (action.type.startsWith('@auth')) {
        next(action);
        return { apiRequest };
      }
    } else {
      return next(action);
    }

    // if not a request, end here
    if (!action.type.endsWith('REQUEST')) return next(action);

    next(action); // Start the loader

    const { userTokenExpiration, refreshToken } = getState().account;

    // check  2 minutes  expiry
    const refreshThreshold = Math.floor((new Date().getTime() + 120000) / 1000);

    if (refreshToken && userTokenExpiration < refreshThreshold) {
      try {
        const refreshResponse = await authApiRequest.refresh(refreshToken, apiRequest);

        dispatch({ type: authConstants.REFRESH_TOKEN, token: refreshResponse });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // if refresh token has expired, dispatch LOGOUT
          dispatch({ type: authConstants.LOGOUT });
          throw error;
        }
      }
    }
    return { apiRequest };
  };
}
