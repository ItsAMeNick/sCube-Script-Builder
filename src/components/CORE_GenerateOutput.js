import React, { Component } from 'react';

import { connect } from "react-redux";

class CORE_GenerateOutput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateScript = () => {
        let today = new Date();

        let script_text = "";
        let initialComment_text = "";
        let showDebug_text = "";
        let fees_text = "";

        if (this.props.state.event_type != null && this.props.state.structure.module !== "NA") {
            initialComment_text += "//"+this.props.state.event_type+":"
                                +this.props.state.structure.module+"/"
                                +this.props.state.structure.type+"/"
                                +this.props.state.structure.subtype+"/"
                                +this.props.state.structure.category+"\n";
            initialComment_text += "Created: " + (today.getMonth()+1) +"/"
                                                + today.getDate() + "/"
                                                + today.getFullYear() + "\n";
            initialComment_text += "\n";
        } else {
            //Must provide event and module before anything can generate.
            return "";
        }

        if (this.props.state.show_debug === true) {
            showDebug_text += "showDebug = true;\n";
            showDebug_text += "\n";
        }

        if (this.props.state.functionality.fees === true) {
            let local_fees = this.props.state.fees;
            for (var f in local_fees) {
                if (local_fees[f].invoice === null) local_fees[f].invoice = "N";
                if (local_fees[f].duplicate === null) local_fees[f].duplicate = "Y";
                fees_text += "updateFee(\"" + local_fees[f].code + "\", "
                                        + "\"" + local_fees[f].schedule + "\", "
                                        + "\"" + local_fees[f].period + "\", "
                                        + local_fees[f].quantity + ", "
                                        + "\"" + local_fees[f].invoice + "\", "
                                        + "\"" + local_fees[f].duplicate + "\", "
                                        + local_fees[f].sequence + ");\n"
            }
            fees_text += "\n";
        }

        script_text += initialComment_text;
        script_text += showDebug_text;
        script_text += fees_text;
        return script_text;
    }

    render() {
        return (
        <div>
            <button>Generate Script</button>
            <br/>
            <textarea rows="20" cols="100" value={this.generateScript()} readOnly={true} />
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
