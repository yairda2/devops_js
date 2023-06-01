const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/Student');

const app = express();

// Connect to MongoDB
const dbUrl = 'mongodb+srv://yair:yair@cluster0.ijthrbs.mongodb.net/?retryWrites=true&w=majority';
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(dbUrl, connectionParams)
  .then(() => {
    console.log('Connected to database');
    // Start the server after successfully connecting to the database
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Route for the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.json());

// Register a new student
app.post('/register', async (req, res) => {
  try {
    const { name, exam1, exam2, exam3 } = req.body;
    const student = new Student({ name, exam1, exam2, exam3 });
    await student.save();
    res.status(201).send('Registered successfully!');
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).send('Registration failed. Please try again.');
  }
});

// Retrieve grades for a student
app.get('/grades/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const student = await Student.findOne({ name });
    if (student) {
      res.send(`Exam 1 Grade: ${student.exam1}<br>Exam 2 Grade: ${student.exam2}<br>Exam 3 Grade: ${student.exam3}`);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    console.error('Error retrieving grades:', error);
    res.status(500).send('Failed to retrieve grades');
  }
});



// Route to display all students and best student average
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    let bestStudent = null;

    if (students.length > 0) {
      bestStudent = students.reduce((prev, curr) => {
        const currAverage = (curr.exam1 + curr.exam2 + curr.exam3) / 3;
        const prevAverage = (prev.exam1 + prev.exam2 + prev.exam3) / 3;
        return currAverage > prevAverage ? curr : prev;
      });
    }

    res.render('students', { students, bestStudent });
  } catch (error) {
    console.error('Error retrieving students:', error);
    res.status(500).send('Failed to retrieve students');
  }
});