const Story = require('./Story');
const Content = require('./Content');
const Post = require('./Post');
const User = require('./User');

Content.belongsTo(Story, {
  foreignKey:'story_id'
});

Story.hasMany(Content, {
  foreignKey: 'story_id'
});

Post.belongsTo(Story, {
  foreignKey: 'story_id'
});

Story.hasMany(Post, {
  foreignKey: 'story_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Post, {
  foreignKey: 'user_id'
});

module.exports = { Story, Content, Post, User };