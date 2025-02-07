const { log } = require('winston');
const { User } = require('../bbdd/models');
const { sequelize } = require('sequelize');

async function resetQuotaTask() {
    try {
        await User.update(
            { availableQuota: sequelize.col('limitQuota') },
            { where: {} }
        );
    } catch (error) {
        console.error('Update failed:', error);
    }
}

module.exports = resetQuotaTask