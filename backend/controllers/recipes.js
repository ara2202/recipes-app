const Recipe = require('../models/Recipe');

async function getRecipes(ctx) 
{
    const {age, tags, products, not_include} = ctx.request.body;
    const {query} = ctx.query;
    
    const reqObj = {};
    if (query) reqObj.$text = {$search: query};
    if (age) reqObj.allowedAge = { $lte: age }
    if (tags) reqObj.tags = { $elemMatch: { tagName: id1 } } //{ $all: tags }

    const recipes = await Recipe
        .find(reqObj, {score: {$meta: 'textScore'}})
        .populate('ingredients.product')
        .populate('optionalIngredients.product')
        .populate('tags')
        .sort({score: {$meta: 'textScore'}})
        .limit(10);
    
    ctx.body = {recipes}
   
}

module.exports = {
    getRecipes
  }