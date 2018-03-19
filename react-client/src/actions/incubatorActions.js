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
