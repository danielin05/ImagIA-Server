// COMPROBAR QUE SE CREAN LAS TABLAS

const { sequelize } = require('./src/bbdd/models/logs'); // Extrae sequelize correctamente


(async () => {
  try {

    await sequelize.sync({ force: true });

    // Connect to the database
    await sequelize.authenticate();
    console.log('Connection established successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
})();
