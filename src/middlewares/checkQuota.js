const { User } = require("../bbdd/models");

function checkQuota(req, res, next) {
    const apiKeyToken = req.headers['authorization'].split(' ')[1]
    User.findOne({
        attributes: ['availableQuota'],
        where: {
            apiKey: apiKeyToken
        }
    }).then(user => {
        if (user.availableQuota <= 0) {
            logCreation("ERROR", `You have reached your image limit`, "analitzar-imatge", false);
            return res.status(402).send({
                status: 'error',
                message: 'You have reached your image limit'
            });
        }

        logCreation("Check Quota", `Checked the actual available quota`, "analitzar-imatge", false);
        next();
    })
}

module.exports = checkQuota;