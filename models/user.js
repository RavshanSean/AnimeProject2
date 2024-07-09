const mongoose = require('mongoose');
const animeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,

  },
  watchTime: {
    type: String,
    
  }
})



const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  list: [animeSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
