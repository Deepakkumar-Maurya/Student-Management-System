const express = require('express'); 
const studentLogin = require('../controllers/student/login');
const adminLogin = require('../controllers/admin/login');
const studentSignup = require('../controllers/student/signup');

const router = express.Router();

router.post('/studentLogin', studentLogin);
router.post('/adminLogin', adminLogin);
router.post('/studentSignup', studentSignup);

module.exports = router;