const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/${process.env.DB_NAME}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    ssl: true,
  });
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  
  module.exports = db;
