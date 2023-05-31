const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Student = require('../models/student');




// Before running the tests, connect to the test database
beforeAll(async () => {
  await mongoose.connect('<YOUR_TEST_MONGODB_CONNECTION_STRING>', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// After running the tests, disconnect from the test database and close the server
afterAll(async () => {
  await mongoose.connection.close();
  await app.close();
});

describe('Register endpoint', () => {
  beforeEach(async () => {
    // Clear the database before each test
    await Student.deleteMany({});
  });

  test('should register a new student', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        name: 'John Doe',
        exam1: 90,
        exam2: 85,
        exam3: 95,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe('John Doe');
    expect(response.body.exam1).toBe(90);
    expect(response.body.exam2).toBe(85);
    expect(response.body.exam3).toBe(95);
  });

  test('should return 500 if there is an internal server error', async () => {
    // Mock an error by providing an invalid student object
    const response = await request(app)
      .post('/register')
      .send({
        name: 'John Doe',
      });

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ error: 'Internal server error' });
  });
});
