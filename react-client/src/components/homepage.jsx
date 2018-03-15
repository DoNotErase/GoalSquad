import React from 'react';
import { connect } from 'react-redux';

const HomePage = (props) => {
    render(
        <div>
            "Hello World"
        </div>
    ) 
}

const mapDispatchToProps = (dispatch) => {              //this grabs the dispatch method from store
    return bindActionCreators({login}, dispatch);       //this attaches dispatch to an action (like login)
}

export default connect(null, mapDispatchToProps)(HomePage);