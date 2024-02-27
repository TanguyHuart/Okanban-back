const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class List extends Model { }

List.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'list'
});

module.exports = List; 