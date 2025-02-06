const { DataTypes } = require('sequelize');
const sequelize = require('../../../sequelize');

const Log = sequelize.define('log', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tag: {
    type: DataTypes.TEXT(),
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT(),
    allowNull: false,
  },
  endpoint: {
    type: DataTypes.TEXT(),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'logs',
  timestamps: true,
});

module.exports = Log;
