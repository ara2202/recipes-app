import {call, put, takeEvery} from 'redux-saga/effects';
import APIService from '../../Services/api';
import produce from 'immer';

/*** Constants ***/
export const moduleName = 'tags';
export const appName = 'Recipes';
const prefix = `${appName}/${moduleName}`;

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`;
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`;

/*** Reducer ***/
const initialState = [];
const reducer = produce((draft, {type, payload}) => {
    // eslint-disable-next-line default-case
    switch (type) {
        case FETCH_ALL_SUCCESS:
            return payload;
    }
}, initialState);
export default reducer;

/*** Selectors ***/
export const selectTags = (state) => state.tags;

/*** Action Creators ***/
export const fetchAllTags = () => ({
  type: FETCH_ALL_REQUEST
});

/*** Sagas ***/
export function* fetchAllSaga() {
  const data = yield call(APIService.getTags);

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: data
  });
}

export function* saga() {
  yield takeEvery(FETCH_ALL_REQUEST, fetchAllSaga);
}