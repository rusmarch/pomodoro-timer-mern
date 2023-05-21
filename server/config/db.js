const mongoose = require('mongoose');
const { createIndexes } = require('../models/user-model');

const connectDB = async () => {
   try {
      const connect = await mongoose.connect(process.env.DB_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      })
      console.log('MONGO_DB CONNECTED');
   } catch (e) {
      console.log(e);
   }
}

module.exports = connectDB;