import React, { Component } from 'react';
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";

import CoreEvent from "./CORE_Event.js";
import CoreStructure from "./CORE_Structure.js";

class CORE extends Component {

    render() {
        return (
        <div>
        <Container>
            <CoreEvent/>
            <hr/>
            <CoreStructure/>
        </Container>
        </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE);
