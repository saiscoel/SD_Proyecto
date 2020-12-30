const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = Schema({
  Name: String,
  Year: String,
  Grapes: String,
  Country: String,
  Region: String,
  Description: String,
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('wines', TaskSchema);
