import axios from 'axios';

let alerted = false;

const handleErr = (err) => {
  if (err.response && err.response.status === 401 && !alerted) {
    window.location.href = '/';
    alerted = true;
    alert('Sorry! Please log in.');
  } else {
    console.log(err);
  }
};

export const setUserData = userData => ({
  type: 'USER_LIFETIME_ACTIVITY',
  payload: {
    steps: userData.lifetime.total.steps,
    floors: userData.lifetime.total.floors,
    distance: userData.lifetime.total.distance,
  },
});

export const turnOffUpdate = () => ({ type: 'NO_UPDATE' });

export const updateCustomTime = newTime => ({
  type: 'NEW_TIMER_2',
  payload: newTime,
});

export const deauthorizeFitbit = () => (
  () => (
    axios.post('fitbit/deauthorize')
      .catch((err) => { handleErr(err); })
  )
);

const setStats = deets => ({ type: 'SET_DEETS', payload: deets });

export const fetchStats = () => (
  dispatch => (
    axios.get('userDeets')
      .then((res) => {
        dispatch(setStats(res.data));
      })
      .catch((err) => { handleErr(err); })
  )
);
