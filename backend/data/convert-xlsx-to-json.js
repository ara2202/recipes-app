const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const XLSX_dir = 'XLSX';
const JSON_dir = 'JSON';

console.log(`processing products ...`);
const workbookProducts = XLSX.readFile(path.join(__dirname, XLSX_dir, 'products.xlsx'));
const sheet_namePr = workbookProducts.SheetNames[0];
const worksheetPr = workbookProducts.Sheets[sheet_namePr];
const products = XLSX.utils.sheet_to_json(worksheetPr);
fs.writeFileSync(path.join(__dirname, JSON_dir, 'products.json'), JSON.stringify(products));

console.log(`processing tags ...`);
const workbookTags = XLSX.readFile(path.join(__dirname, XLSX_dir, 'tags.xlsx'));
const sheet_nameTg = workbookTags.SheetNames[0];
const worksheetTg = workbookTags.Sheets[sheet_nameTg];
const tags = XLSX.utils.sheet_to_json(worksheetTg);
fs.writeFileSync(path.join(__dirname, JSON_dir, 'tags.json'), JSON.stringify(tags));

console.log(`processing recipes ...`);
const workbookRecipes = XLSX.readFile(path.join(__dirname, XLSX_dir, 'recipes_DB.xlsx'));
let newRecipe = null;
const recipes = [];
for (const name of workbookRecipes.SheetNames) {
  const sheet = workbookRecipes.Sheets[name];
  const rawRecipes = XLSX.utils.sheet_to_json(sheet);
  
  for (const recipe of rawRecipes) {
    const {recipeName, product, showName, amount, displayAmount, optProduct, showOptName,
            amountOpt, displayAmountOpt, tags, images} = recipe;
    if (recipeName) {
      if (newRecipe) recipes.push(newRecipe);

      newRecipe = Object.assign({}, recipe);
      newRecipe.tags = [tags];
      newRecipe.images = [images];
      newRecipe.ingredients = [{product, showName, amount, displayAmount}];
      newRecipe.optionalIngredients = [{
        product: optProduct,
        showName: showOptName,
        amount: amountOpt,
        displayAmount: displayAmountOpt
      }];
      delete newRecipe.product;
      delete newRecipe.amount;
      delete newRecipe.displayAmount;
      delete newRecipe.optProduct;
      delete newRecipe.amountOpt;
      delete newRecipe.displayAmountOpt;

    } else
    {
      if (tags) newRecipe.tags.push(tags);
      if (images) newRecipe.images.push(images);
      if (product) newRecipe.ingredients.push({product, showName, amount, displayAmount});
      if (optProduct) newRecipe.optionalIngredients.push({
        product: optProduct,
        showName: showOptName,
        amount: amountOpt,
        displayAmount: displayAmountOpt
      });
    }
  } 
}
// process the last one of recipes
if (newRecipe) recipes.push(newRecipe);

fs.writeFileSync(path.join(__dirname, JSON_dir, 'recipes.json'), JSON.stringify(recipes));