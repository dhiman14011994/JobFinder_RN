import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import homeSaga from './homeSage';
import jobAndEventSaga from './jobAndEventSaga';
import profileSaga from './profileSaga';
import promotionSaga from './promotionSaga';

export default function* rootSaga() {
  yield all([authSaga(), homeSaga(), jobAndEventSaga(), profileSaga(), promotionSaga()]);
}
