import axios from 'axios';
import { NavigationActions } from 'react-navigation';

export const setUserData = userData => ({
  type: 'USER_LIFETIME_ACTIVITY',
  payload: {
    steps: userData.lifetime.total.steps,
    floors: userData.lifetime.total.floors,
    distance: userData.lifetime.total.distance,
  },
});

export const updateCustomTime = newTime => ({
  type: 'NEW_TIMER_2',
  payload: newTime,
});

export const deauthorizeFitbit = () => (
  () => (
    axios.post('fitbit/deauthorize')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = '/';
          alert('Sorry! Please log in.');
        }
      })
  )
);

const setStats = deets => ({ type: 'SET_DEETS', payload: deets });

export const fetchStats = () => (
  dispatch => (
    axios.get('userDeets')
      .then((res) => {
        dispatch(setStats(res.data));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = '/';
          alert('Sorry! Please log in.');
        }
      })
  )
);
