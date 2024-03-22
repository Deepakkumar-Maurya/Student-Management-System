const express = require('express');
const editDetails = require('../controllers/student/editDetails');
// const profileUpload = require('../controllers/student/profileUpload');

const isLoggedIn = require('../middleware/Authorization');

const router = express.Router();

router.post('/editDetails', isLoggedIn, editDetails);
// router.post('/profileUpload', profileUpload);

module.exports = router;