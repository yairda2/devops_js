const mongoose = require('mongoose');

mongoose.connect('<YOUR_MONGODB_CONNECTION_STRING>', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

module.exports = mongoose.connection;
