import axios from 'axios';

const setSquaddies = squaddieData => ({
  type: 'GET_SQUADDIES',
  payload: squaddieData,
});

const setYardSquaddies = yardSquaddieData => ({
  type: 'GET_YARD_SQUADDIES',
  payload: yardSquaddieData,
});

export const getUserSquaddies = () => (
  dispatch => (
    axios.get('/squaddies')
      .then((res) => {
        dispatch(setSquaddies(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
  )
);

export const getYardSquaddies = () => (
  dispatch => (
    axios.get('/yardSquad')
      .then((res) => {
        dispatch(setYardSquaddies(res.data));
      })
      .catch((err) => {
        console.log('error getting yard squaddies', err);
      })
  )
);

export const toggleYardStatus = () => (
  dispatch => (
    axios.patch('/yardSquad')
      .then((res) => {
        dispatch(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  )
);
