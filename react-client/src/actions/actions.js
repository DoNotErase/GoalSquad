import axios from 'axios';

export const setUserData = userData => ({
  type: 'USER_LIFETIME_ACTIVITY',
  payload: {
    steps: userData.lifetime.total.steps,
    floors: userData.lifetime.total.floors,
    distance: userData.lifetime.total.distance,
  },
});

export const deauthorizeFitbit = () => (
  () => (
    axios.post('fitbit/deauthorize')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
        console.log(err);
      })
  )
);
