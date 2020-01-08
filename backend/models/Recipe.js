const mongoose = require('mongoose');
const Product = require('./Product');
const ObjectId = mongoose.Schema.Types.ObjectId;
const connection = require('../libs/mongooseConnection');

const reviewSchema = new mongoose.Schema({
  user: {
      type: ObjectId,
      ref: 'User',
      required: true
  },
  rating: {
      type: Number,
      required: true
  }
});

const recipeSchema = new mongoose.Schema({
    recipeName: {
      type: String,
      required: true,
    },
    ingredients: [{
        product: {type: ObjectId, ref: 'Product', required: true},
        displayName: {type: ObjectId, ref: 'DisplayName', required: true},
        amount: {type: Number, required: true},
        displayAmount: String
    }],
    optionalIngredients: [{
        product: {type: ObjectId, ref: 'Product'},
        displayName: {type: ObjectId, ref: 'DisplayName'},
        amount:  Number,
        displayAmount: String
    }],
    tags: [{type: ObjectId, ref: 'Tag', required: true}],
    complexity: {
      type: String,
      required: true
    },
    time: String,
    recipeText: {
        type: String,
        required: true
    },
    fridgeStorage: String,
    freezerStorage: String,
    author: String,
    originUrl: String,
    images: [String],

    allowedAge: {
      type: Number,
      default: 0
    },
    review: {
      type: [reviewSchema],
      required: false
    },
    //Todo: Добавить дату добавления в базу рецепта
    // Чтобы новые рецепты попадали в фильтр "новинки" и/или отображались с пометкой
});

recipeSchema.pre('save', async function(next){
    let maxAgeofAllProducts = 0; 
    
    await this.populate('ingredients.product').execPopulate();
  
    for (let i=0; i < this.ingredients.length; i++){
      if (maxAgeofAllProducts < this.ingredients[i].product.minAgeAllowedInMonths) 
          maxAgeofAllProducts = this.ingredients[i].product.minAgeAllowedInMonths;
      const product = await Product.findById(this.ingredients[i].product.id);
      product.recipesObj = {
        ...product.recipesObj,
        [this.id]: this.id
      };
      await product.save();
    }
    this.allowedAge = maxAgeofAllProducts;

    next();
});

recipeSchema.index(
  { title: 'text', description: 'text' },
  {
    weights: { recipeName: 10, recipeText: 5 },
    default_language: 'russian',
    name: 'TextSearchIndex'
  }
);


module.exports = connection.model('Recipe', recipeSchema);