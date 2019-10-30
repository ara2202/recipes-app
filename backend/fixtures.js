const mongoose = require('mongoose');
const config = require('config');
const Recipe = require('./models/Recipe');
const Product = require('./models/Product');




async function runTest(){
try {
mongoose.connect(config.get('mongodb.uri'),{ useNewUrlParser: true , useUnifiedTopology: true }); //'mongodb://localhost/recipes'

await Recipe.deleteMany();
await Product.deleteMany();

const productObj1 = {
    fullName: "Яблоки запеченые",
    displayName: "Яблоки",
    category: "фрукты",
    minAgeAllowedInMonths: 6,  
};

const productObj2 = {
    fullName: "Тесто запеченное",
    displayName: "Тесто",
    category: "Выпечка",
    minAgeAllowedInMonths: 7,
}; 
const productObj3 = {
    fullName: "Листья адского салата",
    displayName: "Листья адского салата",
    category: "Зелень",
    minAgeAllowedInMonths: 10,
}; 
const productObj4 = {
    fullName: "Помидоры свежие",
    displayName: "Помидоры",
    category: "Овощи",
    minAgeAllowedInMonths: 8,
}; 
const prod1 = await Product.create(productObj1);
const prod2 = await Product.create(productObj2);
const prod3 = await Product.create(productObj3);
const prod4 = await Product.create(productObj4);

const recipeObj1 = {
    recipeName: "Яблочный пирог",
    products: [
        {
            product: prod1.id,
            amount: 200
        },
        {
            product: prod2.id,
            amount: 300
        }
    ],
    tags: ["выпечка", "десерт", "вегетарианское"],
    cookProcess: "Сделать тесто, добавить яблоки, запечь",
    images: ["url-to-image1", "url-to-image2"],
};

const recipeObj2 = {
    recipeName: "Адский салат",
    products: [
        {
            product: prod3.id,
            amount: 200
        },
        {
            product: prod4.id,
            amount: 300
        }
    ],
    tags: ["салат", "адское", "вегетарианское"],
    cookProcess: "Смешать ингридиенты",
    images: ["url-to-image3", "url-to-image4"],
};


const recipe1 = await Recipe.create(recipeObj1);
const recipe2 = await Recipe.create(recipeObj2);
//console.log(recipe.toJSON({virtuals: true}));

recipe1.recipeName = "NEW NAME";
await recipe1.save();


mongoose.connection.close();
} catch (e) {
    console.log(e);
}
};

runTest();