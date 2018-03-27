import axios from 'axios';

const setSquaddies = squaddieData => ({
  type: 'GET_SQUADDIES',
  payload: squaddieData,
});

export const getUserSquaddies = () => (
  dispatch => (
    axios.get('/squaddies')
      .then((res) => {
        dispatch(setSquaddies(res.data));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          axios.get('/');
        }
      })
  )
);
