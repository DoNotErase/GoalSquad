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
}

module.exports.userExists = async (fitbitID) => {
  const query = `SELECT * FROM user WHERE user_id = '${fitbitID}';`;

  const user = await db.query(query);
  if (user.length === 0) {
    return false;
  }
  return true;
};

module.exports.updateTokens = async (fitbitID, accessToken, refreshToken) => {
  const query = `UPDATE user SET user_accesstoken = '${accessToken}', user_refreshtoken = '${refreshToken}' ` +
    `WHERE user_id = '${fitbitID}';`;

  await db.query(query);
};

module.exports.createUser = async (fitbitID, displayName, accessToken, refreshToken) => {
  const query = 'INSERT INTO user (user_id, user_username, user_accesstoken, user_refreshtoken) ' +
    `VALUES ('${fitbitID}', '${displayName}', '${accessToken}', '${refreshToken}');`;

  await db.query(query);
};
