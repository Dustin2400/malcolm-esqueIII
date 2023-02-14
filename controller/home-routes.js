const { Story, Content, User, Post } = require('../models');
const isMalcolm = require('../utils/auth');

const router = require('express').Router();

router.get('/', (req, res) => {
  Story.findAll({
    order: [
      ['id', 'DESC']
    ]
  })
  .then(dbStoryData => {
    const stories = dbStoryData.map(story => story.get({ plain: true }));
    if (req.session.user_id == 1) {
      var isMalcolm = true;
    }
    res.render('home', {
      stories,
      loggedIn: req.session.loggedIn,
      isMalcolm
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
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
      },
      {
        model: Post,
        attributes: ['id', 'post_text', 'createdAt'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
  .then(dbStoryData => {
    const story = dbStoryData.get({ plain: true });
    if (req.session.user_id == 1) {
      var isMalcolm = true;
    }
    res.render('story', {
      story,
      loggedIn: req.session.loggedIn,
      isMalcolm
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/add-story', isMalcolm, (req, res) => {
  res.render('add-story')
});

router.get('/edit-story/:name', isMalcolm, (req, res) => {
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
    res.render('edit-story', {
      story,
      loggedIn: req.session.loggedIn
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/add-content/:name', isMalcolm, (req, res) => {
  Story.findOne({
    where: {
      name: req.params.name
    }
  })
  .then(dbStoryData => {
    const story = dbStoryData.get({ plain: true });
    res.render('add-content', {
      story,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/edit-content/:id', isMalcolm, (req, res) => {
  Content.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbContentData => {
    const content = dbContentData.get({ plain: true });
    res.render('edit-content', {
      content,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/delete-content/:id', isMalcolm, (req, res) => {
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
          story,
          loggedIn: req.session.loggedIn
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

router.get('/register', (req, res) => {
  res.render('register')
});

router.get('/register-error/:error', (req, res) => {
  var username = false;
  var email = false;
  var password = false;
  if (req.params.error == 'username') {
    username = true;
  }
  if (req.params.error == 'email') {
    email = true;
  }
  if (req.params.error == 'password') {
    password = true;
  }
  res.render('register', {
    username,
    email,
    password
  });
});

router.get('/login', (req, res) => {
  res.render('login')
});

router.get('/login/error', (req, res) => {
  res.render('login', {
    invalid: true
  })
});

router.get('/dashboard', (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'post_text', 'createdAt'],
        include: {
          model: Story,
          attributes: ['title']
        }
      }
    ]
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id'});
      return;
    }
    const user = dbUserData.get({ plain: true });
    res.render('dashboard', {
      user,
      loggedIn: req.session.loggedIn
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/edit-comment/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No comment found with that id'});
      return;
    }
    const post = dbPostData.get({ plain: true });
    res.render('edit-comment', {
      post,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/delete-comment/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No comment found with that id'});
      return;
    }
    
    User.findOne({
      where: {
        id: req.session.user_id
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'post_text', 'createdAt'],
          include: {
            model: Story,
            attributes: ['title']
          }
        }
      ]
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id'});
        return;
      }
      const user = dbUserData.get({ plain: true });
      res.render('dashboard', {
        user,
        loggedIn: req.session.loggedIn
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
});

router.get('/changePassword/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id'});
      return
    }
    const user = dbUserData.get({ plain: true });
        res.render('change-password', {
            user,
            loggedIn: true
        });
  })
});

router.get('/change-password-error/:error/:id', (req, res) => {
  var invalid = false;
  var password = false;
  var mismatch = false;
  if (req.params.error == 'invalid') {
    invalid = true;
  }
  if (req.params.error == 'password') {
    password = true;
  }
  if (req.params.error == 'mismatch') {
    mismatch = true;
  }
  res.render('change-password', {
    invalid,
    password,
    mismatch
  });
})

router.get('/cancellation', (req, res) => {
  res.render('cancellation');
});

module.exports = router;