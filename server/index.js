const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const exercises = require('./routes/exercises.js');
const users = require('./routes/users.js')
app.use('/exercises', exercises);
app.use('/users', users);

//section for production stage v

//section for production stage ^

// listen to server port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening to port ${port}`));
