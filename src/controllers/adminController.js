const { User } = require('../bbdd/models');
const Log = require('../bbdd/models/logs');
const logCreation = require('../middlewares/logsCreation');
const { Op, Sequelize } = require('sequelize');

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

                    logCreation("Login", "Login succesful", "usuaris/login", true);

                } else {
                    console.log('Password is incorrect');
                    res.status(401).send({
                        status: 'error',
                        message: 'Invalid  password'
                    });

                    logCreation("ERROR", "Login failed (Invalid password", "usuaris/login", false);
                }
            } else {
                console.log('User not found');
                res.status(401).send({
                    status: 'error',
                    message: 'User not found'
                });

                logCreation("ERROR", "Login failed (User not found", "usuaris/login", false);
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                status: 'error',
                message: 'Internal server error',
                error: error
            });

            logCreation("ERROR", "Internal server error", "usuaris/login", false);
        });
}

function getUsers(req,res) {
    User.findAll({where: {isAdmin: false}}).then(users => {
        res.status(200).send({
            status: 'success',
            message: 'Users retrieved successfully',
            data: users
        })
        
        logCreation("Find Users", "Users retrieved successfully", "usuaris/login", true);
    }).catch(error => {
        console.log(error)
        res.status(500).send({
            status: 'error',
            message: 'Internal Server Error',
            error: error
        })
        
        logCreation("ERROR", "Internal server error", "usuaris/login", false);
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

        logCreation("Change Plan", "Plan changed successfully", "usuaris/login", true);
    })
    .catch(error=>{
        console.log(error)
        res.status(500).send({
            status: 'error',
            message: 'Internal Server Error',
            error: error
        })

        logCreation("ERROR", "Internal server error", "usuaris/login", false)
    })
}

function getLogs(req,res) {
    const messageFilter = req.body.messageFilter
    const tagFilter = req.body.tagFilter
    Log.findAll({
        where: {
            message: {
                [Op.like]: `%${messageFilter}%`
            },
            tag: {
                [Op.like]: `%${tagFilter}%`
            }
        }
    }).then(logs => {
        res.status(200).send({
            status: 'success',
            message: 'Logs retrieved successfully',
            data: logs
        })
        logCreation("Get Logs", "Logs retrieved successfully", "logs/list", true);
    }).catch(error=>{
        console.log(error)
        res.status(500).send({
            status: 'error',
            message: 'Internal Server Error',
            error: error
        })
        logCreation("ERROR", "Internal Server Error", "logs/list", false);
    })
}

function getRequests(req,res) {
    Log.findAll({
        attributes: [
          "tag",
          [Sequelize.fn("COUNT", Sequelize.col("*")), "total"]
        ],
        where: {
          createdAt: {
            [Op.gt]: Sequelize.literal("NOW() - INTERVAL 1 HOUR")
          }
        },
        group: ["tag"],
        order: [[Sequelize.literal("total"), "DESC"]]
      }).then(requests => {
        res.status(200).send({
            status: 'success',
            message: 'Requests retrieved successfully',
            data: requests
        })
        logCreation("Get Requests", "Requests retrieved successfully", "request/list", true);
    }).catch(error=>{
        console.log(error)
        res.status(500).send({
            status: 'error',
            message: 'Internal Server Error',
            error: error
        })
        logCreation("ERROR", "Internal Server Error", "request/list", false);
    })
}

module.exports = { loginAdmin, getUsers, changePlan, getLogs, getRequests };

