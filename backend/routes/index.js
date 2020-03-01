const Router = require('koa-router');
const {getRecipes, getRecipeById} = require('../controllers/recipes');
const {getProductDisplayNames} = require('../controllers/productDisplayNames');
const {getTags} = require('../controllers/tags');

const router = new Router({prefix: '/api'});

router.get('/recipes', getRecipes);
router.get('/recipe', getRecipeById);
router.get('/productDisplayNames', getProductDisplayNames);
router.get('/tags', getTags);

module.exports = router;
