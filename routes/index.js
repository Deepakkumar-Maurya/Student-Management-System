const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/Authorization');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/signup', (req, res) => {
  res.render('signup');
})

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/student', isLoggedIn, (req, res) => {
  res.render('student-dashboard');
});

router.get('/admin', isLoggedIn, (req, res) => {
  res.render('admin-dashboard');
});

module.exports = router;