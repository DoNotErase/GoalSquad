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
module.exports.getUserByID = async (fitbitID) => {
  try {
    return await db.queryAsync(`SELECT * FROM user WHERE user_id = '${fitbitID}'`);
  } catch (e) {
    return e;
  }
};

module.exports.userExists = async (fitbitID) => {
  const query = `SELECT * FROM user WHERE user_id = '${fitbitID}';`;

  try {
    const user = await db.queryAsync(query);
    if (user.length === 0) {
      return false;
    }
    return true;
  } catch (e) {
    return e;
  }
};

module.exports.updateTokens = async (fitbitID, accessToken, refreshToken) => {
  const query = `UPDATE user SET user_accesstoken = '${accessToken}', user_refreshtoken = '${refreshToken}' ` +
    `WHERE user_id = '${fitbitID}';`;

  try {
    return await db.queryAsync(query);
  } catch (e) {
    return e;
  }
};

module.exports.createUser = async (fitbitID, displayName, accessToken, refreshToken) => {
  const query = 'INSERT INTO user (user_id, user_username, user_accesstoken, user_refreshtoken) ' +
    `VALUES ('${fitbitID}', '${displayName}', '${accessToken}', '${refreshToken}');`;

  try {
    return await db.queryAsync(query);
  } catch (e) {
    return e;
  }
};

module.exports.getAccessToken = async (fitbitID) => {
  try {
    const data = await db.queryAsync(`SELECT user_accesstoken FROM user WHERE user_id = '${fitbitID}';`);
    return data[0].user_accesstoken;
  } catch (e) {
    return e;
  }
};
