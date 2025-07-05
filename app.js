const express = require('express');
const app = express();
const info = require('./routes/info')
const connectDB = require('./db/connect');
require('dotenv').config();

//middlewares
app.use(express.json());


//routes
app.use('/api/v1/money', info);


const start = async () => {
  try {
      await connectDB(process.env.MONGO_URI);
      const PORT = 3000;
      app.listen(PORT, () => {
          console.log(`Listening on port ${PORT}`);
      });
  } catch (error) {
      console.log(error);
  }
};
start();