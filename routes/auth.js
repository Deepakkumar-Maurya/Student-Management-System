const express = require('express'); 
const studentLogin = require('../controllers/student/login');
const adminLogin = require('../controllers/admin/login');
const studentSignup = require('../controllers/student/signup');
const studentLogout = require('../controllers/student/logout');
const adminLogout = require('../controllers/admin/logout');

const isLoggedIn = require('../middleware/Authorization');

const router = express.Router();

router.post('/studentLogin', studentLogin);
router.post('/adminLogin', adminLogin);
router.post('/studentSignup', studentSignup);
router.post('/studentLogout', isLoggedIn, studentLogout);
router.post('/adminLogout', isLoggedIn, adminLogout);

module.exports = router;