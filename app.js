const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const dotenv = require('dotenv').config();
const index = require('./routes/index');
const studentApi = require('./routes/studentApi');
const adminApi = require('./routes/adminApi');
const auth = require('./routes/auth');
const profileUpload = require('./controllers/student/profileUpload');


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

// parse URL encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended : false }));
// parse JSON bodies (as sent by API clients)
app.use(express.json());

// cookie parser
app.use(cookieParser());

const publicdirectory = path.join(__dirname, 'public');
app.use(express.static(publicdirectory));


// routes
app.use('/', index);
app.use('/student/profileUpload', profileUpload);
app.use('/student', studentApi);
app.use('/admin', adminApi);
app.use('/auth', auth);

// adding serverless-http
module.exports.handler = serverless(app);
