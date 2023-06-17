import {createStore, applyMiddleware} from 'redux';
import createSageMiddleware from 'redux-saga';
import reducer from './reducers';
import logger from 'redux-logger';
import rootSaga from './saga';
const sagaMiddleware = createSageMiddleware();
// Import the package

const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

export {store};
