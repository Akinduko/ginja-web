import axios from 'axios';
import { history, Logger } from '+utils';
import { Storage } from '+services/storage-services';
import APIServiceError from './error-services';

const APIBaseURL = process.env.REACT_APP_API_BASE || 'http://localhost:3000/api';
export const clientId = process.env.REACT_APP_CLIENT_ID || 1;
export const clientSecret = process.env.REACT_APP_CLIENT_SECRET || '';

export default class APIRequest {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL: baseURL || APIBaseURL,
      timeout: 10000,
      headers: {
        Accept: 'application/json'
      }
    });

    this.instance.interceptors.request.use(
      config => {
        const userToken = this.setAuthorization();
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = userToken;
        // Logger.info('Request: ', config.url);
        return config;
      },
      error => {
        // Logger.error('Request Error: ', error);
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      response => {
        Logger.info('Response: ', response.config.method, response.config.url, response.status);
        return response;
      },
      error => {
        if (!error.response) {
          Logger.error('Response: ', 'Network Error');
          return Promise.reject(
            new APIServiceError({
              status: 500,
              data: {
                message: 'Network Error, try again',
                error: 'server_error',
                data: null
              }
            })
          );
        }
        // If unauthorized, Log user out
        if (error.response.status === 401) {
          this.logout();
        }
        Logger.warn('Response: ', error.response);
        return Promise.reject(new APIServiceError(error.response));
      }
    );
  }

  // ******************************** //
  // AUTH APIS
  // ******************************** //

  setAuthorization = () => {
    const userToken = Storage.getItem('userToken');
    // Check if user if authenticated if not return client token
    if (userToken) {
      return `Bearer ${userToken}`;
    }
    const clientToken = Storage.getItem('clientToken');
    return `Bearer ${clientToken}`;
  };

  checkAuthToken = () => {
    const token = Storage.checkAuthentication();
    this.setHeader(token);
  };

  setHeader = token => {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  clearHeader() {
    delete this.instance.defaults.headers.common.Authorization;
  }

  logout = () => {
    Storage.removeItem('userToken');
    Storage.removeItem('refreshToken');
    Storage.removeItem('userID');
    Storage.removeItem('userTokenExpiration');

    const clientToken = localStorage.getItem('clientToken');
    this.setHeader(clientToken);

    history.push('/');
  };

  setToken = token => {
    this.setHeader(token);
  };

  storeUserToken = (token, refreshToken, userTokenExpiration, userID, merchantID) => {
    Storage.setItem('userToken', token);
    Storage.setItem('refreshToken', refreshToken);
    Storage.setItem('userTokenExpiration', userTokenExpiration);
    Storage.setItem('userID', userID);
    Storage.setItem('merchantID', merchantID);
  };

  storeClientToken = token => {
    Storage.setItem('clientToken', token);
  };
}
