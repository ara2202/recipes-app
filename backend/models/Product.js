const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const connection = require('../libs/mongooseConnection');

const productSchema = new mongoose.Schema({
    fullName: { 
      type: String,
      required: true,
    },
    displayName: {
        type: ObjectId,
        ref: 'ProductDisplayName',
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    pictogram: {
      type: String,
      required: false,
    },
    minAgeAllowedInMonths: {
      type: Number,
      required: true,
    },
    recipesObj: Object,
  });

// productSchema.pre('save', async function(next) {
//
//     await this.populate('displayName');
//     next();
// });

module.exports = connection.model('Product', productSchema);