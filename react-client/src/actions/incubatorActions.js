import axios from 'axios';

export const setUserGoals = userGoals => ({ type: 'SET_USER_GOALS', payload: userGoals });

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
