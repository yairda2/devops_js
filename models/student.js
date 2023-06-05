const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  grades: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grade'
  }]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
