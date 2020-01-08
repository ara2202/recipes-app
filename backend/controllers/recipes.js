const Recipe = require('../models/Recipe');

async function getRecipes(ctx) 
{
    const {tags, productIds, not_include} = ctx.request.body;
    const {query, page, age, limit} = ctx.query;
    const lim = parseInt(limit)
    const reqObj = {};
    if (query) reqObj.$text = {$search: query};
    if (age) reqObj.allowedAge = { $lte: age }
    if (tags) reqObj.tags = {$all: tags } //{ $all: tags }
    if (productIds) reqObj['ingredients.displayName'] = {$all: productIds};

    // TODO: Поиск надо делать не по id-шникам а по displayName продукта, т.е. ищем
    // не "вареная картошка", а просто "картошка"
    const recipes = await Recipe
        .find(reqObj, {optionalIngredients:1, ingredients:1, recipeName: 1, allowedAge: 1, score: {$meta: 'textScore'}})
        //.populate('ingredients.product')
        //.populate('optionalIngredients.product')
        //.populate('tags')
        .sort({score: {$meta: 'textScore'}})
        .skip(page ? (page - 1) * lim : 0)
        .limit(lim || 10);
    // Populate здесь будет не нужен, подумать насчет выполнения $lookup

    ctx.body = {recipes}
   
}

module.exports = {
    getRecipes
  }