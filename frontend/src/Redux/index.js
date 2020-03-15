import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import history from './history';
import reducer from './rootReducer';
import rootSaga from './rootSaga';
import { createLogger } from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({ collapsed: true });

const enhancer = applyMiddleware(
  routerMiddleware(history),
  sagaMiddleware,
  logger,
);

const store = createStore(reducer, enhancer);
sagaMiddleware.run(rootSaga);

export default store;
