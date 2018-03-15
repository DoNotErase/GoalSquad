const mysql = require('mysql');
const config = require('../config');
const Promise = require('bluebird');
//needed for mysql
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const connection = mysql.createConnection({
  host: config.aws.RDS_HOSTNAME,
  user: config.aws.RDS_USERNAME,
  password: config.aws.RDS_PASSWORD,
  port: config.aws.RDS_PORT,
  database : 'goalsquad'
});


module.exports.selectAll = selectAll;
