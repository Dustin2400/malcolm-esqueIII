const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            alloqNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        postText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        user_id: {
            type: DataTypes.INTEGER,
            refernces: {
                model: 'user',
                key: 'id'
            }
        },
        story_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'story',
            key: 'id'
          }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;