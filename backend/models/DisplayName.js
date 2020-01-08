const mongoose = require('mongoose');
const connection = require('../libs/mongooseConnection');

const displayNameSchema = new mongoose.Schema({
    displayName: {
      type: String,
      required: true,
    }
  });

module.exports = connection.model('DisplayName', displayNameSchema);