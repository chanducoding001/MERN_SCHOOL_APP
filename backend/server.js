require('dotenv').config();
const express = require('express');
const {dbConnection} = require("./config/dbConn");
const mongoose = require("mongoose");
const authRoute = require('./routes/auth');
const users = require('./routes/getAllUsers');
const {authenticateToken} = require('./middlewares/authenticateToken');
const filesRoute = require('./routes/filesRoute');
const employeesRoute = require('./routes/employeesRoute');
const studentsRoute = require('./routes/studentRoute');
const cors = require('cors');
const parentsRoute = require('./routes/parentRoute');
const attendanceRoute = require('./routes/attendanceRoute');

dbConnection();
const port = process.env.PORT;

const app = express();

// app.use(cors({allowedOrigins:["http://localhost:3000"]}))
// app.use(cors({allowedOrigins:["https://chanduschoolapp.netlify.app/"]}))
app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/files',filesRoute);

app.use(authenticateToken);
app.use('/employees',employeesRoute);
app.use('/students',studentsRoute);
app.use('/users',users);
app.use('/parents',parentsRoute);
app.use('/attendance',attendanceRoute);

mongoose.connection.once("open",()=>{
    console.log('connected to database successfully!!');
    app.listen(port,()=>{
        console.log('server started at port ',port);
    })
})