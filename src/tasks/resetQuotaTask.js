const { User } = require('../bbdd/models');
const { Sequelize } = require('sequelize');

async function resetQuotaTask() {
    try {
        await User.update(
            { availableQuota: Sequelize.col('limitQuota') },
            { where: {} }
        );
    } catch (error) {
        console.error('Update failed:', error);
    }
}

module.exports = resetQuotaTask