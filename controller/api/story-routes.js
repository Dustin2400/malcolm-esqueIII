const router = require('express').Router();
const { Story, Content, Post, User } = require('../../models');

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
  .then(dbStoryData => {
    res.json(dbStoryData);
  })
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
    name: req.body.name,
    image_url: req.body.image_url
  })
  .then(dbStoryData => res.json(dbStoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/', (req, res) => {
  Story.update({
    title: req.body.title,
    subtitle: req.body.subtitle,
    name: req.body.name,
    image_url: req.body.image_url
  },
  {
    where: {
      id: req.body.id
    }
  })
  .then(dbStoryData => res.json(dbStoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  Story.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbStoryData => res.json(dbStoryData))
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  }) 
})

module.exports = router;