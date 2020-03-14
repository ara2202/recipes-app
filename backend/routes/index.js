const Router = require('koa-router');
const {getRecipes, getRecipeById} = require('../controllers/recipes');
const {getProductDisplayNames} = require('../controllers/productDisplayNames');
const {getTags} = require('../controllers/tags');
const {getTagCategories} = require('../controllers/tagCategories');

const router = new Router({prefix: '/api'});

router.get('/recipes', getRecipes);
router.get('/recipe', getRecipeById);
router.get('/productDisplayNames', getProductDisplayNames);
router.get('/tags', getTags);
router.get('/tagCategories', getTagCategories);

module.exports = router;
