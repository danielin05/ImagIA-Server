const { DataTypes } = require('sequelize');
const sequelize = require('../../../sequelize');

const Image = sequelize.define('Image', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  base64: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'images',
  timestamps: true,
});

module.exports = Image;
