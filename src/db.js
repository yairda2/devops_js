const { MongoClient } = require('mongodb');
const uri = '<YOUR_MONGODB_CONNECTION_STRING>';

async function connectDB() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client.db();
}

module.exports = { connectDB };
