const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  exam1: {
    type: Number,
    required: true
  },
  exam2: {
    type: Number,
    required: true
  },
  exam3: {
    type: Number,
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
