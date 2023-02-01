const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const jwt = require("jsonwebtoken");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5000'],
    credentials: true
}));


const exercises = require('./routes/exercises.js');
const users = require('./routes/users.js')
app.use('/exercises', exercises);
app.use('/users', users);

//section for production stage v

//section for production stage ^

// listen to server port
const port = 5000;
app.listen(port, () => console.log(`listening to port ${port}`));

