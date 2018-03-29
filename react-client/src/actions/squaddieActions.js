import axios from 'axios';

const isLoading = () => ({ type: 'IS_LOADING', payload: true });
const doneLoading = () => ({ type: 'DONE_LOADING', payload: false });

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
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          window.location.href = '/';
          alert('Sorry! Please log in.');
        }
      })
  )
)

export const getUserSquaddies = () => (
  (dispatch) => {
    dispatch(isLoading());
    return axios.get('/squaddies')
      .then((res) => {
        dispatch(setSquaddies(res.data));
        dispatch(doneLoading());
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          window.location.href = '/';
          alert('Sorry! Please log in.');
        }
      })
    }
);

export const getYardSquaddies = () => (
  dispatch => (
    axios.get('/yardSquad')
      .then((res) => {
        dispatch(setYardSquaddies(res.data));
      })
      .catch((err) => {
        console.log('error getting yard squaddies', err);
        if (err.response.status === 401) {
          window.location.href = '/';
          alert('Sorry! Please log in.');
        }
      })
  )
);

export const toggleYardStatus = userMonsterID => (
  dispatch => (
    axios.patch('/yardSquad', { monID: userMonsterID })
      .then((res) => {
        dispatch(toggleYardSquaddies(res.data));
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          window.location.href = '/';
          alert('Sorry! Please log in.');
        }
      })
  )
);

export const changeName = (userMonsterID, newName) => (
  dispatch => (
    axios.patch('/squaddie', {
      monID: userMonsterID,
      name: newName,
    })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = '/';
          alert('Sorry! Please log in.');
        } else {
          console.log(err);
        }
      })
  )
);
