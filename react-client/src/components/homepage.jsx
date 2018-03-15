import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const HomePage = (props) => {
    return (
        <div>
            "Hello World"
        </div>
    ) 
}

const mapDispatchToProps = (dispatch) => {              //this grabs the dispatch method from store
    return bindActionCreators({}, dispatch);       //this attaches dispatch to an action (like login)
}

export default connect(null, mapDispatchToProps)(HomePage);