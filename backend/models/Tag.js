const mongoose = require('mongoose');
const connection = require('../libs/mongooseConnection');

const tagsSchema = new mongoose.Schema({
    tagName: {
        type: String,
        required: true,
        unique: true
    },
    tagCategory: {
        type: String,
        required: true
    }
});

module.exports = connection.model('Tag', tagsSchema);
