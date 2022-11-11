const {DateTime} = require('luxon');

module.exports = date => DateTime.fromISO(new Date(date).toISOString()).toFormat("MMM d, yyyy 'at' h:mm a");

// const dateFormat = date => DateTime.fromISO(new Date(date).toISOString()).toFormat("MMM d, yyyy 'at' h:mm a");
// console.log(dateFormat(new Date()));