const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const app = express();


// mongodb connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
const public = path.join(__dirname, './src/public');
app.use(express.static(public));

// routes
app.use('/', require('./src/routes/index'));
app.use('/student', require('./src/routes/studentApi'));
app.use('/admin', require('./src/routes/adminApi'));


module.exports.handler = serverless(app);
