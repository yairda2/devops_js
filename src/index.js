const express = require('express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const app = express();
const port = 3000;
const mongoURL = 'mongodb://localhost:27017';
const dbName = 'gradesDB';

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/grades', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoURL);
    const db = client.db(dbName);
    const collection = db.collection('grades');

    const grades = await collection.find().toArray();
    res.send(grades);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/grades', async (req, res) => {
  const { grade1, grade2, grade3 } = req.body;
  
  try {
    const client = await MongoClient.connect(mongoURL);
    const db = client.db(dbName);
    const collection = db.collection('grades');

    await collection.insertOne({
      grade1: parseInt(grade1),
      grade2: parseInt(grade2),
      grade3: parseInt(grade3)
    });

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
