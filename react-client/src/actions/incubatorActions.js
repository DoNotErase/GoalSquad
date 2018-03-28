import axios from 'axios';
import { routerActions } from 'react-router-redux';

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
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = '/';
          alert('Sorry! Please log in.');
        }
      })
  )
);

const setEggStatus = eggData => ({ type: 'EGG_DATA', payload: eggData });

export const fetchEggStatus = () => (
  dispatch => (
    axios.get('/eggStatus')
      .then((res) => {
        dispatch(setEggStatus(res.data));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = '/';
          alert('Sorry! Please log in.');
        }
      })
  )
);

// caught in barnReducer
const newSquaddie = squaddie => ({ type: 'NEW_SQUADDIE', payload: squaddie });

export const hatchEgg = (eggID, extraXP) => {
  console.log('I got this', eggID)
  return (
  dispatch => (
    axios.post('/hatchEgg', { eggID: eggID, xp: extraXP })
      .then((res) => {
        console.log('res data', res.data)
        dispatch(newSquaddie(res.data));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = '/';
          alert('Sorry! Please log in.');
        }
      })
  )
  )
};

export const markGoalSuccess = userGoalID => (
  dispatch => (
    axios.patch('/completeGoal', { goalID: userGoalID })
      .then((res) => {
        dispatch(getUserGoals(userGoalID));
        dispatch(fetchEggStatus(res.data)); // because xp was added
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = '/';
          alert('Sorry! Please log in.');
        }
      })
  )
);

export const markGoalFailure = userGoalID => (
  dispatch => (
    axios.patch('/failGoal', { goalID: userGoalID })
      .then(() => {
        dispatch(getUserGoals(userGoalID));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = '/';
          alert('Sorry! Please log in.');
        }
      })
  )
);

export const submitProgress = (userGoalID, newCurrent) => (
  dispatch => (
    axios.patch('/updateCustom', { goalID: userGoalID, newCurrent })
      .then(() => {
        dispatch(getUserGoals(userGoalID));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = '/';
          alert('Sorry! Please log in.');
        }
      })
  )
);
