const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');


class Tag extends Model { }

Tag.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  color: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'tag'
});

module.exports = Tag; 