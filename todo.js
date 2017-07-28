const mongoose = require('mongoose');

let toDoSchema = new mongoose.Schema({
  task: String,
  complete: Boolean,
  date: String
});

let ToDo = mongoose.model('ToDo', toDoSchema);

module.exports = ToDo;
