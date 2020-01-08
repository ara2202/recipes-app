const Router = require('koa-router');
const {getRecipes} = require('../controllers/recipes');
const {getDisplayNames} =  require('../controllers/displayNames');

const router = new Router({prefix: '/api'});

router.get('/recipes', getRecipes);
router.get('/displayNames', getDisplayNames);

module.exports = router;
