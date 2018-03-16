
import axios from 'axios';

export const textAction = (arg1, arg2) => (
  {
    type: 'TEST_TYPE',
    payload: {
      arg1: arg1,
      arg2: arg2,
    },
  }
);

const setUserData = userData => ({
  type: 'USER_LIFETIME_ACTIVITY',
  payload: {
    lifetimeSteps: userData.lifetime.total.steps,
    lifetimeFloors: userData.lifetime.total.floors,
    lifetimeDistance: userData.lifetime.total.distance,
  },
});

export const getLifetimeData = () => (
  dispatch => (
    axios.get('fitbit/lifetime')
      .then((data) => {
        console.log(data.data);
        if (data.data) {
          dispatch(setUserData(data.data));
        } else {
          console.log('probably no user');
        }
      })
      .catch((err) => {
        console.log(err);
      }))
);
