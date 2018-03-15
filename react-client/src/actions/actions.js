export const textAction = (arg1, arg2) => (
    {
        type: 'TEST_TYPE',
        payload: {
            arg1: arg1,
            arg2: arg2
        }
    }
)

export const getLifetimeData = () => (
    function(dispatch) {
        axios.get('fitbit/lifetime')
            .then(data => {
                dispatch()
            })
            .catch(err => {

            })
    }
)