const mongoose = require('mongoose');
const connection = require('../libs/mongooseConnection');
const ObjectId = mongoose.Schema.Types.ObjectId;

const tagSchema = new mongoose.Schema({
    tagName: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: ObjectId,
        ref: 'TagCategory',
        required: true,
        autopopulate: {select: 'tagColor'},
    },
});

tagSchema.plugin(require('mongoose-autopopulate'));

module.exports = connection.model('Tag', tagSchema);
