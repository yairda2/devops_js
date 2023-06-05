/* eslint-env node */
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  grades: [{
    type: Number,
    required: true
  }]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = { Student };
