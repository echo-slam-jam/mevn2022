const express = require('express');
const mongo = require("mongodb");
const router = express.Router();
const url = "mongodb://localhost:27017";
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const jwtdecode = require("jwt-decode");

mongo.MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      db = client.db("mevn2022")
      users = db.collection("users");
      exercises = db.collection('exercises');
    }
  )

const comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

//AUTHORIZATION
const verifyToken = async (req,res,next)=>{
  try {
      if(req.header("authorization")){
        const token = await req.header("authorization").split(' ')[1];
      jwt.verify(token, "RESTFULAPIs", (async (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
      req.user = await users.find(decoded._id);
      console.log(decoded)
      next();
      })); 
      } else {
        res.status(401).json({message:'Please login to access the data'});
    }
  } catch (error) {
     return next(error); 
  }
}

//AUTHENTICATION

router.post('/register', async (req, res) => {
  await users.insertOne({
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10),
    routines: [],
},
(err, result) => {
    if (err) {
      console.error(err)
      res.status(500).json({ err: err })
      return
    }
    result.password = undefined;
    res.status(201).send({message: `User "${req.body.name}" created!`});
  })
});

//sign in
router.get('/signin', async (req, res) => {
  await users.find({
    name: req.body.name,
  }).toArray((err, items) => {
    if (err) throw err;
    if (!items || !bcrypt.compareSync(req.body.password, items[0].password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    return res.status(200).json({ 
      token: jwt.sign({
         name: items[0].name, _id:items[0]._id  
      }, 'RESTFULAPIs', {expiresIn: "20s"}) });
})
});

//get profile of user
router.get('/profile', async (req, res) => {
  try {
    // console.log(req.header("authorization"))
    const token = req.header("authorization").split(' ')[1];
    jwt.verify(token, 'RESTFULAPIs')
    const val = jwtdecode(token);
    res.status(200).json({token, val})
  } catch (err) {
    return res.send(err)
  }

});
  
// Get exercises
router.get('/', verifyToken, async (req, res) => {
    users.find().toArray((err, items) => {
        if (err) {
          console.error(err)
          res.status(500).json({ err: err })
          return
        }
        res.status(200).json({ users: items })
      })
});

// Get distribution of exercise types
router.get('/totals', async (req, res) => {
  exercises.aggregate([
    { "$facet": {
      "Pull": [
        { $match : { type: "pull"}},
        { $count: "pull" },
      ],
      "Push": [
        { $match : { type: "push"}},
        { $count: "pushes" }
      ],
      "TotalExercises": [
        { $count: "names" }
      ],
    }},
    {
      $project: {
        "Pull": { "$arrayElemAt": ["$Pull.pull", 0] },
        "Push": { "$arrayElemAt": ["$Push.pushes", 0] },
        "TotalExercises": { "$arrayElemAt": ["$TotalExercises.names", 0] }
      }
    }
  ]).toArray((err, items) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      }
      res.status(200).json({ Totals: items })
    })
});

router.get('/:id', async (req, res) => {
 const user = users.aggregate([
  {
    $match: {
      _id: new mongo.ObjectId(req.params.id)
    }
  },
  {
    $lookup: {
      from: "routines",
      localField: "routines",
      foreignField: "_id",
      as: "routines"
    }
  },
  {
    $unwind: {
      path: "$routines",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $lookup: {
        from: "exercises",
        localField: "routines.exercise",
        foreignField: "_id",
        as: "routines.exercise"
    }
  },
  {
    "$project": {
      "routines._id": 0,
      "routines.exercise._id": 0,
      "routines.exercise.type": 0,
      "routines.exercise.createdAt": 0,
      "routines.exercise.completedAt": 0,
      "routines.exercise.achieved": 0,
      "routines.exercise.achievedAt": 0,
    }
  },
  {
    $group: {
      _id : "$_id",
      name: { $first: "$name" },
      routines: { $push: "$routines" }
    }
  },

]).toArray((err, user) => {
  
  if (err) {
    console.error(err)
    res.status(500).json({ err: err })
    return
  }
res.status(200).json({user})
})
});

router.get('/:id', async (req, res) => {
  users.find({_id: new mongo.ObjectId(req.params.id)}).toArray((err, items) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      }
      res.status(200).json({ user: item })
    })
});
// Get filtered exercises
router.get('/filter', async (req, res) => {
    res.send(await exercises.find(
        req.body.filter
    ).toArray());
});

// Add exercises
router.post('/', async (req, res) => {
    await exercises.insertOne({
        name: req.body.name,
        type: req.body.type,
        achieved: req.body.achieved,
        createdAt: new Date()
    },
    (err, result) => {
        if (err) {
          console.error(err)
          res.status(500).json({ err: err })
          return
        }
        res.status(201).send({message: `Exercise "${req.body.name}" created!`});
      }
    )
});

// Delete exercises
router.delete('/:id', async (req, res) => {
    await exercises.deleteOne({
        _id: new mongo.ObjectId(req.params.id)
    },
    (err, result) => {
        if (err) {
          console.error(err)
          res.status(500).json({ err: err })
          return
        }
        res.status(200).send({message: `Exercise ${req.params.id} deleted!`});
      }
    )
});

// Update exercises
router.put('/replace', async (req, res) => {
    await exercises.replaceOne({
        _id: new mongo.ObjectId(req.body.id)
    }, {
        ...req.body.updates,
        achieved: false,
        createdAt: new Date()
    });
    res.status(200).send();
});

//Update Completed Status
router.patch('/achieve', async (req, res) => {
    await exercises.updateOne({
        _id: new mongo.ObjectId(req.body.id)
    }, {
        $set: {
            achieved: true,
            achievedAt: new Date()
        },
    });
    res.status(200).send({message: `Entry ${req.params.id} achieved!`});
});

module.exports = router;