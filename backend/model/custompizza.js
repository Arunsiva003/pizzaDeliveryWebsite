const mongoose = require('mongoose');
const User = require('./userModel')

const customizedPizzaSchema = new mongoose.Schema({
  base: {
    type: String,
    required: true,
  },
  sauce: {
    type: String,
    required: true,
  },
  cheese: {
    type: String,
    required: true,
  },
  veggies: {
    type: [String],
    required: true,
  },
  user : {
    type: mongoose.Schema.Types.Mixed,
    ref: './userModel',
  }
});

const CustomizedPizza = mongoose.model('CustomizedPizza', customizedPizzaSchema);

module.exports = CustomizedPizza;
