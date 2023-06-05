const express = require('express');
const router = express.Router();

// Define routes for students
router.get('/', (req, res) => {
  // Handle GET request for all students
  res.send('Get all students');
});

router.get('/:id', (req, res) => {
  // Handle GET request for a specific student by ID
  const studentId = req.params.id;
  res.send(`Get student with ID ${studentId}`);
});

router.post('/', (req, res) => {
  // Handle POST request to create a new student
  const { name, grade } = req.body;
  res.send(`Create new student: ${name}, Grade: ${grade}`);
});

router.put('/:id', (req, res) => {
  // Handle PUT request to update a student by ID
  const studentId = req.params.id;
  const { name, grade } = req.body;
  res.send(`Update student with ID ${studentId}: ${name}, Grade: ${grade}`);
});

router.delete('/:id', (req, res) => {
  // Handle DELETE request to delete a student by ID
  const studentId = req.params.id;
  res.send(`Delete student with ID ${studentId}`);
});

module.exports = router;
