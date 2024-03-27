const express = require('express');
const editDetails = require('../controllers/student/editDetails');
const editParents = require('../controllers/student/editParents');

const isLoggedIn = require('../middleware/Authorization');

const router = express.Router();

router.post('/editDetails', isLoggedIn, editDetails);
router.post('/editParents', isLoggedIn, editParents);


module.exports = router;