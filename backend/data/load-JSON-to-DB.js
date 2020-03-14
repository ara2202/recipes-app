const Tag = require('../models/Tag');
const Product = require('../models/Product');
const Recipe = require('../models/Recipe');
const ProductDisplayName = require('../models/ProductDisplayName');
const TagCategory = require('../models/TagCategory');

const connection = require('../libs/mongooseConnection');

const tags = require('./JSON/tags.json');
const products = require('./JSON/products.json');
const recipes = require('./JSON/recipes.json');

(async () => {
  await Tag.deleteMany();
  await Product.deleteMany();
  await Recipe.deleteMany();
  await TagCategory.deleteMany();
  await ProductDisplayName.deleteMany();
  
  const displayNameMap = {/*[displayName]: <MongoDbDocument>*/};
  const productsMap = {/*[fullName] : {productId, displayNameId }*/};
  const tagsMap = {/*[tagName]: id*/};
  const tagCategoryMap = {/*[tagCategory]: <MongoDbDocument>*/};

  for (const {tagName, tagCategory, tagColor} of tags) {
    if (!tagCategoryMap[tagCategory]) {
        const newTagCategory = await TagCategory.create({ tagCategory, tagColor });
        const newTag = await Tag.create({tagName, category: newTagCategory.id});

        newTagCategory.tags.push(newTag.id);
        await newTagCategory.save();
        tagsMap[tagName] = newTag.id;
        tagCategoryMap[tagCategory] = newTagCategory;
    } else {
        const category = tagCategoryMap[tagCategory];
        const newTag = await Tag.create({tagName, category: category.id});
        tagsMap[tagName] = newTag.id;
        category.tags.push(newTag.id);
        await category.save();
    }
  }

  for (const p of products) {
    let displayNameDoc = displayNameMap[p.displayName];

    if (!displayNameDoc) {
      displayNameDoc = await ProductDisplayName.create({displayName: p.displayName});
      displayNameMap[p.displayName] = displayNameDoc;
    }

    p.displayName = displayNameDoc.id;
    const pr = await Product.create(p);
    productsMap[p.fullName] = {
      id: pr.id,
      displayNameId: displayNameDoc.id
    };
  }

  for (const recipe of recipes) {
    recipe.tags = recipe.tags.map(item => tagsMap[item]);

    recipe.ingredients = recipe.ingredients.map(item => ({
        product: productsMap[item.product].id,
        displayName: productsMap[item.product].displayNameId,
        showName: item.showName,
        amount: item.amount,
        displayAmount: item.displayAmount
    }));

    recipe.optionalIngredients = recipe.optionalIngredients.map(item => {
      if (item.product) {
      return ({
        product: item ? productsMap[item.product].id : undefined,
        displayName: item ? productsMap[item.product].displayNameId : undefined,
        showName: item.showName || undefined,
        amount: item.amount || undefined,
        displayAmount: item.displayAmount || undefined
      })}
    }
    );
    
    await Recipe.create(recipe);
  }

  connection.close();

  console.log(`${Object.keys(displayNameMap).length} product displayNames have been saved in DB`);
  console.log(`${tags.length} tags have been saved in DB`);
  console.log(`${products.length} products have been saved in DB`);
  console.log(`${recipes.length} recipes have been saved in DB`);
})();