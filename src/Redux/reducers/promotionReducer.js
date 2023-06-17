import { RESET } from '../actions/authAction';
import { FETCH_PROMOTION_POST, LOADING, UPDATE_PROMOTION_POST } from '../actions/promotionAction';

const initialState = {
    isLoading: false,
    promotions: [],
    promotion: null,
};

const promotionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING.SUCCESS:
            return {
                ...state,
                isLoading: action.payload,
            };
        case FETCH_PROMOTION_POST.SUCCESS:
            return {
                ...state,
                promotions: action.payload.data,
            };
        case UPDATE_PROMOTION_POST.SUCCESS:
            return {
                ...state,
                promotion: action.payload.data,
            };
        case RESET.SUCCESS:
            return initialState;

        default:
            return state;
    }
};

export default promotionReducer;
