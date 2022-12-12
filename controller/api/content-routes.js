const router = require('express').Router();
const { Content }= require('../../models');

router.get('/', (req, res) => {
  Content.findAll()
  .then(dbContentData => res.json(dbContentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  Content.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbContentData => res.json(dbContentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  Content.create({
    type: req.body.type,
    text: req.body.text,
    url: req.body.url,
    story_id: req.body.story_id
  })
  .then(dbContentData => res.json(dbContentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  Content.update({
    type: req.body.type,
    text: req.body.text,
    url: req.body.url
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(dbContentData => res.json(dbContentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router