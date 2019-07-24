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

    appendScript = (tab, text) => {
        //This function will add one line to the script text with tabbing of tab
        script_text += tab + text + "\n";
    }

    generateHelper() {
        switch(this.props.state.mode) {
            case "event_script": {
                return this.generateEventScript();
            }
            case "function": {
                return this.generateFunctionScript();
            }
            default:
                return "ERROR: A Script can not be generated for this mode"
        }
    }

    generateFunctionScript = () => {

    }

    generateEventScript = () => {
        let today = new Date();
        script_text = "";

        if (this.props.state.event_type != null && this.props.state.structure.module !== "NA") {
            script_text += "//"+this.props.state.event_type+":"
                                +this.props.state.structure.module+"/"
                                +this.props.state.structure.type+"/"
                                +this.props.state.structure.subtype+"/"
                                +this.props.state.structure.category+"\n";
            script_text += "//Created: " + (today.getMonth()+1) +"/"
                                                + today.getDate() + "/"
                                                + today.getFullYear() + "\n";
            script_text += "\n";
        } else {
            //Must provide event and module before anything can generate.
            return "Please provide an Event and a Module.";
        }

        script_text += "eval(\"INCLUDES_CUSTOMGENERATE_SCRIPTS\");\n"

        if (this.props.state.show_debug === true) {
            script_text += "showDebug = true;\n\n";
        } else {
            script_text += "showDebug = false;\n\n";
        }

        //NEED TO ADD "DEFINE VARIABLES" !!!
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
        var set_tab_in = set_tab + "\t";
        if (!this.props.state.functionality.conditions) {
            set_tab = "";
            set_tab_in = "";
        }

        //BEGIN CONDTION PARSEING
        if (this.props.state.functionality.conditions) {
            for (let c in conditions) {

                //Build the if statement
                let condition_start = "if (";
                if (conditions[c].condition_type === "cf") {
                    //Creating some kind of variable mapper would look nice
                    condition_start += "getAppSpecific(\"" + conditions[c].comparison_x + "\") ";
                } else {
                    condition_start += conditions[c].comparison_x + " ";
                }
                condition_start += conditions[c].comparison_type + " ";
                condition_start += "\"" + conditions[c].comparison_y + "\")";

                this.appendScript(set_tab, condition_start);
                this.appendScript(set_tab, "{");

                for (let a in conditions[c].actions) {
                    this.parseAction(set_tab_in, conditions[c].actions[a]);
                }

                this.parseConditions(level+1, conditions[c].key);

                this.appendScript(set_tab, "}");
            }
        } else {
            //Parse everything individually
            //StatusItem
            for (let s in this.props.state.status) {
                this.appendScript("", this.genStatusText(s));
            }

            //Fees
            for (let f in this.props.state.fees) {
                this.appendScript("", this.genFeeText(f));
            }
        }
    }

    parseAction = (tab, action) => {
        if (action === null) {
            return null;
        }
        action = action.split("-");
        let action_text = "";
        switch (action[0]) {
            case "Status": {
                action_text = this.genStatusText(action[1]);
                break;
            }
            case "Fee": {
                action_text = this.genFeeText(action[1]);
                break;
            }
            case "Notification": {
                action_text = this.genNoteText(action[1]);
                break;
            }
            default: return null;
        }
        this.appendScript(tab, action_text);
    }

    genStatusText = status_num => {
        let status_text = "";
        if (this.props.state.functionality.status_update === true) {
            let stat = this.props.state.status[status_num];
            let comment_text = "";
            let optional_text = "";
            //Fix up the parameters
            if (!(stat.comment === "" || stat.comment === null)) {
                comment_text = " - " + stat.comment;
            }
            if (stat.cap !== null && stat.cap !== "" && stat.optional_cap === true) {
                optional_text = ", " + stat.cap.toString();
            }
            status_text += "updateAppStatus(\"" + stat.label + "\", "
                                    + "\"Updated via Script" + comment_text + "\""
                                    + optional_text
                                    + ");"
        }
        return status_text;
    }

    genFeeText = fee_num => {
        let fees_text = "";
        if (this.props.state.functionality.fees === true) {
            let fee = this.props.state.fees[fee_num];
            //Fix up the parameters
            fees_text += "updateFee(\"" + fee.code + "\", "
                                    + "\"" + fee.schedule + "\", "
                                    + "\"" + fee.period + "\", "
                                    + fee.quantity + ", "
                                    + "\"" + fee.invoice + "\");"
        }
        return fees_text;
    }

    genNoteText = note_num => {
        let note_text = "";
        if (this.props.state.functionality.notifications) {
            console.log(this.props.state.notifications[note_num])
            let note = this.props.state.notifications[note_num];
            let contacts = note.contacts;
            let professionals = note.professionals;
            let reportName = null;
            let reportModule = null;
            let reportParameter = null;
            let emailParams = null;
            note_text += "sendNotificationSCUBE(\"" + note.template + "\", "
                                                + "\"" + note.from + "\", "
                                                + "\"" + contacts + "\", "
                                                + "\"" + professionals + "\", "
                                                + "\"" + reportName + "\", "
                                                + reportParameter + ", "
                                                + "\"" + reportModule + "\", "
                                                + "capId, "
                                                + emailParams;
        }
        //sendNotificationSCUBE(notificationTemplateName, fromEmail, contacts, professionals, reportName, reportParameter, reportModule, capId, emailParams)
        return note_text;
    }

    render() {
        return (
        <div>
            {this.props.state.mode === "event_script" ? <div>
                <p>Script Code: {this.genName(true)}</p>
                <p>Script Name: {this.genName()}</p>
            </div> : null }
            {this.props.state.mode === "function" ? <div>
                <p>Function Name: {this.props.state.mode}</p>
            </div> : null }
            {this.props.state.mode === "batch_script" ? <div>
            </div> : null }
            {this.props.state.mode === "pageflow" ? <div>
            </div> : null }
            <textarea rows="20" cols="100" value={this.generateHelper()} readOnly={true} />
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
