const Router = require("koa-router");
const { getRecipes, getRecipeById } = require("../controllers/recipes");
const { getTags, getTagsCollection } = require("../controllers/tags");
const {
  getProductDisplayNames
} = require("../controllers/productDisplayNames");

const router = new Router({ prefix: "/api" });

router.get("/recipes", getRecipes);
router.get("/recipe", getRecipeById);
router.get("/productDisplayNames", getProductDisplayNames);
router.get("/tags", getTags);
router.get("/tagsCollection", getTagsCollection);

module.exports = router;
