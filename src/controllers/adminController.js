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
    }).catch(error=>{
        console.log(error)
        res.status(500).send({
            status: 'error',
            message: 'Internal Server Error',
            error: error
        })
    })
}

function getRequests(req,res) {
    //get the request count and tag made in the last hour
    //SELECT count(*) as total, tag FROM logs WHERE createdAt > now() - interval '1 hour' GROUP BY tag ORDER BY total DESC
    LLogs.findAll({
        attributes: [
          "tag",
          [Sequelize.fn("COUNT", Sequelize.col("*")), "total"]
        ],
        where: {
          createdAt: {
            [Op.gt]: Sequelize.literal("NOW() - INTERVAL '1 HOUR'")
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
    }).catch(error=>{
        console.log(error)
        res.status(500).send({
            status: 'error',
            message: 'Internal Server Error',
            error: error
        })
    })
}

module.exports = { loginAdmin, getUsers, changePlan, getLogs };

