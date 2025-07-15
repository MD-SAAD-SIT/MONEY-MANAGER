const express = require('express');
const app = express();
const info = require('./routes/info')
const connectDB = require('./db/connect');
const notfound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
require('dotenv').config();

//middlewares
app.use(express.json());
app.use(express.static('./public'));

//routes
app.use('/api/v1/money', info);
app.use(notfound);
app.use(errorHandler);

const start = async () => {
  try {
      await connectDB(process.env.MONGO_URI);
      const port = process.env.PORT || 3000;
      app.listen(port, () => {
          console.log(`Listening on port ${port}`);
      });
  } catch (error) {
      console.log(error);
  }
};
start();