const express = require('express');
const addAdmin = require('../controllers/admin/addAdmin');
const addStudent = require('../controllers/admin/addStudent');
const deleteStudent = require('../controllers/admin/deleteStudent');
const editStudent = require('../controllers/admin/editStudent');

const isLoggedIn = require('../middleware/Authorization');

const router = express.Router();

router.post('/addAdmin', addAdmin);
router.post('/addStudent', addStudent);
router.post('/deleteStudent', deleteStudent);
router.post('/editStudent', editStudent);

module.exports = router;