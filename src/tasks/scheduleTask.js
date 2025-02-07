
function scheduleTask(taskFunction, intervalHours = 24) {
    taskFunction();
    setInterval(taskFunction, intervalHours * 60 * 60 * 1000);
}

module.exports = scheduleTask



