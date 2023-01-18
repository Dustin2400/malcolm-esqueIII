const router = require('express').Router();
const { Post, User, Story}= require('../../models');

router.get('/', (req, res) => {
  Post.findAll()
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  Story.findOne({
    where: {
      name: req.body.storyName
    }
  })
  .then(dbStoryData => {
    const story = dbStoryData.get({ plain: true });
    Post.create({
      post_text: req.body.postText,
      user_id: req.session.user_id,
      story_id: story.id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Post.update({
    post_text: req.body.post_text
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;