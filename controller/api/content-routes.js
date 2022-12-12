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

// router.get('/:story_id', (req, res) => {
//   Content.findOne({
//     where: {
//       story_id: res.params.story_id
//     }
//   })
//   .then(dbContentData => res.json(dbContentData))
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   })
// });

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

module.exports = router