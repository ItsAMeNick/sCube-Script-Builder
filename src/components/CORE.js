import React, { Component } from 'react';
import { connect } from "react-redux";

import ModeEvent from "./MODE_Event.js";
import ModeStructure from "./MODE_Structure.js";
import ModeFunction from "./MODE_Function.js";

class CORE extends Component {

    render() {
        return (
        <div>
            {this.props.mode === "event_script" ? <React.Fragment>
                <ModeEvent/>
                <hr/>
                <ModeStructure/>
            </React.Fragment> : null}
            {this.props.mode === "function" ? <React.Fragment>
                <ModeEvent/>
                <hr/>
                <ModeFunction/>
            </React.Fragment> : null}
            {this.props.mode === "batch_script" ? <React.Fragment>

            </React.Fragment> : null}
            {this.props.mode === "pageflow" ? <React.Fragment>

            </React.Fragment> : null}
        </div>
        );
    }
}

const mapStateToProps = state => ({
    mode: state.mode
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE);
