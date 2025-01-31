const { DataTypes } = require('sequelize');
const sequelize = require('../../../sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  phone: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  nickname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  planning: {
    type: DataTypes.STRING(50),
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
  password: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: null,
  },
  apiKey: {
    type: DataTypes.STRING(16),
    allowNull: true,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
