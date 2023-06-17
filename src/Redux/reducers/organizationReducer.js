import {RESET} from '../actions/authAction';
import commonKeys from '../constants/commonKeys';

const INITIAL_STATE = {
  butcherProductData: [],
};

const organizationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case commonKeys.BUTCHER_PRODUCT_DATA:
      return {
        ...state,
        butcherProductData: action.payload,
        isLoader: false,
      };
    case commonKeys.BUTCHER_PRODUCT_DATA_ERROR:
      return {
        ...state,
        butcherProductData: action.payload,
        isLoader: false,
      };
    case RESET.SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
export default organizationReducer;
