const { DataTypes } = require('sequelize');
const sequelize = require('../../../sequelize');

const Image = sequelize.define('Image', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'images',
  timestamps: true,
});

module.exports = Image;
