import { call, put, takeEvery } from 'redux-saga/effects';
import produce from 'immer';
import APIService from 'Services/api';

/*** Constants ***/
export const moduleName = 'tagsCollection';
export const appName = 'Recipes';
const prefix = `${appName}/${moduleName}`;

export const FETCH_REQUEST = `${prefix}/FETCH_REQUEST`;
export const FETCH_SUCCESS = `${prefix}/FETCH_SUCCESS`;

/*** Reducer ***/
const initialState = [];

const reducer = produce((draft, { type, payload }) => {
  // eslint-disable-next-line default-case
  switch (type) {
    case FETCH_SUCCESS:
      return payload;
  }
}, initialState);
export default reducer;

/*** Selectors ***/
export const selectTagsCollection = state =>
  state.tagsCollection.tagsCollection;

/*** Action Creators ***/
export const fetchTagsCollection = () => ({
  type: FETCH_REQUEST,
});

/*** Sagas ***/
export function* fetchAllSaga() {
  const { data } = yield call(APIService.getTagsCollection);

  yield put({
    type: FETCH_SUCCESS,
    payload: data,
  });
}

export function* saga() {
  yield takeEvery(FETCH_REQUEST, fetchAllSaga);
}
