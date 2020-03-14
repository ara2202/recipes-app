const mongoose = require('mongoose');
const connection = require('../libs/mongooseConnection');
const ObjectId = mongoose.Schema.Types.ObjectId;

const tagCategorySchema = new mongoose.Schema({
    tagCategory: {
      type: String,
      required: true,
    },
    tags: [{type: ObjectId, ref: 'Tag'}],
    tagColor: String,
});

module.exports = connection.model('TagCategory', tagCategorySchema);