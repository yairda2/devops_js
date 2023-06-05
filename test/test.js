/* eslint-env node */

const request = require('supertest');
const app = require('../public/server');
const { describe, beforeAll, afterAll, it, expect } = require('@jest/globals');

describe('Registration API Tests', () => {
  let server;

  beforeAll(async () => {
    // Start the server on random port
    server = app.listen(0);
    console.log('Server started');
  });

  afterAll(async () => {
    server.close();
    console.log('Server closed');
  });

  it('should register a new student with valid data', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        name: 'John Doe',
        grades: [80, 90, 95],
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
