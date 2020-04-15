import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from 'Redux/history';
import tags from 'Redux/ducks/tags';
import tagsCollection from 'Redux/ducks/tagsCollection';
import productDisplayNames from 'Redux/ducks/productDisplayNames';
import recipes from 'Redux/ducks/recipes';

export default combineReducers({
  router: connectRouter(history),
  tags,
  tagsCollection,
  productDisplayNames,
  recipes,
});
