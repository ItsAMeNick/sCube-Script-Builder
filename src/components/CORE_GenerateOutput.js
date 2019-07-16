import React, { Component } from 'react';

import { connect } from "react-redux";

class CORE_GenerateOutput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateScript = () => {
        let today = new Date();

        let script = "";
        let initialComment = "";
        let showDebug = "";

        if (this.props.state.event_type != null && this.props.state.structure.module != null) {
            initialComment += "//"+this.props.state.event_type+":"
                            +this.props.state.structure.module+"/"
                            +this.props.state.structure.type+"/"
                            +this.props.state.structure.subtype+"/"
                            +this.props.state.structure.category+"\n";
            initialComment += "Created: " + (today.getMonth()+1) +"/"
                                            + today.getDate() + "/"
                                            + today.getFullYear() + "\n";
            initialComment += "\n";
        }

        if (this.props.state.show_debug === true) {
            showDebug += "showDebug = true;\n";
            showDebug += "\n";
        }

        script += initialComment;
        script += showDebug;
        return script;
    }

    render() {
        return (
        <div>
            <button>Generate Script</button>
            <br/>
            <textarea rows="4" cols="50" value={this.generateScript()} readOnly={true} />
        </div>
        );
    }
}

const mapStateToProps = state => ({
    state: state
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_GenerateOutput);
