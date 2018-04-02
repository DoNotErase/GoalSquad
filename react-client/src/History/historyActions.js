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

export const sort = order => ({ type: 'SET_SORTED', payload: order });

export const filter = filterType => (
  (dispatch) => {
    dispatch({ type: 'SET_FILTERED', payload: filterType });
    dispatch(sort(''));
  }
);

export const fetch = () => (
  dispatch => (
    axios.get('/historicGoals')
      .then((res) => {
        console.log(res.data);
        dispatch(setHistory(res.data));
        dispatch(filter(''));
        dispatch(sort(''));
      })
      .catch((err) => {
        handleErr(err);
      })
  )
);

export const flipSort = () => { console.log('hey'); return { type: 'FLIP' } };
