const mongoose = require('mongoose');
const User = require('./user');

// mongoose.connect('mongodb://127.0.0.1:27017/test', {
mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {
  // user: process.env.MONGO_USER,
  // pass: process.env.MONGO_PASSWORD,
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => console.log('Connected!'));

module.exports = {
  User,
}