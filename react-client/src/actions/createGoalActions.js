import axios from 'axios';
import moment from 'moment';
import { getUserGoals } from './incubatorActions';

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
      startDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    })
      .then(() => {
        dispatch(getUserGoals());
        // not sure if this actually needs to dispatch anything
      })
      .catch((err) => {
        console.log(err);
      })
  )
);

