import axios from 'axios';

const handleErr = (err) => {
  if (err.response && err.response.status === 401) {
    window.location.href = '/';
    alert('Sorry! Please log in.');
  } else {
    console.log(err);
  }
};

export const setHistory = goals => ({ type: 'SET_HISTORY', payload: goals });

export const fetch = () => (
  dispatch => (
    axios.get('/historicGoals')
      .then((res) => {
        console.log(res.data);
        dispatch(setHistory(res.data));
      })
      .catch((err) => {
        handleErr(err);
      })
  )
);
