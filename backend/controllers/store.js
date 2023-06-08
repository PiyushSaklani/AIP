import { createStore } from 'redux';

// Define the initial state of the store
const initialState = {
  data: null,
};

// Define the reducer function
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

// Create the Redux store
const store = createStore(reducer);

export default store;
