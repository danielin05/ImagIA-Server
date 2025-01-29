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

    // Crear una nueva petición asociada al usuario
    const newRequest = await Request.create({
      prompt: 'Genera una imagen de ejemplo',
      stream: true,
      userId: newUser.id, // Relacionamos la petición con el usuario recién creado
    });

    console.log('Petición creada:', newRequest.toJSON());

    // Crear 4 imágenes asociadas a la petición
    const images = await Image.bulkCreate([
      { image: 'img1.jpg', requestId: newRequest.id },
      { image: 'img2.jpg', requestId: newRequest.id },
      { image: 'img3.jpg', requestId: newRequest.id },
      { image: 'img4.jpg', requestId: newRequest.id },
    ]);

    console.log('Imágenes creadas:', images.map((img) => img.toJSON()));

    console.log('Operación completada exitosamente.');
  } catch (error) {
    console.error('Error:', error);
  }
})();

