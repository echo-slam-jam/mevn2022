const express = require('express');
const mongo = require("mongodb");
const router = express.Router();
const url = "mongodb://localhost:27017";

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
      exercises = db.collection("exercises");
    }
  )
  
// Get exercises
router.get('/', async (req, res) => {
    exercises.find().toArray((err, items) => {
        if (err) {
          console.error(err)
          res.status(500).json({ err: err })
          return
        }
        res.status(200).json({ exercises: items })
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
        achieved: false,
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