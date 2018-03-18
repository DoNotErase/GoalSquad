import axios from 'axios';

const setDefault = goals => ({ type: 'SET_DEFAULT_GOALS', payload: goals });

export const getDefaultGoals = () => (
  dispatch => (
    axios.get('/defaultGoals')
      .then((res) => {
        dispatch(setDefault(res.data));
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
        // not sure if this actually needs to dispatch anything
      })
      .catch((err) => {
        console.log(err);
      })
  )
);

