const Tag = require('../models/Tag');
const Product = require('../models/Product');
const Recipe = require('../models/Recipe');
const DisplayName = require('../models/DisplayName');

const connection = require('../libs/mongooseConnection');

const tags = require('./JSON/tags.json');
const products = require('./JSON/products.json');
const recipes = require('./JSON/recipes.json');
const displayNames = require('./JSON/displayNames.json');

(async () => {
  await Tag.deleteMany();
  await Product.deleteMany();
  await Recipe.deleteMany();
  await DisplayName.deleteMany();
  
  const productsMap = {/*
    [fullName] : id
*/}
  const tagsMap = {/*
      [tagName]: id
  */}
  const displayNameMap = {/*
    [displayName]: id
  */}

  for (const dname of displayNames) {
    const dn = await DisplayName.create(dname);
    displayNameMap[dname.displayName] = dn.id;
  };

  for (const tag of tags) {
    const tg = await Tag.create(tag);
    tagsMap[tag.tagName] = tg.id;
  };

  for (const product of products) {
    product.displayName = displayNameMap[product.displayName];
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

  console.log(`${displayNames.length} displayNames have been saved in DB`);
  console.log(`${tags.length} tags have been saved in DB`);
  console.log(`${products.length} products have been saved in DB`);
  console.log(`${recipes.length} recipes have been saved in DB`);
})();