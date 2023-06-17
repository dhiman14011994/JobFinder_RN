import { putActions } from '../actionWrapper';

const LOADING = putActions('LOADING');
const FETCH_PROMOTION_POST = putActions('FETCH_PROMOTION');
const UPDATE_PROMOTION_POST = putActions('UPDATE_PROMOTION_POST');

export {
    FETCH_PROMOTION_POST,
    UPDATE_PROMOTION_POST,
    LOADING,
};

export function setLoading(payload) {
    return { type: LOADING.REQUEST, payload: payload };
}

export function fetchPromotionPost(payload) {
    return { type: FETCH_PROMOTION_POST.REQUEST, payload: payload };
}

export function updatePromotion(payload) {
    return { type: UPDATE_PROMOTION_POST.REQUEST, payload: payload };
}
