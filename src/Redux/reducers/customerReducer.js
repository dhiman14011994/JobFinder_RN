import {LOADING, RESET} from '../actions/authAction';

const initialState = {
  isLoading: false,
  getButchersData: null,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING.SUCCESS:
      return {...state, isLoading: action.payload};
    case RESET.SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default customerReducer;
