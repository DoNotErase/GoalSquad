
import axios from 'axios';

export const setUserData = userData => ({
  type: 'USER_LIFETIME_ACTIVITY',
  payload: {
    steps: userData.lifetime.total.steps,
    floors: userData.lifetime.total.floors,
    distance: userData.lifetime.total.distance,
  },
});

export const getLifetimeData = () => (
  dispatch => (
    axios.get('fitbit/lifetime')
      .then((res) => {
        if (res.data) {
          dispatch(setUserData(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      }))
);
