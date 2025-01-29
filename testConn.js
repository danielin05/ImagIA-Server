// COMPROBAR QUE SE CONECTA 

const { sequelize } = require('./src/bbdd/models/index'); // Extrae sequelize correctamente

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
