const express = require('express'); 
const studentLogin = require('../controllers/student/login');
const adminLogin = require('../controllers/admin/login');

const router = express.Router();

router.post('/studentLogin', studentLogin);
router.post('/adminLogin', adminLogin);

module.exports = router;