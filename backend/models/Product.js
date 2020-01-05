const mongoose = require('mongoose');
const connection = require('../libs/mongooseConnection');

const productSchema = new mongoose.Schema({
    fullName: { 
      type: String,
      required: true,
    },
    displayName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    pictogram: {
      type: String,
      required: false
    },
    minAgeAllowedInMonths: {
      type: Number,
      required: true
    },
    recipesObj: Object
  });

module.exports = connection.model('Product', productSchema);