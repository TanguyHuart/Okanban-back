/* eslint-disable no-undef */

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Card extends Model { }

Card.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  color: {
    type: DataTypes.TEXT,
    defaultValue: 'white',
    allowNull: true
  },
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'card'
});

module.exports = Card;
