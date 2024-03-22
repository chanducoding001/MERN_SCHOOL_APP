const express = require('express');
const { attendanceController } = require('../controllers/attendanceController');

const router = express.Router();

router.post('/addAttendance',attendanceController);

module.exports = router;