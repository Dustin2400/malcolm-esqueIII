const router = require('express').Router();
const storyRoutes = require('./story-routes.js');
const contentRoutes = require('./content-routes.js');

router.use('/stories', storyRoutes);
router.use('/content', contentRoutes);

module.exports = router;