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
        script_text = "";

        switch(this.props.state.mode) {
            case "event_script": {
                if (this.props.state.event_type !== null && (this.props.state.structure.module !== "NA" && this.props.state.structure.module !== "")) {
                    this.generateEventScript();
                    break;
                } else {
                    //Must provide event and module before anything can generate.
                    return "Please provide an Event and a Module";
                }
            }
            case "function": {
                this.generateFunctionScript();
                break;
            }
            default:
                return "ERROR: A Script can not be generated for this mode"
        }

        this.parseParameters();
        this.parseConditions(1, "");

        return script_text;
    }

    generateFunctionScript = () => {

    }

    generateEventScript = () => {
        let today = new Date();

        script_text += "//"+this.props.state.event_type+":"
                            +this.props.state.structure.module+"/"
                            +this.props.state.structure.type+"/"
                            +this.props.state.structure.subtype+"/"
                            +this.props.state.structure.category+"\n";
        script_text += "//Created: " + (today.getMonth()+1) +"/"
                                            + today.getDate() + "/"
                                            + today.getFullYear() + "\n";
        script_text += "\n";

        script_text += "eval(\"INCLUDES_CUSTOMGENERATE_SCRIPTS\");\n"

        if (this.props.state.show_debug === true) {
            script_text += "showDebug = true;\n\n";
        } else {
            script_text += "showDebug = false;\n\n";
        }
    }

    parseParameters() {
        if (this.props.state.functionality.notifications) {
            let sets = this.props.state.parameter_sets;
            for (let s in sets) {
                this.appendScript("", "//Generating the Hashtable for Set: "+sets[s].key+", Named: "+sets[s].name+", Style: "+sets[s].style);
                let clean_name = null;
                if (sets[s].name) clean_name = sets[s].name.replace(/\W/g, '_');
                let hash_name = "set_"+sets[s].key+"_"+clean_name;
                if (sets[s].style === "email") {
                    this.appendScript("", "var "+hash_name+" = aa.util.newHashtable();\n");
                } else if (sets[s].style === "report") {
                    this.appendScript("", "var "+hash_name+" = aa.util.newHashMap();\n");
                }
                //First assign all variables
                for (let p in sets[s].parameters) {
                    let param = sets[s].parameters[p];
                    let param_ref = null;
                    if (param.ref) param_ref = param.ref.replace(/\W/g, '_');
                    let param_name = "set"+sets[s].key+"_p"+param.key+"_"+param_ref;
                    this.appendScript("","var "+param_name+" = "+param.script+";")
                }
                this.appendScript("",""); //Blank Line
                //Add to hash
                for (let p in sets[s].parameters) {
                    let param = sets[s].parameters[p];
                    let param_ref = null;
                    if (param.ref) param_ref = param.ref.replace(/\W/g, '_');
                    let param_name = "set"+sets[s].key+"_p"+param.key+"_"+param_ref;
                    if (sets[s].style === "email") {
                        this.appendScript("","addParameter("+hash_name+", \"$$"+param.ref+"$$\", "+param_name+");");
                    } else if (sets[s].style === "report") {
                        this.appendScript("",hash_name+".put(\""+param.ref+"\", "+param_name+");");
                    }
                }
                this.appendScript("",""); //Blank Line
            }
        }
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

            //Notifications
            for (let n in this.props.state.notifications) {
                this.appendScript("", this.genNoteText(n));
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
            let note = this.props.state.notifications[note_num];
            let contacts = note.contacts;
            let professionals = note.professionals;
            let reportName = null;
            if (this.props.state.notifications[note_num].report_name) {
                reportName = "\""+this.props.state.notifications[note_num].report_name+"\"";
            }
            let reportModule = null;
            if (this.props.state.notifications[note_num].report_module) {
                reportModule = "\""+this.props.state.notifications[note_num].report_module+"\"";
            }
            let reportParameter = null;
            if (this.props.state.notifications[note_num].report_parameters) {
                let params = this.props.state.parameter_sets[this.props.state.notifications[note_num].report_parameters];
                reportParameter = "set_" + params.key + "_" + params.name;
            }
            let emailParams = null;
            if (this.props.state.notifications[note_num].email_params) {
                let params = this.props.state.parameter_sets[this.props.state.notifications[note_num].email_params];
                emailParams = "set_" + params.key + "_" + params.name;
            }
            note_text += "sendNotificationSCUBE(\"" + note.template + "\", "
                                                + "\"" + note.from + "\", "
                                                + contacts + ", "
                                                + professionals + ", "
                                                + reportName + ", "
                                                + reportParameter + ", "
                                                + reportModule + ", "
                                                + "capId, "
                                                + emailParams + ");";
        }
        //sendNotificationSCUBE(notificationTemplateName, fromEmail, contacts, professionals, reportName, reportParameter, reportModule, capId, emailParams)
        return note_text;
    }

    render() {
        return (
        <div>
            {this.props.state.mode === "event_script" ? <div>
            { this.props.state.event_type !== null && (this.props.state.structure.module !== "NA" && this.props.state.structure.module !== "") ?
                <React.Fragment>
                    <p>Script Code: {this.genName(true)}</p>
                    <p>Script Name: {this.genName()}</p>
                </React.Fragment>
            : null}
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
