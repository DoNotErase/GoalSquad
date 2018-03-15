import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

const LandingPage = (props) => {
    
    let getData = function() {
        console.log('click')
        axios('/fitbit/lifetime')
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
    <div>
        <p> hello world </p>
        <a href="http://127.0.0.1:3000/auth/fitbit"><button> Connect to Fitbit </button></a>

        <button onClick={getData}> getLifeTimeData </button>
    </div> 
    ) 
}

const mapDispatchToProps = (dispatch) => {              //this grabs the dispatch method from store
    return bindActionCreators({}, dispatch);       //this attaches dispatch to an action (like login)
}

export default connect(null, mapDispatchToProps)(LandingPage);