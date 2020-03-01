import {all, call, put, takeEvery, debounce} from 'redux-saga/effects';
import APIService from '../../Services/api';
import produce from 'immer';
import {createSelector} from 'reselect';

/*** Constants ***/
export const moduleName = 'recipes';
export const appName = 'Recipes';
const prefix = `${appName}/${moduleName}`;

export const FETCH_REQUEST = `${prefix}/FETCH_REQUEST`;
export const FETCH_MORE_REQUEST = `${prefix}/FETCH_MORE_REQUEST`;
export const FETCH_ONE_REQUEST = `${prefix}/FETCH_ONE_REQUEST`;
export const FETCH_SUCCESS = `${prefix}/FETCH_SUCCESS`;
export const FETCH_MORE_SUCCESS = `${prefix}/FETCH_MORE_SUCCESS`;
export const FETCH_ONE_SUCCESS = `${prefix}/FETCH_ONE_SUCCESS`;
export const FETCH_ERROR = `${prefix}/FETCH_ERROR`;
export const LOADING = `${prefix}/LOADING`;


/*** Reducer ***/
const initialState = {
    isLoading: true,
    isError: false,
    hasMore: false,
    items: []
};

const reducer = produce((draft, {type, payload}) => {
    // eslint-disable-next-line default-case
    switch (type) {
        case LOADING:
            draft.isError = false;
            draft.isLoading = true;
            break;
        case FETCH_MORE_SUCCESS:
            draft.items = draft.items.concat(payload.recipes);
            draft.isLoading = false;
            draft.isError = false;
            draft.hasMore = payload.hasMore;
            draft.totalCount = payload.totalCount;
            break;
        case FETCH_SUCCESS:
            draft.items = payload.recipes;
            draft.isLoading = false;
            draft.isError = false;
            draft.hasMore = payload.hasMore;
            draft.totalCount = payload.totalCount;
            break;
        case FETCH_ONE_SUCCESS:
            draft.items = [payload.recipe];
            draft.isLoading = false;
            draft.isError = false;
            break;
        case FETCH_ERROR:
            draft.isError = true;
            draft.isLoading = false;
            draft.hasMore = false;
    }
}, initialState);
export default reducer;

/*** Selectors ***/
export const stateSelector = (state) => state[moduleName];
const dummyIdSelector = (state, id) => id;
export const selectRecipes = createSelector(stateSelector, state => state.items);
export const isRecipesLoading = createSelector(stateSelector, state => state.isLoading);
export const isRecipesError = createSelector(stateSelector, state => state.isError);
export const hasMoreRecipes = createSelector(stateSelector, state => state.hasMore);
export const selectTotalCount = createSelector(stateSelector, state => state.totalCount);
export const selectRecipeById = createSelector(
    [selectRecipes, dummyIdSelector],
    (items, id) => items.find(item => item._id === id)
);

/*** Action Creators ***/
export const fetchNewRecipesAction = (query) => ({
    type: FETCH_REQUEST,
    query
});

export const fetchMoreRecipesAction = (query) => ({
    type: FETCH_MORE_REQUEST,
    query
});

export const fetchSingleRecipeAction = (id) => ({
    type: FETCH_ONE_REQUEST,
    id
});

/*** Sagas ***/
export function* fetchSaga({type, query}) {
    yield put({type: LOADING});
    try {
        const data = yield call(APIService.getRecipes, query);
        const successAction = {
            type: type === FETCH_REQUEST ? FETCH_SUCCESS : FETCH_MORE_SUCCESS,
            payload: data
        };
        yield put(successAction);
    } catch (error) {
        yield put({type: FETCH_ERROR, payload: error});
        console.error(error);
    }
}

export function* fetchOneRecipeSaga({id}) {
    yield put({type: LOADING});
    try {
        const data = yield call(APIService.getRecipeById, id);
        yield put({
            type: FETCH_ONE_SUCCESS,
            payload: data
        });
    } catch (error) {
        yield put({type: FETCH_ERROR, payload: error});
        console.error(error);
    }
}

export function* saga() {
  yield all([
      debounce(500, [FETCH_REQUEST, FETCH_MORE_REQUEST], fetchSaga),
      takeEvery(FETCH_ONE_REQUEST, fetchOneRecipeSaga)
  ]);
}