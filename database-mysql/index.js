const mysql = require('mysql');
const Promise = require('bluebird');

let config;
if (!process.env.PORT) {
  config = require('../config.js');
}
// needed for mysql
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

const connection = {
  host: process.env.RDS_HOSTNAME || config.aws.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME || config.aws.RDS_USERNAME,
  password: process.env.RDS_PASSWORD || config.aws.RDS_PASSWORD,
  port: process.env.RDS_PORT || config.aws.RDS_PORT,
  database: 'goalsquad',
};

const db = mysql.createPool({ connectionLimit: 5, ...connection });

db.getConnection((err, connection) => {
  if (err) {
    console.log('Database connection error', err);
  } else {
    console.log('Database is connected!');
  }
});


const getRightID = async (id) => {
  if (typeof id === 'number') {
    return id;
  }
  const userID = await db.queryAsync(`SELECT user_id FROM user WHERE fitbit_id = '${id}'`);
  return userID[0].user_id;
};

module.exports.getUserByID = async (id) => {
  try {
    const userID = await getRightID(id);
    return await db.queryAsync(`SELECT * FROM user WHERE user_id = '${userID}'`);
  } catch (e) {
    throw e;
  }
};

module.exports.createUserLocal = async (username, password) => {
  const query = `SELECT * FROM user WHERE user_username = '${username}';`;
  try {
    const user = await db.queryAsync(query);
    if (user.length) {
      return false;
    }
    const create = 'INSERT INTO user (user_username, user_password) ' +
      `VALUES ('${username}', '${password}')`;
    const makeNewEgg = 'INSERT INTO user_egg (user_id, egg_id, egg_xp) VALUES ' +
      '((SELECT MAX(user_id) FROM user), (FLOOR(RAND() * (SELECT COUNT(*) FROM egg) + 1)), 0);';
    await db.queryAsync(create);
    await db.queryAsync(makeNewEgg);
    return await db.queryAsync(query);
  } catch (err) {
    throw err;
  }
};

module.exports.userExists = async (fitbitID) => {
  const query = `SELECT * FROM user WHERE fitbit_id = '${fitbitID}';`;

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

module.exports.findByUsername = async (username) => {
  const query = 'SELECT user_username, user_password as password, user_id as id, custom_goal_timer_1, custom_goal_timer_2 ' +
    `FROM user WHERE user_username = '${username}';`;

  try {
    const user = await db.queryAsync(query);
    if (user.length === 0) {
      return false;
    }
    return user[0];
  } catch (e) {
    throw e;
  }
};

module.exports.updateTokens = async (fitbitID, accessToken, refreshToken) => {
  const query = `UPDATE user SET user_accesstoken = '${accessToken}', user_refreshtoken = '${refreshToken}' ` +
    `WHERE fitbit_id = '${fitbitID}';`;

  try {
    return await db.queryAsync(query);
  } catch (e) {
    throw e;
  }
};

module.exports.createUser = async (fitbitID, displayName, accessToken, refreshToken) => {
  const query = 'INSERT INTO user (fitbit_id, user_username, user_accesstoken, user_refreshtoken) ' +
    `VALUES ('${fitbitID}', '${displayName}', '${accessToken}', '${refreshToken}');`;
  const makeNewEgg = 'INSERT INTO user_egg (user_id, egg_id, egg_xp) VALUES ' +
    '((SELECT MAX(user_id) FROM user), FLOOR(RAND() * (SELECT COUNT (*) FROM egg) + 1), 0);';
  try {
    await db.queryAsync(query);
    return db.queryAsync(makeNewEgg);
  } catch (e) {
    throw e;
  }
};

module.exports.getAccessToken = async (fitbitID) => {
  try {
    const data = await db.queryAsync(`SELECT user_accesstoken FROM user WHERE fitbit_id = '${fitbitID}';`);
    return data[0].user_accesstoken;
  } catch (e) {
    throw e;
  }
};

module.exports.getOldUserGoals = async (id) => {
  try {
    const userID = await getRightID(id);
    const query = 'SELECT user_goal.*, goal.goal_name, goal.goal_activity, goal.goal_amount, goal.goal_difficulty ' +
      'FROM user_goal INNER JOIN goal ON goal.goal_id = user_goal.goal_id ' +
      `WHERE user_goal.user_id = '${userID}' AND user_goal.user_goal_finalized = 1;`;

    const goals = await db.queryAsync(query);
    return goals;
  } catch (err) {
    throw new Error('trouble in getOldUserGoals');
  }
};

module.exports.getActiveUserGoals = async (id) => {
  try {
    const userID = await getRightID(id);
    const query = 'SELECT user_goal.*, goal.goal_name, goal.goal_activity, goal.goal_amount, goal.goal_difficulty ' +
      'FROM user_goal INNER JOIN goal ON goal.goal_id = user_goal.goal_id ' +
      `WHERE user_goal.user_id = '${userID}' AND user_goal.user_goal_finalized = 0;`;

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
    const userID = await getRightID(goalObj.userID);
    let attachUser = '';

    if (goalObj.goalLength) { // include end date
      attachUser = 'INSERT INTO user_goal (user_id, goal_id, user_goal_start_value, user_goal_current, ' +
      'user_goal_target, user_goal_points, user_goal_start_date, user_goal_end_date) VALUES ' +
      `('${userID}', ${goalObj.goalID}, ${goalObj.startValue}, ${goalObj.startValue}, ` +
      `${goalObj.targetValue}, ${goalObj.points}, (utc_timestamp()), ` +
      '(SELECT DATE_ADD((SELECT DATE_ADD((utc_timestamp()), ' +
      `INTERVAL ${goalObj.goalLength.days} DAY)), ` +
      `INTERVAL ${goalObj.goalLength.hours} HOUR)));`;
    } else {
      attachUser = 'INSERT INTO user_goal (user_id, goal_id, user_goal_start_value, user_goal_current, ' +
      'user_goal_target, user_goal_points, user_goal_start_date) VALUES ' +
      `('${userID}', ${goalObj.goalID}, ${goalObj.startValue}, ${goalObj.startValue}, ${goalObj.targetValue}, ${goalObj.points}, (utc_timestamp()));`;
    }
    await db.queryAsync(attachUser);

    return '';
  } catch (err) {
    throw new Error('trouble in createUserGoal');
  }
};

module.exports.createCustomGoal = async (goalObj) => {
  try {
    let goalID;
    const existing = db.queryAsync(`SELECT goal_id FROM goal WHERE goal_name = '${goalObj.goalName}'`);

    if (existing.length) {
      [goalID] = existing;
    } else {
      const createGoal = 'INSERT INTO goal (goal_name, goal_activity, ' +
        'goal_amount, goal_difficulty, goal_class, goal_points, goal_timedivisor) VALUES ' +
        `('${goalObj.goalName}', '${goalObj.goalActivity}', '${goalObj.goalAmount}', ` +
        '"custom", "custom", 20, 5);';

      await db.queryAsync(createGoal);
      goalID = await db.queryAsync('SELECT MAX(goal_id) as "goal_id" FROM goal');
    }

    goalID = goalID[0].goal_id;

    const userID = await getRightID(goalObj.userID);

    let attachUser = '';

    if (goalObj.goalLength) {
      attachUser = 'INSERT INTO user_goal (user_id, goal_id, user_goal_start_value, user_goal_current, ' +
        'user_goal_target, user_goal_points, user_goal_start_date, user_goal_end_date) VALUES ' +
        `('${userID}', ${goalID}, 0, 0, ${goalObj.goalAmount}, ${goalObj.points}, (utc_timestamp()), ` +
        '(SELECT DATE_ADD((SELECT DATE_ADD((utc_timestamp()), ' +
        `INTERVAL ${goalObj.goalLength.days} DAY)), ` +
        `INTERVAL ${goalObj.goalLength.hours} HOUR)));`;
    } else {
      attachUser = 'INSERT INTO user_goal (user_id, goal_id, user_goal_start_value, user_goal_current, ' +
        'user_goal_target, user_goal_points, user_goal_start_date) VALUES ' +
        `('${userID}', ${goalID}, 0, 0, ${goalObj.goalAmount}, ` +
        `${goalObj.points}, (utc_timestamp()));`;
    }

    const updateUserCustomTimers = 'UPDATE user SET custom_goal_timer_1 = custom_goal_timer_2, ' +
      `custom_goal_timer_2 = (utc_timestamp()) WHERE user_id = '${userID}'`;

    await Promise.all([
      db.queryAsync(attachUser),
      db.queryAsync(updateUserCustomTimers),
    ]);

    if (goalObj.goalLength) {
      const setEndDate = 'UPDATE user_goal SET user_goal_end_date = ' +
        '(SELECT DATE_ADD((SELECT DATE_ADD((SELECT MAX(user_goal_start_date)), ' +
        `INTERVAL ${goalObj.goalLength.days} DAY)), ` +
        `INTERVAL ${goalObj.goalLength.hours} HOUR)) ` +
        `WHERE user_goal_id = (${goalID});`;

      await db.queryAsync(setEndDate);
    }

    return '';
  } catch (err) {
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

const findEggID = async (userID) => {
  const possibleIDs = await db.queryAsync('SELECT egg_id from egg WHERE egg_id NOT IN ' +
    `(SELECT egg_id FROM user_egg WHERE user_id=${userID})`);

  return possibleIDs[Math.ceil(Math.random() * possibleIDs.length)].egg_id;
};

module.exports.hatchEgg = async (userEggID, id, nextXP) => {
  try {
    const userID = await getRightID(id);
    const hatchEgg = `UPDATE user_egg SET egg_hatched = 1 WHERE user_egg_id = '${userEggID}';`;

    const newSquaddie = 'INSERT INTO user_monster (user_id, monster_id, user_monster_yard) VALUES ' +
      `('${userID}', (SELECT egg_id FROM user_egg WHERE user_egg_id = '${userEggID}'), 1);`;

    const eggID = await findEggID(userID);

    const makeNewEgg = 'INSERT INTO user_egg (user_id, egg_id, egg_xp) VALUES ' +
      `('${userID}', ${eggID}, ${nextXP});`;

    const returnSquaddie = 'SELECT user_monster.*, monster.* FROM user_monster INNER JOIN monster ' +
      'ON user_monster.monster_id = monster.monster_id WHERE user_monster.user_monster_id = (SELECT MAX(user_monster_id) FROM user_monster);';

    await Promise.all([
      db.queryAsync(hatchEgg),
      db.queryAsync(newSquaddie),
      db.queryAsync(makeNewEgg),
    ]);

    return await db.queryAsync(returnSquaddie);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports.getNewSquaddie = async (userID) => {
  try {
    const getSquaddie = 'SELECT user_monster.*, monster.*, user.* FROM user_monster INNER JOIN monster ' +
      'ON user_monster.monster_id = monster.monster_id' +
      `WHERE user_monster_creation IN (SELECT max(user_monster_creation) AND user_monster.user_id = ${userID} FROM user_monster);`;

    return await db.queryAsync(getSquaddie);
  } catch (err) {
    throw err;
  }
};

module.exports.getEggInfo = async (id) => {
  try {
    const userID = await getRightID(id);
    const data = await db.queryAsync(`SELECT * FROM user_egg WHERE user_id='${userID}' AND egg_hatched = 0;`);
    return data.pop(); // removes array and returns only object
  } catch (e) {
    throw e;
  }
};

module.exports.getUserSquaddies = async (id) => {
  try {
    const userID = await getRightID(id);
    const data = await db.queryAsync('SELECT monster.*, user_monster.* FROM monster INNER JOIN ' +
      'user_monster ON user_monster.monster_id = monster.monster_id WHERE ' +
      `user_monster.user_id = '${userID}';`);
    return data;
  } catch (e) {
    throw e;
  }
};

module.exports.getAllSquaddies = async (id) => {
  try {
    const userID = await getRightID(id);
    // returns a lsit of all squaddies but with null info for ones a user hasn't yet earned
    const allSquaddies = await db.queryAsync('SELECT * FROM monster');
    const userSquaddies = await db.queryAsync(`SELECT * FROM user_monster WHERE user_id = ${userID}`);

    userSquaddies.forEach((squaddie) => {
      allSquaddies[squaddie.monster_id - 1].user = squaddie;
    });
    return allSquaddies;
  } catch (err) {
    throw new Error('get all squaddies err');
  }
};

module.exports.newUserLifetimeDistance = async (id, distance) => {
  try {
    const userID = await getRightID(id);
    const updateGoals = `UPDATE user_goal SET user_goal_current = ${distance} ` +
      `WHERE user_id = '${userID}' AND goal_id > 0 AND goal_id < 7 AND user_goal_concluded = 0`;
    return await db.queryAsync(updateGoals);
  } catch (err) {
    throw (err);
  }
};

module.exports.newUserLifetimeSteps = async (id, steps) => {
  try {
    const userID = await getRightID(id);
    const updateGoals = `UPDATE user_goal SET user_goal_current = ${steps} ` +
      `WHERE user_id = '${userID}' AND goal_id > 6 AND goal_id < 13 AND user_goal_concluded = 0`;
    return await db.queryAsync(updateGoals);
  } catch (err) {
    throw (err);
  }
};

module.exports.newUserLifetimeFloors = async (id, floors) => {
  try {
    const userID = await getRightID(id);
    const updateGoals = `UPDATE user_goal SET user_goal_current = ${floors} ` +
      `WHERE user_id = '${userID}' AND goal_id > 12 AND goal_id < 19 AND user_goal_concluded = 0`;
    return await db.queryAsync(updateGoals);
  } catch (err) {
    throw (err);
  }
};

module.exports.updateCustomGoalProgress = async (goalID, newCurrent) => {
  try {
    const updateGoal = `UPDATE user_goal SET user_goal_current = ${newCurrent} + user_goal_current ` +
      `WHERE user_goal_id = ${goalID}`;
    await db.queryAsync(updateGoal);
    return;
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

module.exports.getUserDeets = async (id) => {
  const userID = await getRightID(id);
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

module.exports.getYardSquaddiesByID = async (id) => {
  try {
    const userID = await getRightID(id);
    return await db.queryAsync(`SELECT * FROM user_monster INNER JOIN monster ON monster.monster_id = user_monster.monster_id WHERE user_id = ${userID} AND user_monster_yard = 1`);
  } catch (err) {
    throw new Error('get yardsquaddies DB error');
  }
};

module.exports.updateYardSquaddie = async (userMonsterID) => {
  try {
    const query = `UPDATE user_monster SET user_monster_yard = !user_monster_yard WHERE user_monster_id = '${userMonsterID}'`;
    return await db.queryAsync(query);
  } catch (err) {
    throw new Error('error updating yardsquaddie');
  }
  // opposite of yard status (0 or 1)
};

module.exports.renameSquaddie = async (userMonsterID, newName) => {
  try {
    return await db.queryAsync(`UPDATE user_monster SET user_monster_new_name = '${newName}' WHERE user_monster_id = ${userMonsterID}`);
  } catch (err) {
    throw new Error('error renaming squaddie');
  }
};

module.exports.saveSquaddiePosition = async (userMonsterPosition) => {
  try {
    return await db.queryAsync(`UPDATE user_monster SET user_monster_xcoord = ${userMonsterPosition.x}, user_monster_ycoord = ${userMonsterPosition.y} WHERE user_monster_id = ${userMonsterPosition.id}`);
  } catch (err) {
    throw new Error('Error saving Squaddie position');
  }
};

module.exports.addXPtoMonster = async (monID, xp) => {
  try {
    return await db.queryAsync(`UPDATE user_monster SET user_monster_current_xp = user_monster_current_xp + ${xp} ` +
      `WHERE user_monster_id = ${monID};`);
  } catch (err) {
    console.log(err);
    throw new Error('ERR adding XP');
  }
};

module.exports.levelUp = async (monID) => {
  try {
    return await db.queryAsync('UPDATE user_mosnter SET user_monster_level = user_monster_level + 1, ' +
      'user_monster_hp = user_monster_hp + 5, ' +
      'user_monster_attack = user_monster_attack + 1, ' +
      'user_monster_defense = user_monster_defense + 1, ' +
      `WHERE user_monster_id = ${monID};`);
  } catch (err) {
    console.log(err);
    throw new Error('level up err');
  }
};
