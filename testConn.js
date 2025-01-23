// COMPROBAR QUE SE CONECTA 

const sequelize = require('./sequelize'); // Now directly the instance

(async () => {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log('Connection established successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
})();
