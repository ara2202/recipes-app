const Recipe = require('../models/Recipe');

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getRecipes(ctx) 
{
    const {query, page, minAge, maxAge, limit, tags, productIds, exclude} = ctx.query;
    const lim = parseInt(limit);
    const reqObj = {};
    const dnRequestObj = {};
    const ageObj = {};
    if (query) reqObj.$text = {$search: query};
    if (minAge) ageObj.$gte = minAge;
    if (maxAge) ageObj.$lte = maxAge;
    if (minAge || maxAge)  reqObj.allowedAge = ageObj;

    if (tags) reqObj.tags = {$all: tags.split(',')};
    if (productIds) dnRequestObj.$all = productIds.split(',');
    if (exclude) dnRequestObj.$nin = exclude.split(',');
    if (!productIds && exclude) reqObj['ingredients.displayName'] = dnRequestObj;
    if (productIds) reqObj.$or = [
        {
            ['ingredients.displayName']: dnRequestObj,
        },
        {
            ['optionalIngredients.displayName']: {$all: productIds.split(',')}
        },
    ];

    //ToDo: Убрать задержку
    //await timeout( 500);

    //ToDo: Посмотреть как сделать красиво и в 1 запрос - изучить Монгу)
    // надо в 1 запрос получить TotalCount и текущие результаты (пагинация, фильты)
    const totalCount = await Recipe.find(reqObj).count();
    const hasMore = totalCount > page * (lim || 10);
    const recipes = await Recipe
        .find(reqObj, {score: {$meta: 'textScore'}} /*, {optionalIngredients:1, ingredients:1, recipeName: 1, allowedAge: 1, images: 1, recipeText: 1, score: {$meta: 'textScore'}}*/)
        //.populate('ingredients.product')
        //.populate('optionalIngredients.product')
        //.populate('tags')
        .sort({score: {$meta: 'textScore'}})
        .skip(page ? (page - 1) * lim : 0)
        .limit(lim || 10);
    // Populate здесь будет не нужен, подумать насчет выполнения $lookup

    ctx.body = {recipes, totalCount, hasMore}
   
}

async function getRecipeById(ctx) {
    const {id} = ctx.query;
    const recipe = await Recipe.findById(id);

    ctx.body = {recipe}
}

module.exports = {
    getRecipes,
    getRecipeById
  };