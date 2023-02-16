const router = require('express').Router();;
const { User, Post } = require('../../models');

router.get('/', (req, res) => {
  User.findAll()
  .then(dbUserData => res.json(dbUserData))
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(dbUserData => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      res.json(dbUserData);
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(dbUserData => {
      if (!dbUserData) {
          res.status(400).json({ message: 'No username found!' });
          return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);
      console.log(validPassword);
      if(!validPassword) {
          res.status(400).json({ message: 'Wrong password!' });
          return;
      }

      req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;

          res.json({ user: dbUserData, message: 'You are logged in!'});
      });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  })
});

router.post('/checkPassword/:id', (req, res) => {
  User.findOne({
    where: {
        id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
        res.status(400).json({ message: 'No username found!' });
        return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);
    if(!validPassword) {
        res.json({ valid: false });
        return;
    }
    res.json({ valid: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/change-password', (req, res) => {
  User.update({
    password: req.body.password
  },
  {
    where: {
      id: req.body.id
    },
    individualHooks: true
  })
  .then(dbUserData => {
    console.log(dbUserData);
    res.json(dbUserData)
  })  
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/', (req, res) => {
  User.destroy({
    where: {
      id: req.session.user_id
    }
  })
  .then(dbUserData => {
    if(!dbUserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    req.session.destroy(() => {
      res.json(dbUserData);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})

module.exports = router;