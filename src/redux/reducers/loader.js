const initialState = { requests: [] };

/**
 * @param {Object} state - the state of the loader reducer in the store
 * @param {string[]} state.requests - All pending requests in the store
 * @param {Object} action - the payload action
 * @param {string} action.type - the type of the action
 */
export default function loader(state = initialState, action) {
  if (typeof action.type !== 'string') {
    return state;
  }
  if (action.noLoader) {
    return state;
  }
  const actionType = action.type.substring(0, action.type.length - 8) || '';

  if (action.type.endsWith('/REQUEST')) {
    return {
      ...state,
      requests: [...state.requests, actionType]
    };
  }
  if (action.type.endsWith('/SUCCESS') || action.type.endsWith('/FAILURE')) {
    const firstIndex = state.requests.indexOf(actionType);
    return {
      ...state,
      requests: [...state.requests.filter((_request, index) => index !== firstIndex)]
    };
  }
  return state;
}
