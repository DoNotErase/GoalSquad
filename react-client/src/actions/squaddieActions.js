import axios from 'axios';

const setSquaddies = squaddieData => ({
  type: 'GET_SQUADDIES',
  payload: squaddieData,
});

const setYardSquaddies = yardSquaddieData => ({
  type: 'GET_YARD_SQUADDIES',
  payload: yardSquaddieData,
});

const toggleYardSquaddies = squaddieData => ({
  type: 'TOGGLE_YARD_STATUS',
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

export const toggleYardStatus = monsterID => (
  dispatch => (
    axios.patch('/yardSquad', { monID: monsterID })
      .then((res) => {
        dispatch(toggleYardSquaddies(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
  )
);
