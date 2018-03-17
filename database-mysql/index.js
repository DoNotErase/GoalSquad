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

module.exports.getUserGoals = async (fitbitID) => {
  try {
    const query = 'SELECT user_goal.user_goal_start_value, user_goal.user_goal_target, ' +
      'user_goal.user_goal_start_date, user_goal.user_goal_end_date, user_goal.user_goal_achieved, ' +
      'goal.goal_activity, goal.goal_amount, goal.goal_difficulty ' +
      'FROM user_goal INNER JOIN goal ON goal.goal_id = user_goal.goal_id ' +
      `WHERE user_goal.user_id = '${fitbitID}';`;

    return await db.queryAsync(query);
  } catch (err) {
    return err;
  }
};

module.exports.getGoalInfo = async (goalID) => {
  try {
    const query = `SELECT * FROM goal WHERE goal_id = ${goalID}`;

    return await db.queryAsync(query)[0];
  } catch (err) {
    return err;
  }
};

module.exports.createUserGoal = async (goalObj) => {
  try {
    const query = 'INSERT INTO user_goal (user_id, goal_id, user_goal_start_value, user_goal_current, ' +
      'user_goal_target, user_goal_points) VALUES ' +
      `(${goalObj.userID}, ${goalObj.goalID}, ${goalObj.startValue}, ${goalObj.targetValue}, ${goalObj.points}`;

    await db.queryAsync(query);

    if (goalObj.goalLength) {
      const setEndDate = 'UPDATE user_goal SET user_goal_end_date = ' +
        '(SELECT DATE_ADD((SELECT DATE_ADD((SELECT MAX(user_goal_start_date)), ' +
        `INTERVAL ${goalObj.goalLength.day} DAY)), ` +
        `INTERVAL ${goalObj.goalLength.hour} HOUR)) ` +
        'WHERE user_goal_id = (SELECT MAX(user_goal_id));';

      return await db.queryAsync(setEndDate);
    }
    return '';
  } catch (err) {
    return err;
  }
};
