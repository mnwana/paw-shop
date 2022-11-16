
const {DateTime} = require('luxon');

module.exports = date => DateTime.fromISO(new Date(date).toISOString()).toFormat("MMM d, yyyy 'at' h:mm a");