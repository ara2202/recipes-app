import {all} from 'redux-saga/effects';
import {saga as tagSaga} from './ducks/tags';
import {saga as productSaga} from './ducks/productDisplayNames';
import {saga as recipeSaga} from './ducks/recipes';

export default function* rootSaga() {
    yield all([tagSaga(), productSaga(), recipeSaga()]);
}