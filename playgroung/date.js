var moment = require('moment');

// Jan 1st 1970 00:00:00 am
// var date = new Date();
// // print range 0-11
// console.log(date.getMonth());
var date = moment();
console.log(date.format('Do MMM YYYY hh:mm:ss a'));
console.log(date.format('ddd hA'));
console.log(date.format('h:mm a'));