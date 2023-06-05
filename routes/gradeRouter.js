const express = require('express');
const router = express.Router();

// Define routes for grades
router.get('/', (req, res) => {
  // Handle GET request for all grades
  res.send('Get all grades');
});

router.get('/:id', (req, res) => {
  // Handle GET request for a specific grade by ID
  const gradeId = req.params.id;
  res.send(`Get grade with ID ${gradeId}`);
});

router.post('/', (req, res) => {
  // Handle POST request to create a new grade
  const { subject, score } = req.body;
  res.send(`Create new grade: Subject: ${subject}, Score: ${score}`);
});

router.put('/:id', (req, res) => {
  // Handle PUT request to update a grade by ID
  const gradeId = req.params.id;
  const { subject, score } = req.body;
  res.send(`Update grade with ID ${gradeId}: Subject: ${subject}, Score: ${score}`);
});

router.delete('/:id', (req, res) => {
  // Handle DELETE request to delete a grade by ID
  const gradeId = req.params.id;
  res.send(`Delete grade with ID ${gradeId}`);
});

module.exports = router;
