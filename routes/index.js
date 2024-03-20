const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/student', (req, res) => {
  res.render('student-dashboard');
});

router.get('/admin', (req, res) => {
  res.render('admin-dashboard');
});

module.exports = router;