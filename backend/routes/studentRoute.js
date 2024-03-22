const { addStudent, getStudents } = require('../controllers/studentsController');

const router = require('express').Router();

router.post('/addStudent',addStudent);
router.get('/allStudents',getStudents)

module.exports = router;