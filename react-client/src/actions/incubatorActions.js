import axios from 'axios';

const handleErr = (err) => {
  if (err.response.status === 401) {
    window.location.href = '/';
    alert('Sorry! Please log in.');
  } else {
    console.log(err);
  }
};

export const setUserGoals = (userGoals) => {
  const sortedGoals = {
  };

  userGoals.forEach((goal) => {
    if (sortedGoals[goal.goal_activity]) {
      sortedGoals[goal.goal_activity].push(goal);
    } else {
      sortedGoals[goal.goal_activity] = [goal];
    }
  });
  return { type: 'SET_USER_GOALS', payload: sortedGoals };
};

export const getUserGoals = () => (
  dispatch => (
    axios.get('/userGoals')
      .then((res) => {
        dispatch(setUserGoals(res.data));
      })
      .catch((err) => { handleErr(err); })
  )
);

const setEggStatus = eggData => ({ type: 'EGG_DATA', payload: eggData });

export const fetchEggStatus = () => (
  dispatch => (
    axios.get('/eggStatus')
      .then((res) => {
        dispatch(setEggStatus(res.data));
      })
      .catch((err) => { handleErr(err); })
  )
);

// caught in barnReducer
const newSquaddie = squaddie => ({ type: 'NEW_SQUADDIE', payload: squaddie });

export const hatchEgg = extraXP => (
  dispatch => (
    axios.post('/hatchEgg', { xp: extraXP })
      .then((res) => {
        dispatch(newSquaddie(res.data));
        dispatch({ type: 'SQUADDIE_UPDATE' });
      })
      .catch((err) => { handleErr(err); })
  )
);

export const markGoalSuccess = userGoalID => (
  dispatch => (
    axios.patch('/completeGoal', { goalID: userGoalID })
      .then((res) => {
        // pass in goal index within activity to splice out
        // add xp to egg directly, need points, maybe separate call from userGoal
        dispatch(getUserGoals(userGoalID));
        dispatch(fetchEggStatus(res.data)); // because xp was added
      })
      .catch((err) => { handleErr(err); })
  )
);

export const markGoalFailure = userGoalID => (
  dispatch => (
    axios.patch('/failGoal', { goalID: userGoalID })
      .then(() => {
        // pass in goal index within activity to splice out
        dispatch(getUserGoals(userGoalID));
      })
      .catch((err) => { handleErr(err); })
  )
);

export const submitProgress = (userGoalID, newCurrent) => (
  dispatch => (
    axios.patch('/updateCustom', { goalID: userGoalID, newCurrent })
      .then(() => {
        // take this out, update local
        dispatch(getUserGoals(userGoalID));
      })
      .catch((err) => { handleErr(err); })
  )
);
