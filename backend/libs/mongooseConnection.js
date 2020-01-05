const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const config = require('config');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

//mongoose.set('useCreateIndex', true);
//mongoose.set('useFindAndModify', false);

mongoose.set('debug', true);

mongoose.plugin(beautifyUnique);

console.log (config.get('mongodb.uri'));
module.exports = mongoose.createConnection(config.get('mongodb.uri'));

//mongoose.connect(config.get('mongodb.uri'), { useNewUrlParser: true, useUnifiedTopology: true});