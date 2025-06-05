const mongoose = require('mongoose');
const dotenv = require("dotenv")

//loading .env file
// dotenv.config();
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;