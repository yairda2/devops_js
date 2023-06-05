/* eslint-env node */

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const { Student, Grade } = require("../models/student");

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://yair:yair@cluster0.ijthrbs.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

const db = mongoose.connection;

app.get("/", (req, res) => {
  const fileName = __filename;
  const code = `const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello, world!');\n});\n\napp.listen(3000, () => {\n  console.log('Server listening on port 3000');\n});`;

  console.log("Current File:", fileName);
  console.log("Code:", code);

  res.send("Hello, world!");
});

// Serve the static HTML file
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

// Route for handling user registration
app.post("/register", (req, res) => {
  const { name, grades } = req.body;

  // Data checks for the name
  if (
    !name ||
    typeof name !== "string" ||
    name.length > 20 ||
    /\d/.test(name)
  ) {
    return res.status(400).send("Invalid name");
  }

  // Data checks for the grades
  if (
    !Array.isArray(grades) ||
    grades.some(
      (grade) => typeof grade !== "number" || grade < 0 || grade > 100
    )
  ) {
    return res.status(400).send("Invalid grades");
  }

  const student = new Student({
    name,
    grades,
  });

  console.log("Received name:", name);
  console.log("Received grades:", grades);

  db.collection("students").insertOne(student, (error, result) => {
    if (error) {
      res.status(400).send("Error registering student");
    } else {
      res.status(200).json(result);
    }
  });
});

// Route for fetching all student data from the database
app.get("/students", (req, res) => {
  Student.find()
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((error) => {
      res.status(500).send("Error fetching students");
    });
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Close the server after all tests are done
afterAll(() => {
  server.close();
  console.log("Server closed");
});

module.exports = app;
