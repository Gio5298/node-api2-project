const express = require('express');

const Info = require('../data/db');

const router = express.Router();

router.use(express.json());

router.post('/', (req, res) => {
  const postInfo = req.body;
  if (!postInfo.title || !postInfo.contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    })
  } else {
    Info.insert(postInfo)
      .then(info => {
        res.status(201).json(info);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          errorMessage: 'There was an error while saving the post to the database'
        })
      })
  }
});

router.post('/:id/comments', (req, res) => {
  const commentInfo = req.body
  if (commentInfo.text === '') {
    res.status(400).json({
      errorMessage: "Please provide text for the comment."
    })
  } else {
    Info.insertComment(commentInfo)
      .then(post => {
        if (post) {
          res.status(201).json(post)
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "There was an error while saving the comment to the database"
        })
      })
  }
})

router.get('/', (req, res) => {
  Info.find()
    .then(info => {
      console.log('Info', info);
      res.status(200).json(info);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "The posts information could not be retrieved."
      })
    })
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Info.findById(id)
    .then(info => {
      if (!info) {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        })
      } else {
        res.status(200).json(info)
      }
    })
    .catch(errors => {
      console.log(error);
      res.status(500).json({
        errorMessage: "The post information could not be retrieved."
      })
    })
})

router.get('/:id/comments', (req, res) => {
  Info.findCommentById(id)
    .then(info => {
      if (!info) {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        })
      } else {
        res.status(200).json(info)
      }
    })
    .catch(errors => {
      console.log(error);
      res.status(500).json({
        errorMessage: "The comments information could not be retrieved."
      })
    })
});

router.delete("/:id", (request, response) => {
  db.findById(id)
    .then(info => {
      if (!info) {
        response.status(404).json({ 
          message: "The post with the specified ID does not exist." 
        })
      } else {
        db.remove(id)
          .then(deleted => {
            response.status(201).json({ 
              message: "Deletion successful", deleted 
            })
          })
      }
    })
    .catch(error => {
      response.status(500).json({ 
        error: "The post could not be removed." 
      })
    })
});

router.put('/:id', (req, res) => {
  const body = req.body
  Info.findById(id)
  .then(info => {
    if (!info){
      res.status(404).json({
        errorMessage: "The post with the specified ID does not exist."
      })
    } else if (!body.title || !body.comments){
      res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.'
      })
    } else {
      Info.update(id, body)
      .then(info => {
        res.status(200).json(info)
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
          errorMessage: "The post information could not be modified."
        })
      })
    }
  })
})

module.exports = router;