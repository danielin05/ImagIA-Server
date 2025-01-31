const { User, Request, Image } = require('../bbdd/models/index');
const { generateKey } = require('../middlewares/ApiKeyGenerator');

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

function validSMSCode(req,res) {
    console.log('Validing SMS Code')
    
    const code = req.body.codi
    const phone = req.body.phone

    // get the code from the database
    User.findOne({
        where: {
            phone: phone,
            smsCode: code
        }
    }).then(user => {
        if (user) {
            console.log('Code is valid')
            // set valid to true
            const apiKey = generateKey()
            user.validated = true
            user.smsCode = null
            user.apiKey = apiKey
            user.save()
            res.status(200).send({
                status: 'success',
                message: 'Code is valid',
                data: {
                    apiKey: apiKey
                }
            })
        } else {
            console.log('Code is invalid')
            user.smsCode = null
            user.save()
            res.status(401).send({
                status: 'error',
                message: 'Code is invalid'
            })
        }
    })
}

module.exports = { registerUser, validSMSCode };