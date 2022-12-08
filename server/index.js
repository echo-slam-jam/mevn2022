const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const jwt = require("jsonwebtoken");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
// Middleware
app.use(bodyParser.json());
app.use(cors());

const exercises = require('./routes/exercises.js');
const users = require('./routes/users.js')
app.use('/exercises', exercises);
app.use('/users', users);
// app.use(function(req, res, next) {
//     if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
//       jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
//         if (err) req.user = undefined;
//         req.user = decode;
//         next();
//       });
//     } else {
//       req.user = undefined;
//       next();
//     }
//   });

//section for production stage v

//section for production stage ^

// listen to server port
const port = process.env.PORT;

app.listen(port, () => console.log(`listening to port ${port}`));
