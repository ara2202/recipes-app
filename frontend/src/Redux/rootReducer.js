import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from './history';
import tags from './ducks/tags.js';
import productDisplayNames from './ducks/productDisplayNames';
import recipes from './ducks/recipes';

export default combineReducers({
  router: connectRouter(history),
  tags,
  productDisplayNames,
  recipes,
});
