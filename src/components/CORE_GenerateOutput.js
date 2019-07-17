import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

var script_text = "";

class CORE_GenerateOutput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.parseConditions = this.parseConditions.bind(this);
    }

    genName = u => {
        if (this.props.state.event_type != null && this.props.state.structure.module !== "NA") {
            let n = this.props.state.event_type+":"
                +this.props.state.structure.module+"/"
                +this.props.state.structure.type+"/"
                +this.props.state.structure.subtype+"/"
                +this.props.state.structure.category+"\n";
            if (u) n = n.toUpperCase();
            return n;
            }
    }

    generateScript = () => {
        let today = new Date();
        script_text = "";
        let initialComment_text = "";
        let showDebug_text = "";
        let fees_text = "";

        if (this.props.state.event_type != null && this.props.state.structure.module !== "NA") {
            initialComment_text += "//"+this.props.state.event_type+":"
                                +this.props.state.structure.module+"/"
                                +this.props.state.structure.type+"/"
                                +this.props.state.structure.subtype+"/"
                                +this.props.state.structure.category+"\n";
            initialComment_text += "//Created: " + (today.getMonth()+1) +"/"
                                                + today.getDate() + "/"
                                                + today.getFullYear() + "\n";
            initialComment_text += "\n";
        } else {
            //Must provide event and module before anything can generate.
            return "Please provide an Event and a Module.";
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

        //NEED TO ADD "DEFINE VARIABLES" !!!

        script_text += fees_text;
        this.parseConditions(1, "");
        return script_text;
    }

    parseConditions = (level, parent) => {
        //Create a list of condition only at my level.
        let conditions = Object.keys(this.props.state.conditions).map(c => {
            if (this.props.state.conditions[c].level === level) {
                return this.props.state.conditions[c];
            } else {
                return null;
            }
        }).filter(c => {
            return (c !== null);
        }).filter(c => {
            return (_.initial(c.key.split(".")).join(".") === parent);
        });
        //Escape
        if (conditions.length === 0) return null;
        var set_tab = "\t".repeat(level-1);
        var set_tab1 = "\t".repeat(level);
        for (let c in conditions) {
            script_text += set_tab + "if (";
            if (conditions[c].condition_type === "cf") {
                //Will use variable mapper later !!!
                script_text += "getAppSpecific(\"" + conditions[c].comparison_x + "\") ";
            } else {
                script_text += conditions[c].comparison_x + " ";
            }

            script_text += conditions[c].comparison_type + " ";

            script_text += "\"" + conditions[c].comparison_y + "\") {\n";

            this.parseConditions(level+1, conditions[c].key);

            for (let a in conditions[c].actions) {
                script_text += set_tab1 + conditions[c].actions[a] + "\n";
            }

            script_text += set_tab + "}\n"
        }
    }

    render() {
        return (
        <div>
            {/*<button>Generate Script</button>*/}
            <p>Script Code: {this.genName(true)}</p>
            <p>Script Name: {this.genName()}</p>
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
