import axios from 'axios';

export const getDefaultGoals = () => (
  dispatch => (
    axios.get('/defaultGoals')
      .then(() => {
        dispatch('SET_DEFAULT_GOALS');
      })
      .catch((err) => {
        console.log(err);
      })
  )
);

export const submitUserGoal = (goalID, deadline, points) => (
  dispatch => (
    axios.post('/createUserGoal', {
      goalID,
      goalLength: deadline, // of form {day: (num), hour: ()} or null
      points,
    })
      .then(() => {
        console.log('goal created');
        dispatch(''); // not sure if this actually needs to dispatch anything
      })
      .catch((err) => {
        console.log(err);
      })
  )
);

