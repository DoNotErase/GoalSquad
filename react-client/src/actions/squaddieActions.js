import axios from 'axios';

const setSquaddies = squaddieData => ({
  type: 'GET_SQUADDIES',
  payload: squaddieData,
});

export const getUserSquaddies = () => (
  dispatch => (
    axios.get('/squaddies')
      .then((res) => {
        console.log(res.data);
        dispatch(setSquaddies(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
  )
);
