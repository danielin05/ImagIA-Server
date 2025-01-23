const { DataTypes } = require('sequelize');
const sequelize = require('../../../sequelize');

const Request = sequelize.define('Request', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  prompt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stream: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'requests',
  timestamps: true,
});

module.exports = Request;
