const mongoose = require('mongoose');
const connection = require('../libs/mongooseConnection');

const productDisplayNameSchema = new mongoose.Schema({
    displayName: {
      type: String,
      required: true,
    }
  });

module.exports = connection.model('ProductDisplayName', productDisplayNameSchema);