import { utilsConstants } from '../constants';

// Set the initial state of the merchants wallet
export const INITIAL_STATE = {
  data: [],
  errors: {}
};

export function utils(state = INITIAL_STATE, action) {
  switch (action.type) {
    case utilsConstants.DO_SOMETHING_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: {}
      };
    case utilsConstants.DO_SOMETHING_FAILURE:
      return {
        ...INITIAL_STATE,
        isLoading: false,
        errors: action.errors.response.data
      };
    case utilsConstants.DO_SOMETHING_SUCCESS:
      return {
        ...state,
        banks: action.data,
        isLoading: false,
        errors: {}
      };
    default:
      return state;
  }
}
