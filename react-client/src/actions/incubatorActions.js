import axios from 'axios';

export const setUserGoals = (userGoals) => {
  const sortedGoals = {
    distance: [],
    steps: [],
    stairs: [],
  };

  userGoals.forEach((goal) => {
    sortedGoals[goal.goal_activity].push(goal);
  });
  return { type: 'SET_USER_GOALS', payload: sortedGoals };
};

export const getUserGoals = () => (
  dispatch => (
    axios.get('/userGoals')
      .then((res) => {
        console.log(res.data);
        dispatch(setUserGoals(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
  )
);

const setEggStatus = eggData => ({ type: 'EGG_DATA', payload: eggData });

export const fetchEggStatus = () => (
  dispatch => (
    axios.get('/eggStatus')
      .then((res) => {
        console.log('goalCompleted!');
        dispatch(setEggStatus(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
  )
);

export const markGoalComplete = userGoalID => (
  dispatch => (
    axios.patch('/completeGoal', { goalID: userGoalID })
      .then((res) => {
        console.log('goalCompleted!');
        dispatch(fetchEggStatus(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
  )
);
