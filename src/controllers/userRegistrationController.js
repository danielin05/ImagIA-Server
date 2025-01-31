const { User } = require('../bbdd/models/user');

async function registerUser(req, res) {
    console.log('Registering User');
    const startTime = Date.now();

    try {
        // Crear un nuevo usuario
        const newUser = await User.create({
          phone: req.body.phone, // Número de teléfono ficticio
          nickname: req.body.nickname,
          email: req.body.email,
        });
    
        console.log('Usuario creado:', newUser.toJSON());
        res.status(200).send({
            status: "Success",
            message: "User created correctly",
            data: {
                phone: req.body.phone,
                nickname: req.body.nickname,
                email: req.body.email
            }
        })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({
            status: "ERROR",
            message: "Error trying to create the user",
        })
    }    
}


module.exports = { registerUser };