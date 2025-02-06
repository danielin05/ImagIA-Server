const sequelize = require('../../../sequelize'); // Instancia de Sequelize
const User = require('./user');
const Request = require('./request');
const Image = require('./images');
const Log = require('./logs');

// Definir asociaciones
User.hasMany(Request, { foreignKey: 'userId', as: 'requests' });
Request.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Request.hasMany(Image, { foreignKey: 'requestId', as: 'images' });
Image.belongsTo(Request, { foreignKey: 'requestId', as: 'request' });

module.exports = {
  sequelize,
  User,
  Request,
  Image,
  Log
};
