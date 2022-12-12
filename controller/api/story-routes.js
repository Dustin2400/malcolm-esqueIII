const router = require('express').Router();
const { Story, Content, Post } = require('../../models');

router.get('/', (req, res) => {
  Story.findAll()
  .then(dbStoryData => res.json(dbStoryData))
  .catch(err => {
    res.status(500).json(err);
  });
});

router.get('/:name', (req, res) => {
  Story.findOne({
    where: {
      name: req.params.name
    },
    include: [
      {
        model: Content,
        attributes: ['id', 'type', 'text', 'url']
      }
    ]
  })
  .then(dbStoryData => res.json(dbStoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/byId/:id', (req, res) => {
  Story.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbStoryData => res.json(dbStoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  Story.create({
    title: req.body.title,
    subtitle: req.body.subtitle,
    name: req.body.name
  })
  .then(dbStoryData => res.json(dbStoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;