const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./authJwt');
require('dotenv/config');

app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(authJwt());

//Routes
const tasksRoutes = require('./routes/tasks');
const usersRoutes = require('./routes/users');

const api = process.env.API_URL;

app.use(`${api}/tasks`, tasksRoutes);
app.use(`${api}/users`, usersRoutes);

//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'task'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(3003, ()=>{

    console.log('server is running http://localhost:3003');
})