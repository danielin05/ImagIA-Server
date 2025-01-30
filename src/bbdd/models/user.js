const { DataTypes } = require('sequelize');
const sequelize = require('../../../sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  planning: {
    type: DataTypes.STRING,
    defaultValue: "Free",
  },
  limitQuota: {
    type: DataTypes.INTEGER,
    defaultValue: 20,
  },
  availableQuota: {
    type: DataTypes.INTEGER,
    defaultValue: 20,
  },
  validated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  apiKey: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
