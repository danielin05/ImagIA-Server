const sequelize = require('./sequelize');
const { User, Request, Image } = require('./src/bbdd/models/index');

// Aquí tu lógica para crear usuario, petición e imágenes


(async () => {
  try {
    // Crear un nuevo usuario
    const newUser = await User.create({
      phone: 123456789, // Número de teléfono ficticio
      nickname: 'PruebaEndPoint',
      email: 'PruebaEndPoint@example.com',
    });

    console.log('Usuario creado:', newUser.toJSON());

    console.log('Operación completada exitosamente.');
  } catch (error) {
    console.error('Error:', error);
  }
})();

