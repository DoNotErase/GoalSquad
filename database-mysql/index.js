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
    throw e;
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
    throw e;
  }
};

module.exports.updateTokens = async (fitbitID, accessToken, refreshToken) => {
  const query = `UPDATE user SET user_accesstoken = '${accessToken}', user_refreshtoken = '${refreshToken}' ` +
    `WHERE user_id = '${fitbitID}';`;

  try {
    return await db.queryAsync(query);
  } catch (e) {
    throw e;
  }
};

module.exports.createUser = async (fitbitID, displayName, accessToken, refreshToken) => {
  const query = 'INSERT INTO user (user_id, user_username, user_accesstoken, user_refreshtoken) ' +
    `VALUES ('${fitbitID}', '${displayName}', '${accessToken}', '${refreshToken}');`;

  try {
    return await db.queryAsync(query);
  } catch (e) {
    throw e;
  }
};

module.exports.getAccessToken = async (fitbitID) => {
  try {
    const data = await db.queryAsync(`SELECT user_accesstoken FROM user WHERE user_id = '${fitbitID}';`);
    return data[0].user_accesstoken;
  } catch (e) {
    throw e;
  }
};

module.exports.getUserGoals = async (fitbitID) => {
  try {
    const query = 'SELECT user_goal.*, goal.goal_name, goal.goal_activity, goal.goal_amount, goal.goal_difficulty ' +
      'FROM user_goal INNER JOIN goal ON goal.goal_id = user_goal.goal_id ' +
      `WHERE user_goal.user_id = '${fitbitID}';`;

    return await db.queryAsync(query);
  } catch (err) {
    throw new Error('trouble in getUserGoals');
  }
};

module.exports.getActiveUserGoals = async (fitbitID) => {
  try {
    const query = 'SELECT user_goal.*, goal.goal_name, goal.goal_activity, goal.goal_amount, goal.goal_difficulty ' +
      'FROM user_goal INNER JOIN goal ON goal.goal_id = user_goal.goal_id ' +
      `WHERE user_goal.user_id = '${fitbitID}' AND user_goal.user_goal_finalized = 0;`;

    return await db.queryAsync(query);
  } catch (err) {
    throw new Error('trouble in getActiveUserGoals');
  }
};

module.exports.getGoalInfo = async (goalID) => {
  try {
    const goal = await db.queryAsync(`SELECT * FROM goal WHERE goal_id = '${goalID}';`);
    return goal[0];
  } catch (err) {
    throw new Error('trouble in getGoalInfo');
  }
};

module.exports.createUserGoal = async (goalObj) => {
  try {
    const query = 'INSERT INTO user_goal (user_id, goal_id, user_goal_start_value, user_goal_current, ' +
      'user_goal_target, user_goal_points, user_goal_start_date) VALUES ' +
      `('${goalObj.userID}', ${goalObj.goalID}, ${goalObj.startValue}, ${goalObj.startValue}, ${goalObj.targetValue}, ${goalObj.points}, (utc_timestamp()));`;

    await db.queryAsync(query);
    const findGoalID = 'SELECT MAX(user_goal_id) as "goal_id" FROM user_goal';
    const goalID = await db.queryAsync(findGoalID);
    if (goalObj.goalLength) {
      const setEndDate = 'UPDATE user_goal SET user_goal_end_date = ' +
        '(SELECT DATE_ADD((SELECT DATE_ADD((SELECT MAX(user_goal_start_date)), ' +
        `INTERVAL ${goalObj.goalLength.days} DAY)), ` +
        `INTERVAL ${goalObj.goalLength.hours} HOUR)) ` +
        `WHERE user_goal_id = ${goalID[0].goal_id};`;

      await db.queryAsync(setEndDate);
    }
    return '';
  } catch (err) {
    throw new Error('trouble in createUserGoal');
  }
};

module.exports.createCustomGoal = async (goalObj) => {
  try {
    const createGoal = 'INSERT INTO goal (goal_name, goal_activity, ' +
      'goal_amount, goal_difficulty, goal_class, goal_points, goal_timedivisor) VALUES ' +
      `('${goalObj.goalName}', '${goalObj.goalActivity}', '${goalObj.goalAmount}', ` +
      '"custom", "custom", 20, 5);';

    await db.queryAsync(createGoal);

    const attachUser = 'INSERT INTO user_goal (user_id, goal_id, user_goal_start_value, user_goal_current, ' +
      'user_goal_target, user_goal_points, user_goal_start_date) VALUES ' +
      `('${goalObj.userID}', (SELECT MAX(goal_id) as goal_id FROM goal), 0, ` +
      `0, ${goalObj.goalAmount}, ${goalObj.points}, (utc_timestamp()));`;

    await db.queryAsync(attachUser);

    const findGoalID = 'SELECT MAX(user_goal_id) as "goal_id" FROM user_goal';
    const goalID = await db.queryAsync(findGoalID);

    if (goalObj.goalLength) {
      const setEndDate = 'UPDATE user_goal SET user_goal_end_date = ' +
        '(SELECT DATE_ADD((SELECT DATE_ADD((SELECT MAX(user_goal_start_date)), ' +
        `INTERVAL ${goalObj.goalLength.days} DAY)), ` +
        `INTERVAL ${goalObj.goalLength.hours} HOUR)) ` +
        `WHERE user_goal_id = (${goalID[0].goal_id});`;

      await db.queryAsync(setEndDate);
    }
    return '';
  } catch (err) {
    console.log(err);
    throw new Error('trouble in createUserGoal');
  }
};

module.exports.getDefaultGoals = async () => {
  try {
    const query = 'SELECT * FROM goal WHERE goal_class != "custom"';

    const allDefaultGoals = await db.queryAsync(query);
    const organizedDefaultGoals = {};
    allDefaultGoals.forEach((goal) => {
      if (!organizedDefaultGoals[goal.goal_activity]) {
        organizedDefaultGoals[goal.goal_activity] = [];
      }
      organizedDefaultGoals[goal.goal_activity].push(goal);
    });
    return organizedDefaultGoals;
  } catch (err) {
    throw err;
  }
};

module.exports.completeGoalSuccess = async (userGoalID) => {
  try {
    const updateGoal = `UPDATE user_goal SET user_goal_finalized = 1 WHERE user_goal_id = ${userGoalID}`;
    await db.queryAsync(updateGoal);
    const updateEgg = 'UPDATE user_egg SET egg_xp = (egg_xp + (SELECT user_goal_points FROM user_goal ' +
      `WHERE user_goal_id = ${userGoalID})) WHERE egg_hatched = 0 AND user_id = ` +
      `(SELECT user_id FROM user_goal WHERE user_goal_id = ${userGoalID})`;
    await db.queryAsync(updateEgg);
    return 'success';
    // want to turn this into one call
    // want to add check for egg hatching?
  } catch (err) {
    throw err;
  }
};

module.exports.completeGoalFailure = async (userGoalID) => {
  try {
    const updateGoal = `UPDATE user_goal SET user_goal_finalized = 1 WHERE user_goal_id = ${userGoalID}`;
    return await db.queryAsync(updateGoal);
  } catch (err) {
    throw err;
  }
};

module.exports.hatchEgg = async (userEggID, userID, nextXP) => {
  try {
    const hatchEgg = `UPDATE user_egg SET egg_hatched = 1 WHERE user_egg_id = '${userEggID}';`;

    const newSquaddie = 'INSERT INTO user_monster (user_id, monster_id) VALUES ' +
      `('${userID}', FLOOR(RAND() * (SELECT COUNT(*) FROM monster) + 1));`;

    const makeNewEgg = 'INSERT INTO user_egg (user_id, egg_id, egg_xp) VALUES ' +
      `('${userID}', FLOOR(RAND() * (SELECT COUNT (*) FROM egg) + 1), ${nextXP});`;

    const returnSquaddie = 'SELECT user_monster.*, monster.* FROM user_monster INNER JOIN monster ' +
      'ON user_monster.monster_id = monster.monster_id WHERE user_monster.user_monster_id = (SELECT MAX(user_monster_id) FROM user_monster);';

    await Promise.all([
      db.queryAsync(hatchEgg),
      db.queryAsync(newSquaddie),
      db.queryAsync(makeNewEgg),
    ]);

    return await db.queryAsync(returnSquaddie);
  } catch (err) {
    throw err;
  }
};

module.exports.getEggInfo = async (userID) => {
  try {
    const data = await db.queryAsync(`SELECT * FROM user_egg WHERE user_id='${userID}' AND egg_hatched = 0;`);
    return data.pop(); // removes array and returns only object
  } catch (e) {
    throw e;
  }
};

module.exports.newUserLifetimeDistance = async (userID, distance) => {
  try {
    const updateGoals = `UPDATE user_goal SET user_goal_current = ${distance} ` +
      `WHERE user_id = '${userID}' AND goal_id > 0 AND goal_id < 7 AND user_goal_concluded = 0`;
    return await db.queryAsync(updateGoals);
  } catch (err) {
    throw (err);
  }
};

module.exports.newUserLifetimeSteps = async (userID, steps) => {
  try {
    const updateGoals = `UPDATE user_goal SET user_goal_current = ${steps} ` +
      `WHERE user_id = '${userID}' AND goal_id > 6 AND goal_id < 13 AND user_goal_concluded = 0`;
    return await db.queryAsync(updateGoals);
  } catch (err) {
    throw (err);
  }
};

module.exports.newUserLifetimeFloors = async (userID, floors) => {
  try {
    const updateGoals = `UPDATE user_goal SET user_goal_current = ${floors} ` +
      `WHERE user_id = '${userID}' AND goal_id > 12 AND goal_id < 19 AND user_goal_concluded = 0`;
    return await db.queryAsync(updateGoals);
  } catch (err) {
    throw (err);
  }
};

module.exports.updateGoalStatuses = async () => {
  const markDoneGoals = 'UPDATE user_goal SET user_goal_success = 1, user_goal_concluded = 1 ' +
    'WHERE user_goal_target <= user_goal_current';
  const markExpiredGoals = 'UPDATE user_goal SET user_goal_concluded = 1 WHERE user_goal_end_date < (utc_timestamp());';
  (async function updateGoals() {
    await Promise.all([
      db.queryAsync(markDoneGoals),
      db.queryAsync(markExpiredGoals),
    ]);
  }());
};

module.exports.getUserDeets = async (userID) => {
  const summarizeGoals = (goals) => {
    const goalStats = {
      total: {
        attempted: 0,
        success: 0,
        fail: 0,
        pending: 0,
      },
    };
    goals.forEach((goal) => {
      goalStats.total.attempted += 1;
      if (!goalStats[goal.goal_activity]) {
        goalStats[goal.goal_activity] = {
          attempted: 1,
          success: 0,
          fail: 0,
          pending: 0,
          amountStart: goal.user_goal_start_value,
          amountComplete: goal.user_goal_current,
        };
      } else {
        goalStats[goal.goal_activity].attempted += 1;
        goalStats[goal.goal_activity].amountStart += goal.user_goal_start_value;
        goalStats[goal.goal_activity].amountComplete += goal.user_goal_current;
      }

      if (!goal.user_goal_concluded) {
        goalStats.total.pending += 1;
        goalStats[goal.goal_activity].pending += 1;
      } else if (goal.user_goal_success) {
        goalStats.total.success += 1;
        goalStats[goal.goal_activity].success += 1;
      } else {
        goalStats.total.fail += 1;
        goalStats[goal.goal_activity].fail += 1;
      }
    });

    return goalStats;
  };

  try {
    const getUserGoals = `SELECT user_goal.*, goal.* FROM user_goal INNER JOIN goal ON goal.goal_id = user_goal.goal_id WHERE user_id = '${userID}'`;
    const userGoals = await db.queryAsync(getUserGoals);

    const getAllGoals = 'SELECT user_goal.*, goal.* FROM user_goal INNER JOIN goal ON goal.goal_id = user_goal.goal_id';
    const allGoals = await db.queryAsync(getAllGoals);

    return { user: summarizeGoals(userGoals), global: summarizeGoals(allGoals) };
  } catch (err) {
    throw new Error('get user deets error');
  }
};

