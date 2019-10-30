const Tag = require('../models/Tag');
const Product = require('../models/Product');
const Recipe = require('../models/Recipe');

const connection = require('../libs/mongooseConnection');

const tags = require('./JSON/tags.json');
const products = require('./JSON/products.json');
const recipes = require('./JSON/recipes.json');

(async () => {
  await Tag.deleteMany();
  await Product.deleteMany();
  await Recipe.deleteMany();
  
  const productsMap = {/*
    [fullName] : id
*/}
  const tagsMap = {/*
      [tagName]: id
  */}
  
  for (const tag of tags) {
    const tg = await Tag.create(tag);
    tagsMap[tag.tagName] = tg.id;
  };

  for (const product of products) {
    const pr = await Product.create(product);
    productsMap[product.fullName] = pr.id;
  };

  for (const recipe of recipes) {
    recipe.tags = recipe.tags.map(item => tagsMap[item]);

    recipe.ingredients = recipe.ingredients.map(item => ({
        product: productsMap[item.product],
        amount: item.amount,
        displayAmount: item.displayAmount
    }));

    recipe.optionalIngredients = recipe.optionalIngredients.map(item => ({
        product: productsMap[item.product],
        displayAmount: item.displayAmount
    }));
    
    await Recipe.create(recipe);
  }

  connection.close();

  console.log(`${tags.length} tags have been saved in DB`);
  console.log(`${products.length} products have been saved in DB`);
  console.log(`${recipes.length} recipes have been saved in DB`);
})();