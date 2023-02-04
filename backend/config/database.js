const mongoose = require('mongoose');
const colors = require('colors');

const connectDatabase = async () => {
  try {
    mongoose.set('strictQuery', true);
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB Connected: ${connection.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log('Unable to connect to database'.brightRed);
    process.exit(1);
  }
};

module.exports = connectDatabase;
