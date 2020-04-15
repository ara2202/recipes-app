import { call, put, takeEvery } from 'redux-saga/effects';
import produce from 'immer';
import { createSelector } from 'reselect';
import APIService from 'Services/api';

/*** Constants ***/
export const moduleName = 'productDisplayNames';
export const appName = 'Recipes';
const prefix = `${appName}/${moduleName}`;

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`;
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`;

/*** Reducer ***/
const initialState = [];
const reducer = produce((draft, { type, payload }) => {
  // eslint-disable-next-line default-case
  switch (type) {
    case FETCH_ALL_SUCCESS:
      return payload;
  }
}, initialState);
export default reducer;

/*** Selectors ***/
export const stateSelector = state => state[moduleName];
export const selectPdnById = (state, id) => id;
export const selectDisplayNameById = createSelector(
  [stateSelector, selectPdnById],
  (items, id) => items.find(item => item._id === id).displayName,
);

/*** Action Creators ***/
export const fetchAllProductDisplayNames = () => ({
  type: FETCH_ALL_REQUEST,
});

/*** Sagas ***/
export function* fetchAllSaga() {
  const data = yield call(APIService.getProductNames);

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: data,
  });
}

export function* saga() {
  yield takeEvery(FETCH_ALL_REQUEST, fetchAllSaga);
}
