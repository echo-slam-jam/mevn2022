const express = require('express')
const mongodb = require('mongodb')
const mongo = require("mongodb").MongoClient
const router = express.Router();
const url = "mongodb://localhost:27017"


// Get exercises
router.get('/', async (req, res) => {
    res.send(await exercises.find({}).toArray());
    // res.send('hello');
});

router.get('/completed', async (req, res) => {
    const exercises = await loadExercisesCollection();
    res.send(await exercises.find({
        completed: true
    }).toArray());
});

router.get('/ongoing', async (req, res) => {
    const exercises = await loadExercisesCollection();
    res.send(await exercises.find({
        completed: false
    }).toArray());
});

// Add exercises
router.post('/', async (req, res) => {
    const exercises = await loadExercisesCollection();
    await exercises.insertOne({
        task: req.body.task,
        deadline: req.body.deadline,
        completed: false,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete exercises
router.delete('/:id', async (req, res) => {
    const exercises = await loadExercisesCollection();
    await exercises.deleteOne({
        _id: new ObjectID(req.params.id)
    });
    res.status(200).send();
});

// Update exercises
router.put('/:id', async (req, res) => {
    const exercises = await loadExercisesCollection();
    await exercises.replaceOne({
        _id: new ObjectID(req.params.id)
    }, {
        task: req.body.task,
        deadline: req.body.deadline,
        completed: false,
        createdAt: new Date()
    });
    res.status(200).send();
});

//Update Completed Status
router.patch('/:id', async (req, res) => {
    const exercises = await loadExercisesCollection();
    await exercises.updateOne({
        _id: new ObjectID(req.params.id)
    }, {
        $set: {
            completed: req.body.completed,
            completedAt: new Date()
        },
    });
    res.status(200).send();
});


    mongo.connect(
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
          exercises = db.collection("exercises");
        }
      )

module.exports = router;