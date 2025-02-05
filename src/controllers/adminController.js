const { User } = require('../bbdd/models');

function loginAdmin(req, res) {
    console.log('Login admin');
    const startTime = Date.now();

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
        attributes: ['nickname', 'password', 'apiKey'],
        where: {
            isAdmin: true, // Ensure the user is an admin
            nickname: username // Replace 'username' with the actual field name if necessary
        }
        }).then(user => {
            if (user) {
                if (user.password === password) {
                    console.log('User found and password is correct');
                    res.status(200).send({
                        status: 'success',
                        message: 'Login successful',
                        data: {
                            apiKey: user.apiKey,
                        },
                        time: Date.now() - startTime
                    });
                } else {
                    console.log('Password is incorrect');
                    res.status(401).send({
                        status: 'error',
                        message: 'Invalid username or password'
                    });
                }
            } else {
                console.log('User not found');
                res.status(401).send({
                    status: 'error',
                    message: 'Invalid username or password'
                });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                status: 'error',
                message: 'Internal server error',
                error: error
            });
        });
}

function getUsers(req,res) {
    User.findAll({where: {isAdmin: false}}).then(users => {
        res.status(200).send({
            status: 'success',
            message: 'Users retrieved successfully',
            data: users
        })
    }).catch(error => {
        console.log(error)
        res.status(500).send({
            status: 'error',
            message: 'Internal Server Error',
            error: error
        })
    })
}

function changePlan(req,res) {
    const apiKeyToken = req.headers['authorization'].split(' ')[1]
    const userId = req.body.id
    User.update({
        planning: req.body.plan
    },
    {
        where:{
            id: userId
        }
    })
    .then(user=>{
        res.status(200).send({
            status: 'success',
            message: 'Plan changed successfully',
            data: {}
        })
    })
    .catch(error=>{
        console.log(error)
        res.status(500).send({
            status: 'error',
            message: 'Internal Server Error',
            error: error
        })
    })
}

module.exports = { loginAdmin, getUsers, changePlan }

