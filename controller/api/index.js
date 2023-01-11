const router = require('express').Router();
const storyRoutes = require('./story-routes.js');
const contentRoutes = require('./content-routes.js');
const userRoutes = require('./user-routes');

router.use('/stories', storyRoutes);
router.use('/content', contentRoutes);
router.use('/users', userRoutes);

module.exports = router;