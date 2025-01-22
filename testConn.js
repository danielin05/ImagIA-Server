// ESTE ARCHIVO COMPRUEBA QUE ESTE BIEN HECHA LA CONEXION CON LOS CONSOLE.LOG Y SINCRONIZA EL MODELO src/bbdd/models/user PARA CREAR LA TABLA DE PRUEBA

// LA TABLA USERS TAL Y CUAL ESTA DEFINIDA EN EL MODELO NO SE TIENE QUE USAR ES SOLAMENTE UNA PRUEBA

const sequelize = require('./sequelize'); // Now directly the instance
const User = require('./src/bbdd/models/user');

(async () => {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log('Connection established successfully.');

    // Sync the model (create the table if it doesn't exist)
    await User.sync(); // Use { force: true } to drop and recreate the table
    console.log('User table created successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
})();
