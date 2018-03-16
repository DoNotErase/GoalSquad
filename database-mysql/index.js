const mysql = require('mysql');
const config = require('../config');
const Promise = require('bluebird');
// needed for mysql
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

const db = mysql.createConnection({
  host: config.aws.RDS_HOSTNAME,
  user: config.aws.RDS_USERNAME,
  password: config.aws.RDS_PASSWORD,
  port: config.aws.RDS_PORT,
  database: 'goalsquad',
});

// test function for example
const findUserId = async () => {
  try {
    const result = await db.queryAsync('SELECT * FROM user');
    console.log(result);
    return result;
  } catch (e) {
    return e;
  }
};

module.exports = {
  db,
  findUserId,
};
