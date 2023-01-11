const { Story, Content, User } = require('../models');

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
      stories,
      loggedIn: req.session.loggedIn
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
      story,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
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
      story,
      loggedIn: req.session.loggedIn
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
      story,
      loggedIn: req.session.loggedIn
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
      content,
      loggedIn: req.session.loggedIn
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
  })
});

router.get('/login', (req, res) => {
  res.render('login')
});

router.get('/dashboard', (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id'});
      return;
    }

    const user = dbUserData.get({ plain: true }) ;
    res.render('dashboard', {
      user,
      loggedIn: req.session.loggedIn
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;