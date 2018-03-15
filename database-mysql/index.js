var mysql = require('mysql');
var config = require('../config');

var connection = mysql.createConnection({
  host: config.aws.RDS_HOSTNAME,
  user: config.aws.RDS_USERNAME,
  password: config.aws.RDS_PASSWORD,
  port: config.aws.RDS_PORT,
  database : 'goalsquad'
});

// var connection = mysql.createConnection({
//   host: process.env.RDS_HOSTNAME,
//   user: process.env.RDS_USERNAME,
//   password: process.env.RDS_PASSWORD,
//   port: process.env.RDS_PORT
// });

var selectAll = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectAll = selectAll;
