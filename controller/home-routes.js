const { Story } = require('../models');

const router = require('express').Router();

router.get('/', (req, res) => {
  Story.findAll()
  .then(dbStoryData => {
    const stories = dbStoryData.map(story => story.get({ plain: true }));
    res.render('home', {
      stories
    });
  });
});

router.get('/story/:name', (req, res) => {
  Story.findOne({
    where: {
      name: req.params.name
    }
  })
  .then(dbStoryData => {
    const story = dbStoryData.get({ plain: true });

    res.render('story', {
      story
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/add-story', (req, res) => {
  res.render('add-story')
});

router.get('/edit-story/:name', (req, res) => {
  Story.findOne({
    where: {
      name: req.params.name
    }
  })
  .then(dbStoryData => {
    const story = dbStoryData.get({ plain: true });
    res.render('edit-story', {
      story
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/add-content/:name', (req, res) => {
  Story.findOne({
    where: {
      name: req.params.name
    }
  })
  .then(dbStoryData =>{
    const story = dbStoryData.get({ plain: true });
    res.render('add-content', {
      story
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})

module.exports = router;