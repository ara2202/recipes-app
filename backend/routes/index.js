const Router = require('koa-router');
const {getRecipes} = require('../controllers/recipes');

const router = new Router({prefix: '/api'});

router.get('/recipes', getRecipes);

module.exports = router;
