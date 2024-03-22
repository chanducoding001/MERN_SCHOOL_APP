const express = require('express');
const {postEmployee,getEmployees,getParticularEmployee,putEmployeeData, deleteEmployee, getEmployeeThroughEmail} = require('../controllers/employeesController');
const router = express.Router();

router.post('/addEmployee',postEmployee);
router.get('/allEmployees',getEmployees);
router.get('/getEmployee/:id',getParticularEmployee);
router.get('/getEmployeeDetails/email/:email',getEmployeeThroughEmail);
router.put('/putEmployee/:id',putEmployeeData);
router.delete('/deleteEmployee/:id',deleteEmployee);
module.exports = router;