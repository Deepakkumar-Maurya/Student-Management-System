const express = require('express');
const editDetails = require('../controllers/student/editDetails');

const router = express.Router();

router.post('/editDetails', editDetails);

module.exports = router;