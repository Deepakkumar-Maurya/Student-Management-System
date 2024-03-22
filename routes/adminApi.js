const express = require('express');
const addAdmin = require('../controllers/admin/addAdmin');
const addStudent = require('../controllers/admin/addStudent');
const deleteStudent = require('../controllers/admin/deleteStudent');
const editStudent = require('../controllers/admin/editStudent');
const listStudent = require('../controllers/admin/listStudent');

const isLoggedIn = require('../middleware/Authorization');

const router = express.Router();

router.post('/addAdmin', isLoggedIn, addAdmin);
router.post('/addStudent', isLoggedIn, addStudent);
router.post('/deleteStudent', isLoggedIn, deleteStudent);
router.post('/editStudent', isLoggedIn, editStudent);
router.get('/listStudent', listStudent);

module.exports = router;