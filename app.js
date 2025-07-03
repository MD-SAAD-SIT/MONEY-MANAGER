const express = require('express');
const app = express();
const connectDB = require('./db/connect');
require('dotenv').config();

//middlewares
app.use(express.json());




const start = async () => {
  try {
      await connectDB(process.config.MONGO_URI);
      const PORT = 3000;
      app.listen(PORT, () => {
          console.log(`Listening on port ${PORT}`);
      })
  } catch (error) {
      console.log(error);
  }
};