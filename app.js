const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const app = express();
const dotenv = require('dotenv').config();
const index = require('./routes/index');
const studentApi = require('./routes/studentApi');
const adminApi = require('./routes/adminApi');


// mongodb connection
mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
const db = mongoose.connection;

// Check MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// view engine setup
app.set('view engine', 'ejs');

// public folder
const publicdirectory = path.join(__dirname, 'public');
app.use(express.static(publicdirectory));

// parse URL encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended : false }));
// parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use('/', index);
app.use('/student', studentApi);
app.use('/admin', adminApi);

// app.listen(5000, () => {
//   console.log(`Server is running on port 3000`);
// });
module.exports.handler = serverless(app);
