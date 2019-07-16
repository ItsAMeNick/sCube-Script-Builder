import React, { Component } from 'react';
import { connect } from "react-redux";

class CONDIT extends Component {

    render() {
        return (
        <div>
            <hr/>
            <h1>HERE</h1>
        </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CONDIT);
