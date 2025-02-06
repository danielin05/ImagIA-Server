const { generateKey } = require('../middlewares/ApiKeyGenerator');
const User = require('../bbdd/models/user');
const generateSMSCode = require('../middlewares/SMSCodeGenerator');
const logCreation = require('../middlewares/logsCreation');

const { SMSApiToken, SMSUrl, SMSUsername } = require('../config/config');
const axios = require('axios');

async function registerUser(req, res, next) {
    console.log('Registering User');
    const startTime = Date.now();

    try {
        // Crear un nuevo usuario
        const newUser = await User.create({
          phone: req.body.phone, // Número de teléfono ficticio
          nickname: req.body.nickname,
          email: req.body.email,
        });
    
        logCreation("Change Plan", "Plan changed successfully", "usuaris/login", true);
        res.status(200).send({
            status: "Success",
            message: "User created correctly",
            data: {
                phone: req.body.phone,
                nickname: req.body.nickname,
                email: req.body.email
            }
        })
        next()
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

async function sendSMS(req, res) {
    console.log('Processing SMS request...');

    const phone = req.body.phone;
    const code = generateSMSCode()
    const text = `El codi de verificació es: ${code}`
    try {
        User.findOne({
            where: {
                phone: phone
            }
        }).then(user => {
            if (user) {
                user.smsCode = code
                user.save()
                console.log(`Sending SMS to ${phone}: "${text}"`);
                const url = `${SMSUrl}?&api_token=${SMSApiToken}&username=${SMSUsername}&text=${text}&receiver=${phone}`
                console.log(url)
                axios.get(url)
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
}

module.exports = { registerUser, validSMSCode, sendSMS };