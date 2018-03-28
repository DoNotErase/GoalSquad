import axios from 'axios';
import moment from 'moment';
import { updateCustomTime } from './actions';
import { getUserGoals } from './incubatorActions';

const setDefault = goals => ({ type: 'SET_DEFAULT_GOALS', payload: goals });

const handleErr = (err) => {
  if (err.response && err.response.status === 401) {
    window.location.href = '/';
    alert('Sorry! Please log in.');
  } else {
    console.log(err);
  }
};

export const getDefaultGoals = () => (
  dispatch => (
    axios.get('/defaultGoals')
      .then((res) => {
        dispatch(setDefault(res.data));
      })
      .catch((err) => { handleErr(err); })
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
        // keep
        dispatch(getUserGoals());
      })
      .catch((err) => { handleErr(err); })
  )
);

export const submitCustomGoal = (goalName, goalActivity, goalAmount, deadline, points) => (
  dispatch => (
    axios.post('/createCustomGoal', {
      goalName,
      goalActivity,
      goalAmount,
      goalLength: deadline,
      points,
      createTime: moment().format(),
    })
      .then(() => {
        dispatch(updateCustomTime(moment()));
        dispatch(getUserGoals());
      })
      .catch((err) => { handleErr(err); })
  )
);

