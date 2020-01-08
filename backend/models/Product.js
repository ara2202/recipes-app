const mongoose = require('mongoose');
const DisplayName = require('./DisplayName');
const ObjectId = mongoose.Schema.Types.ObjectId;
const connection = require('../libs/mongooseConnection');

const productSchema = new mongoose.Schema({
    fullName: { 
      type: String,
      required: true,
    },
    displayName: {
        type: ObjectId,
        ref: 'DisplayName',
        required: true,
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