const express = require('express');
const addAdmin = require('../controllers/admin/addAdmin');
const addStudent = require('../controllers/admin/addStudent');

const router = express.Router();

router.post('/addAdmin', addAdmin);
router.post('/addStudent', addStudent);

module.exports = router;