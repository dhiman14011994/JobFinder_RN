import { call, put, all, takeLatest, takeEvery } from 'redux-saga/effects';

import { FETCH_PROMOTION_POST, UPDATE_PROMOTION_POST } from '../actions/promotionAction';
import { fetchPromotionService, updatePromotionPost } from '../services/promotionService';

function* fetchPromotion(payload) {
    try {
        const response = yield call(fetchPromotionService);

        if (response && response.code === 200) {
            yield put({
                type: FETCH_PROMOTION_POST.SUCCESS,
                payload: response,
            });
            payload.payload.onSuccess(response);
        } else {
            yield put({
                type: FETCH_PROMOTION_POST.FAILED,
                payload: response,
            });
            payload.payload.onError(response.message);
        }
    } catch {
        payload.payload.onError('error');
    }
}

function* updatePromotion(payload) {
    try {

        const response = yield call(
            updatePromotionPost,
            payload.payload
        );

        if (response && response.code === 200) {
            yield put({
                type: UPDATE_PROMOTION_POST.SUCCESS,
                payload: response,
            });
            payload.payload.onSuccess(response);
        } else {
            yield put({
                type: UPDATE_PROMOTION_POST.FAILED,
                payload: response,
            });
            payload.payload.onError(response.message);
        }
    } catch {
        payload.payload.onError('error');
    }
}

export default function* promotionSaga() {
    yield all([yield takeEvery(FETCH_PROMOTION_POST.REQUEST, fetchPromotion)]);
    yield all([yield takeEvery(UPDATE_PROMOTION_POST.REQUEST, updatePromotion)]);
}
