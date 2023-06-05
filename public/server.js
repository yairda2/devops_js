const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRouter = require('../routes/studentRouter');
const gradeRouter = require('../routes/gradeRouter');

const app = express();
const port = 3000;
const dbName = 'yairdb';
const url = 'mongodb+srv://yair:yair@cluster0.ijthrbs.mongodb.net/' + dbName + '?retryWrites=true&w=majority';

// MongoDB connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// Routes
app.use('/students', studentRouter);
app.use('/grades', gradeRouter);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = { app, server };
