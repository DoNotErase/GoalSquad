import axios from 'axios';

const handleErr = (err) => {
  if (err.response && err.response.status === 401) {
    window.location.href = '/';
    alert('Sorry! Please log in.');
  } else {
    console.log(err);
  }
};

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

export const saveSquaddiePosition = position => (
  dispatch => (
    axios.patch('/saveposition', { pos: position })
      .then((res) => {
        dispatch(res.data);
      })
      .catch((err) => { handleErr(err); })
  )
);

export const getUserSquaddies = () => (
  dispatch => (
    axios.get('/squaddies')
      .then((res) => {
        dispatch(setSquaddies(res.data));
      })
      .catch((err) => { handleErr(err); })
  )
);

export const getYardSquaddies = () => (
  dispatch => (
    axios.get('/yardSquad')
      .then((res) => {
        dispatch(setYardSquaddies(res.data));
      })
      .catch((err) => { handleErr(err); })
  )
);

export const toggleYardStatus = userMonsterID => (
  dispatch => (
    axios.patch('/yardSquad', { monID: userMonsterID })
      .then((res) => {
        dispatch(toggleYardSquaddies(res.data));
      })
      .catch((err) => { handleErr(err); })
  )
);

export const changeName = (userMonsterID, newName) => (
  () => (
    axios.patch('/squaddie', {
      monID: userMonsterID,
      name: newName,
    })
      .catch((err) => { handleErr(err); })
  )
);
