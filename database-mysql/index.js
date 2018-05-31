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
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'goalsquad'
}

// const connection = {
//   host: process.env.RDS_HOSTNAME || config.aws.RDS_HOSTNAME,
//   user: process.env.RDS_USERNAME || config.aws.RDS_USERNAME,
//   password: process.env.RDS_PASSWORD || config.aws.RDS_PASSWORD,
//   port: process.env.RDS_PORT || config.aws.RDS_PORT,
//   database: 'goalsquad',
// };

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
  const userID = await db.queryAsync('SELECT user_id FROM user WHERE fitbit_id = ?', [id]);
  return userID[0].user_id;
};

module.exports.getUserByID = async (id) => {
  try {
    const userID = await getRightID(id);
    return await db.queryAsync('SELECT * FROM user WHERE user_id = ?', [userID]);
  } catch (e) {
    throw e;
  }
};

module.exports.createUserLocal = async (username, password) => {
  const selectUser = 'SELECT * FROM user WHERE user_username = ?';
  try {
    const user = await db.queryAsync(selectUser, [username]);
    if (user.length !== 0) {
      return false;
    }
    const createUser = 'INSERT INTO user (user_username, user_password) VALUES (?, ?)';
    const createFirstEgg = 'INSERT INTO user_egg (user_id, egg_id, egg_xp) VALUES ' +
      '((SELECT user_id FROM user WHERE user_username = ?), (FLOOR(RAND() * (SELECT COUNT(*) FROM egg) + 1)), 0)';
    await db.queryAsync(createUser, [username, password]);
    await db.queryAsync(createFirstEgg, [username]);
    return await db.queryAsync(selectUser, [username]);
  } catch (err) {
    throw err;
  }
};

module.exports.userExists = async (fitbitID) => {
  const selectFitbitUser = 'SELECT * FROM user WHERE fitbit_id = ?';

  try {
    const user = await db.queryAsync(selectFitbitUser, [fitbitID]);
    if (user.length === 0) {
      return false;
    }
    return true;
  } catch (e) {
    throw e;
  }
};

module.exports.findByUsername = async (username) => {
  const fetchUser = 'SELECT user_username, user_password as password, user_id as id, custom_goal_timer_1, custom_goal_timer_2, role ' +
    'FROM user WHERE user_username = ?';

  try {
    const user = await db.queryAsync(fetchUser, [username]);
    if (user.length === 0) {
      return false;
    }
    return user[0];
  } catch (e) {
    throw e;
  }
};

module.exports.updateTokens = async (fitbitID, accessToken, refreshToken) => {
  const setTokens = 'UPDATE user SET user_accesstoken = ?, user_refreshtoken = ? WHERE fitbit_id = ?';

  try {
    return await db.queryAsync(setTokens, [accessToken, refreshToken, fitbitID]);
  } catch (e) {
    throw e;
  }
};

module.exports.createUser = async (fitbitID, displayName, accessToken, refreshToken) => {
  const makeUserFB = 'INSERT INTO user (fitbit_id, user_username, user_accesstoken, user_refreshtoken) VALUES (?, ?, ?, ?)';
  const makeNewEgg = 'INSERT INTO user_egg (user_id, egg_id, egg_xp) VALUES ' +
    '(?, FLOOR(RAND() * (SELECT COUNT (*) FROM egg) + 1), 0);';
  try {
    await db.queryAsync(makeUserFB, [fitbitID, displayName, accessToken, refreshToken])
      .then(results => {
        db.queryAsync(makeNewEgg, [results.insertId]);
      }); 
  } catch (e) {
    throw e;
  }
};

module.exports.getAccessToken = async (fitbitID) => {
  try {
    const data = await db.queryAsync('SELECT user_accesstoken FROM user WHERE fitbit_id = ?', [fitbitID]);
    return data[0].user_accesstoken;
  } catch (e) {
    throw e;
  }
};

module.exports.getOldUserGoals = async (id) => {
  try {
    const userID = await getRightID(id);
    const fetchOldGoals = 'SELECT user_goal.*, goal.goal_name, goal.goal_activity, goal.goal_amount, goal.goal_difficulty ' +
      'FROM user_goal INNER JOIN goal ON goal.goal_id = user_goal.goal_id ' +
      'WHERE user_goal.user_id = ? AND user_goal.user_goal_finalized = 1';

    return await db.queryAsync(fetchOldGoals, [userID]);
  } catch (err) {
    throw new Error('trouble in getOldUserGoals');
  }
};

module.exports.getActiveUserGoals = async (id) => {
  try {
    const userID = await getRightID(id);
    const fetchNewGoals = 'SELECT user_goal.*, goal.goal_name, goal.goal_activity, goal.goal_amount, goal.goal_difficulty ' +
      'FROM user_goal INNER JOIN goal ON goal.goal_id = user_goal.goal_id ' +
      `WHERE user_goal.user_id = ? AND user_goal.user_goal_finalized = 0;`;

    return await db.queryAsync(fetchNewGoals, [userID]);
  } catch (err) {
    throw new Error('trouble in getActiveUserGoals');
  }
};

module.exports.getGoalInfo = async (goalID) => {
  try {
    const goal = await db.queryAsync(`SELECT * FROM goal WHERE goal_id = ?`, [goalID]);
    return goal[0];
  } catch (err) {
    throw new Error('trouble in getGoalInfo');
  }
};

module.exports.createUserGoal = async (goalObj) => {
  try {
    const userID = await getRightID(goalObj.userID);

    if (goalObj.goalLength) { // include end date
      let attachUserWithLength = 'INSERT INTO user_goal (user_id, goal_id, user_goal_start_value, user_goal_current, ' +
      'user_goal_target, user_goal_points, user_goal_start_date, user_goal_end_date) VALUES ' +
      '(?, ?, ?, ?, ?, ?, (utc_timestamp()), (SELECT DATE_ADD((SELECT DATE_ADD((utc_timestamp()), ' +
      `INTERVAL ? DAY)), INTERVAL ? HOUR)));`;
      await db.queryAsync(attachUserWithLength, [userID, goalObj.goalID, goalObj.startValue, goalObj.startValue, goalObj.targetValue, goalObj.points, goalObj.goalLength.days, goalObj.goalLength.hours]);
    } else {
      let attachUser = 'INSERT INTO user_goal (user_id, goal_id, user_goal_start_value, user_goal_current, ' +
      'user_goal_target, user_goal_points, user_goal_start_date) VALUES ' +
      `(?, ?, ?, ?, ?, ?, (utc_timestamp()));`;
      await db.queryAsync(attachUser, [userID, goalObj.goalID, goalObj.startValue, goalObj.startValue, goalObj.targetValue, goalObj.points]);
    }
    return;
  } catch (err) {
    throw new Error('trouble in createUserGoal');
  }
};

module.exports.createCustomGoal = async (goalObj) => {
  try {
    let goalID;
    const existing = db.queryAsync('SELECT goal_id FROM goal WHERE goal_name = ?', [goalObj.goalName]);

    if (existing.length) {
      [goalID] = existing;
      goalID = goalID[0].goal_id;
    } else {
      const createGoal = 'INSERT INTO goal (goal_name, goal_activity, ' +
        'goal_amount, goal_difficulty, goal_class, goal_points, goal_timedivisor) VALUES ' +
        '(?, ?, ?, "custom", "custom", 20, 5);';

      await db.queryAsync(createGoal, [goalObj.goalName, goalObj.goalActivity, goalObj.goalAmount])
        .then(results => {
          goalID = results.insertId;
        });
    }

    const userID = await getRightID(goalObj.userID);

    let attachUser = '';
    
    const updateUserCustomTimers = 'UPDATE user SET custom_goal_timer_1 = custom_goal_timer_2, ' +
      'custom_goal_timer_2 = (utc_timestamp()) WHERE user_id = ?';

    if (goalObj.goalLength) {
      attachUserWithLength = 'INSERT INTO user_goal (user_id, goal_id, user_goal_start_value, user_goal_current, ' +
        'user_goal_target, user_goal_points, user_goal_start_date, user_goal_end_date) VALUES ' +
        `(?, ?, 0, 0, ?, ?, (utc_timestamp()), ` +
        '(SELECT DATE_ADD((SELECT DATE_ADD((utc_timestamp()), ' +
        `INTERVAL ? DAY)), ` +
        `INTERVAL ? HOUR)));`;
            
      await Promise.all([
        db.queryAsync(attachUserWithLength, [userID, goalID, goalObj.goalAmount, goalObj.points, goalObj.goalLength.days, goalObj.goalLength.hours]),
        db.queryAsync(updateUserCustomTimers, [userID]),
      ]);

      const setEndDate = 'UPDATE user_goal SET user_goal_end_date = ' +
        '(SELECT DATE_ADD((SELECT DATE_ADD((SELECT MAX(user_goal_start_date)), ' +
        'INTERVAL ? DAY)), INTERVAL ? HOUR)) WHERE user_goal_id = ?';

      await db.queryAsync(setEndDate, [goalObj.goalLength.days, goalObj.goalLength.hours, goalID]);
    } else {
      attachUserNoLength = 'INSERT INTO user_goal (user_id, goal_id, user_goal_start_value, user_goal_current, ' +
        'user_goal_target, user_goal_points, user_goal_start_date) VALUES ' +
        `(?, ?, 0, 0, ?, ?, (utc_timestamp()));`;
      
      await Promise.all([
        db.queryAsync(attachUserNoLength, [userID, goalID, goalObj.goalAmount, goalObj.points]),
        db.queryAsync(updateUserCustomTimers, [userID]),
      ]);
    }
  } catch (err) {
    throw new Error('trouble in createUserGoal');
  }
};

module.exports.getDefaultGoals = async () => {
  try {
    const fetchGoals = 'SELECT * FROM goal WHERE goal_class != "custom"';

    const allDefaultGoals = await db.queryAsync(fetchGoals);
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
    await db.queryAsync('UPDATE user_goal SET user_goal_finalized = 1 WHERE user_goal_id = ?', [userGoalID]);
    const updateEgg = 'UPDATE user_egg SET egg_xp = (egg_xp + (SELECT user_goal_points FROM user_goal ' +
      `WHERE user_goal_id = ?)) WHERE egg_hatched = 0 AND user_id = ` +
      `(SELECT user_id FROM user_goal WHERE user_goal_id = ?)`;
    await db.queryAsync(updateEgg, [userGoalID, userGoalID]);
    return 'success';
  } catch (err) {
    throw err;
  }
};

module.exports.completeGoalFailure = async (userGoalID) => {
  try {
    return await db.queryAsync('UPDATE user_goal SET user_goal_finalized = 1 WHERE user_goal_id = ?', [userGoalID]);
  } catch (err) {
    throw err;
  }
};

const findEggID = async (userID) => {
  const possibleIDs = await db.queryAsync('SELECT egg_id from egg WHERE egg_id NOT IN ' +
    '(SELECT egg_id FROM user_egg WHERE user_id=?)', [userID]);

  return possibleIDs[Math.ceil(Math.random() * possibleIDs.length)].egg_id; //a single egg id
};

module.exports.hatchEgg = async (userEggID, id, nextXP) => {
  try {
    const userID = await getRightID(id);
    const eggID = await findEggID(userID);

    const hatchEgg = `UPDATE user_egg SET egg_hatched = 1 WHERE user_egg_id = ?`;

    const newSquaddie = 'INSERT INTO user_monster (user_id, monster_id, user_monster_yard) VALUES ' +
      `(?, (SELECT egg_id FROM user_egg WHERE user_egg_id = ?), 1);`;

    const makeNewEgg = 'INSERT INTO user_egg (user_id, egg_id, egg_xp) VALUES ' +
      `(?, ?, ?);`;

    const returnSquaddie = 'SELECT user_monster.*, monster.* FROM user_monster INNER JOIN monster ' +
      'ON user_monster.monster_id = monster.monster_id WHERE user_monster.user_monster_id = (SELECT MAX(user_monster_id) FROM user_monster);';

    await Promise.all([
      db.queryAsync(hatchEgg, [userEggID]),
      db.queryAsync(newSquaddie, [userID, userEggID]),
      db.queryAsync(makeNewEgg, [userID, eggID, nextXP]),
    ]);

    return await db.queryAsync(returnSquaddie);
  } catch (err) {
    throw err;
  }
};

module.exports.getEggInfo = async (id) => {
  try {
    const userID = await getRightID(id);
    const egg = await db.queryAsync('SELECT * FROM user_egg WHERE user_id = ? AND egg_hatched = 0', [userID]);
    return egg[0];
  } catch (e) {
    throw e;
  }
};

module.exports.getUserSquaddies = async (id) => {
  try {
    const userID = await getRightID(id);
    const squaddies = await db.queryAsync('SELECT monster.*, user_monster.* FROM monster INNER JOIN ' +
      'user_monster ON user_monster.monster_id = monster.monster_id WHERE ' +
      `user_monster.user_id = ?`, [userID]);
    return squaddies;
  } catch (e) {
    throw e;
  }
};

module.exports.getAllSquaddies = async (id) => {
  try {
    const userID = await getRightID(id);
    // returns a lsit of all squaddies but with null info for ones a user hasn't yet earned
    const allSquaddies = await db.queryAsync('SELECT * FROM monster');
    const userSquaddies = await db.queryAsync('SELECT * FROM user_monster WHERE user_id = ?', [userID]);

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
    const updateGoals = 'UPDATE user_goal SET user_goal_current = ? ' +
      'WHERE user_id = ? AND goal_id > 0 AND goal_id < 7 AND user_goal_concluded = 0';
    return await db.queryAsync(updateGoals, [distance, userID]);
  } catch (err) {
    throw new Error('new user lifetime distance err');
  }
};

module.exports.newUserLifetimeSteps = async (id, steps) => {
  try {
    const userID = await getRightID(id);
    const updateGoals = `UPDATE user_goal SET user_goal_current = ? ` +
      `WHERE user_id = ? AND goal_id > 6 AND goal_id < 13 AND user_goal_concluded = 0`;
    return await db.queryAsync(updateGoals, [steps, userID]);
  } catch (err) {
    throw new Error('new user lifetime steps err');
  }
};

module.exports.newUserLifetimeFloors = async (id, floors) => {
  try {
    const userID = await getRightID(id);
    const updateGoals = 'UPDATE user_goal SET user_goal_current = ? ' +
      'WHERE user_id = ? AND goal_id > 12 AND goal_id < 19 AND user_goal_concluded = 0';
    return await db.queryAsync(updateGoals, [floors, userID]);
  } catch (err) {
    throw new Error('new user lifetime floors err');
  }
};

module.exports.updateCustomGoalProgress = async (goalID, newCurrent) => {
  try {
    const updateGoal = 'UPDATE user_goal SET user_goal_current = ? + user_goal_current WHERE user_goal_id = ?';
    await db.queryAsync(updateGoal, [newCurrent, goalID]);
    return;
  } catch (err) {
    throw (err);
  }
};

module.exports.updatePushNotificationsToFalse = async (id) => {
  try {
    const userID = await getRightID(id)

    const updatePushNotificationsToFalse = 'UPDATE user SET notified_of_push_notifications = 1 WHERE user_id = ?';
    await db.queryAsync(updatePushNotificationsToFalse, [userID]);
  } catch (err) {
    throw (err);
  }
};

module.exports.updatePushNotificationsToTrue = async (id) => {
  try {
    const userID = await getRightID(id)

    const updatePushNotificationsToTrue = 'UPDATE user SET notified_of_push_notifications = 1, ' +
    'wants_push_notifications = 1 WHERE user_id = ?';
    await db.queryAsync(updatePushNotificationsToTrue, [userID]);
  } catch (err) {
    throw (err);
  }
};

module.exports.unsubscribeFromPushNotifications = async (id) => {
  try {
    const userID = await getRightID(id)

    const unsubscribeFromPushNotifications = 'UPDATE user SET wants_push_notifications = 0, ' +
    'unsubscribed_from_notifications = 1 WHERE user_id = ?';
    await db.queryAsync(unsubscribeFromPushNotifications, [userID]);
  } catch (err) {
    throw (err);
  }
}

module.exports.updateGoalStatuses = async () => {
  const markDoneGoals = 'UPDATE user_goal SET user_goal_success = 1, user_goal_concluded = 1 ' +
    'WHERE user_goal_target <= user_goal_current';
  const markExpiredGoals = 'UPDATE user_goal SET user_goal_concluded = 1 WHERE user_goal_end_date < (utc_timestamp());';
  await Promise.all([
    db.queryAsync(markDoneGoals),
    db.queryAsync(markExpiredGoals),
  ]);
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
    const getUserGoals = `SELECT user_goal.*, goal.* FROM user_goal INNER JOIN goal ON goal.goal_id = user_goal.goal_id WHERE user_id = ?`;
    const userGoals = await db.queryAsync(getUserGoals, [userID]);

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
    return await db.queryAsync('SELECT * FROM user_monster INNER JOIN monster ON monster.monster_id = user_monster.monster_id WHERE user_id = ? AND user_monster_yard = 1', [userID]);
  } catch (err) {
    throw new Error('get yardsquaddies DB error');
  }
};

module.exports.updateYardSquaddie = async (userMonsterID) => {
  try {
    const toggleYard = 'UPDATE user_monster SET user_monster_yard = !user_monster_yard WHERE user_monster_id = ?';
    return await db.queryAsync(toggleYard, [userMonsterID]);
  } catch (err) {
    throw new Error('error updating yardsquaddie');
  }
  // opposite of yard status (0 or 1)
};

module.exports.renameSquaddie = async (userMonsterID, newName) => {
  try {
    return await db.queryAsync('UPDATE user_monster SET user_monster_new_name = ? WHERE user_monster_id = ?', [newName, userMonsterID]);
  } catch (err) {
    throw new Error('error renaming squaddie');
  }
};

module.exports.saveSquaddiePosition = async (userMonsterPosition) => {
  try {
    return await db.queryAsync('UPDATE user_monster SET user_monster_xcoord = ?, user_monster_ycoord = ? WHERE user_monster_id = ?', [userMonsterPosition.x, userMonsterPosition.y, userMonsterPosition.id]);
  } catch (err) {
    throw new Error('Error saving Squaddie position');
  }
};

module.exports.addXPtoMonster = async (monID, xp) => {
  try {
    return await db.queryAsync(`UPDATE user_monster SET user_monster_current_xp = user_monster_current_xp + ? ` +
      `WHERE user_monster_id = ?`, [xp, monID]);
  } catch (err) {
    throw new Error('ERR adding XP');
  }
};

module.exports.levelUp = async (monID) => {
  try {
    return await db.queryAsync('UPDATE user_monster SET user_monster_level = user_monster_level + 1, ' +
      'user_monster_hp = user_monster_hp + 5, user_monster_attack = user_monster_attack + 1, ' +
      'user_monster_defense = user_monster_defense + 1 WHERE user_monster_id = ?', [monID]);
  } catch (err) {
    throw new Error('level up err');
  }
};
