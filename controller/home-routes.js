const { Story, Content } = require('../models');

const router = require('express').Router();

router.get('/', (req, res) => {
  Story.findAll(
    // {
    //   include: [
    //     {
    //       model: Content,
    //       attributes: ['url']
    //     }
    //   ]
    // }
  )
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
    },
    include: [
      {
        model: Content,
        attributes: ['type', 'text', 'url']
      }
    ]
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
    },
    include: [
      {
        model: Content,
        attributes: ['id', 'type', 'text', 'url']
      }
    ]
  })
  .then(dbStoryData => {
    const story = dbStoryData.get({ plain: true });
    console.log(story);
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
  .then(dbStoryData => {
    const story = dbStoryData.get({ plain: true });
    res.render('add-content', {
      story
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/edit-content/:id', (req, res) => {
  Content.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbContentData => {
    const content = dbContentData.get({ plain: true });
    res.render('edit-content', {
      content
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/delete-content/:id', (req, res) => {
  Content.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbContentData => {
    const content = dbContentData.get({ plain: true });
    Content.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbContentData2 => {
      Story.findOne({
        where: {
          id: content.story_id
        },
        include: [
          {
            model: Content,
            attributes: ['id', 'type', 'text', 'url']
          }
        ]
      })
      .then(dbStoryData => {
        const story = dbStoryData.get({ plain: true })
        res.render('edit-story', {
          story
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })    
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;