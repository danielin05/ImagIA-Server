const { DataTypes } = require('sequelize');
const sequelize = require('../../../sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  phone: {
    type: DataTypes.INTEGER,
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
    allowNull: false,
  },
  limitQuota: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availableQuota: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
