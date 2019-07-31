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
                    this.generateEventScriptStart();
                    this.parseParameters(1);
                    this.parseConditions(1, "", 1);
                    this.generateEventScriptEnd();
                    break;
                } else {
                    //Must provide event and module before anything can generate.
                    return "Please provide an Event and a Module.";
                }
            }
            case "function": {
                if (this.props.state.mode_extras.function_name) {
                    this.generateFunctionScriptStart();
                    this.parseParameters(1);
                    this.parseConditions(1, "", 1);
                    this.generateFunctionScriptEnd();
                    break;
                } else {
                    //Must provide function name
                    return "Please provide a Name for the function.";
                }
            }
            default:
                return "ERROR: A Script can not be generated for this mode"
        }
        return script_text;
    }

    generateFunctionScriptStart = () => {
        script_text += "function "+this.props.state.mode_extras.function_name.replace(/\W/g, '_')+"() {\n";

        script_text += "\t//This Function REQUIRES \"INCLUDES_CUSTOM_GENERATED_SCRIPTS\"\n\n"

        script_text += "\t/*\n";
            let today = new Date();
            script_text += "\tCreated: " + (today.getMonth()+1) +"/"
                                                + today.getDate() + "/"
                                                + today.getFullYear() + "\n";
            script_text += "\t" + this.props.state.mode_extras.function_desc.replace(/(\.+)\s/g,".\n").replace(/\n/g,"\n\t") + "\n";
        script_text += "\t*/\n\n";

        if (this.props.state.show_debug === true) {
            script_text += "\tshowDebug = true;\n";
        } else {
            script_text += "\tshowDebug = false;\n";
        }
    }

    generateFunctionScriptEnd = () => {
        this.appendScript("", "}");
    }

    generateEventScriptStart = () => {
        let today = new Date();

        let app_string = this.props.state.structure.module+"/"
                        +this.props.state.structure.type+"/"
                        +this.props.state.structure.subtype+"/"
                        +this.props.state.structure.category

        script_text += "//"+this.props.state.event_type+":"
                            +app_string+"\n";
        script_text += "//Created: " + (today.getMonth()+1) +"/"
                                            + today.getDate() + "/"
                                            + today.getFullYear() + "\n";

        script_text += "if (appMatch(\"" + app_string + "\"))\n{\n"

        script_text += "\teval(\"INCLUDES_CUSTOM_GENERATED_SCRIPTS\");\n"

        if (this.props.state.show_debug === true) {
            script_text += "\tshowDebug = true;\n\n";
        } else {
            script_text += "\tshowDebug = false;\n\n";
        }
    }

    generateEventScriptEnd = () => {
        this.appendScript("", "}");
        this.appendScript("", "//End of "+this.genName());
    }

    parseParameters(initialTab=0) {
        let set_tab = "\t".repeat(initialTab);
        if (this.props.state.functionality.notifications) {
            let sets = this.props.state.parameter_sets;
            for (let s in sets) {
                this.appendScript(set_tab, "//Generating the Hashtable for Set: "+sets[s].key+", Named: "+sets[s].name+", Style: "+sets[s].style);
                let clean_name = null;
                if (sets[s].name) clean_name = sets[s].name.replace(/\W/g, '_');
                let hash_name = "set_"+sets[s].key+"_"+clean_name;
                if (sets[s].style === "email") {
                    this.appendScript(set_tab, "var "+hash_name+" = aa.util.newHashtable();\n");
                } else if (sets[s].style === "report") {
                    this.appendScript(set_tab, "var "+hash_name+" = aa.util.newHashMap();\n");
                }
                //First assign all variables
                for (let p in sets[s].parameters) {
                    let param = sets[s].parameters[p];
                    let param_ref = null;
                    if (param.ref) param_ref = param.ref.replace(/\W/g, '_');
                    let param_name = "set"+sets[s].key+"_p"+param.key+"_"+param_ref;
                    this.appendScript(set_tab,"var "+param_name+" = "+param.script+";")
                }
                this.appendScript(set_tab,""); //Blank Line
                //Add to hash
                for (let p in sets[s].parameters) {
                    let param = sets[s].parameters[p];
                    let param_ref = null;
                    if (param.ref) param_ref = param.ref.replace(/\W/g, '_');
                    let param_name = "set"+sets[s].key+"_p"+param.key+"_"+param_ref;
                    if (sets[s].style === "email") {
                        this.appendScript(set_tab,"addParameter("+hash_name+", \"$$"+param.ref+"$$\", "+param_name+");");
                    } else if (sets[s].style === "report") {
                        this.appendScript(set_tab,hash_name+".put(\""+param.ref+"\", "+param_name+");");
                    }
                }
                this.appendScript(set_tab,""); //Blank Line
            }
        }
    }

    parseConditions = (level, parent, initialTab=0) => {
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

        var set_tab = "\t".repeat(initialTab+level-1);
        var set_tab_in = set_tab + "\t";
        if (!this.props.state.functionality.conditions) {
            set_tab = "\t".repeat(initialTab);
            set_tab_in = "\t".repeat(initialTab);
        }

        //BEGIN CONDTION PARSEING
        if (this.props.state.functionality.conditions) {
            for (let c in conditions) {

                //Build the if statement
                let condition_start = "if (";
                condition_start += conditions[c].comparison_x + " ";
                condition_start += conditions[c].comparison_type + " ";
                condition_start += "\"" + conditions[c].comparison_y + "\")";

                this.appendScript(set_tab, condition_start);
                this.appendScript(set_tab, "{");

                for (let a in conditions[c].actions) {
                    this.parseAction(set_tab_in, conditions[c].actions[a]);
                }

                this.parseConditions(level+1, conditions[c].key, initialTab);

                this.appendScript(set_tab, "}");
            }
        } else {
            //Parse everything individually
            //StatusItem
            if (this.props.state.functionality.status === true) {
                for (let s in this.props.state.status) {
                    this.appendScript(set_tab, this.genStatusText(s));
                }
            }

            //Fees
            if (this.props.state.functionality.fees === true) {
                for (let f in this.props.state.fees) {
                    this.appendScript(set_tab, this.genFeeText(f));
                }
            }

            //Notifications
            if (this.props.state.functionality.notifications === true) {
                for (let n in this.props.state.notifications) {
                    this.appendScript(set_tab, this.genNoteText(n));
                }
            }

            //Workflows
            if (this.props.state.functionality.workflow === true) {
                for (let w in this.props.state.workflows) {
                    this.appendScript(set_tab, this.genWorkText(w));
                }
            }

            //Inspections
            if (this.props.state.functionality.inspections === true) {
                for (let i in this.props.state.inspections) {
                    this.appendScript(set_tab, this.genInspectionText(i));
                }
            }

            //Cancels
            if (this.props.state.functionality.cancel === true
                && ((this.props.state.event_type
                && ["ASB", "IRSB", "WTUB"].includes(this.props.state.event_type))
                || this.props.state.mode === "pageflow"))
            {
                for (let c in this.props.state.cancels) {
                    this.appendScript(set_tab, this.genCancelText(c));
                }
            }

            //ASIs
            if (this.props.state.functionality.asi === true) {
                for (let a in this.props.state.asis) {
                    this.appendScript(set_tab, this.genASIText(a));
                }
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
                action_text = this.genFeeText(action[1], tab);
                break;
            }
            case "Notification": {
                action_text = this.genNoteText(action[1]);
                break;
            }
            case "Workflow": {
                action_text = this.genWorkText(action[1]);
                break;
            }
            case "Inspection": {
                action_text = this.genInspectionText(action[1]);
                break;
            }
            case "Cancelation": {
                action_text = this.genCancelText(action[1], tab);
                break;
            }
            case "ASI": {
                action_text = this.genASIText(action[1], tab);
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

    genFeeText = (fee_num, tab="") => {
        let fees_text = "";
        if (this.props.state.functionality.fees === true) {
            let fee = this.props.state.fees[fee_num];
            if (!isNaN(parseFloat(fee.quantity))) {
                fees_text += "updateFee(\"" + fee.code + "\", "
                            + "\"" + fee.schedule + "\", "
                            + "\"" + fee.period + "\", "
                            + fee.quantity + ", "
                            + "\"" + fee.invoice + "\");"
            } else {
                fees_text += "var fee_"+fee_num+" = getAppSpecific(\""+fee.quantity+"\");\n";
                fees_text += tab;
                fees_text += "updateFee(\"" + fee.code + "\", "
                            + "\"" + fee.schedule + "\", "
                            + "\"" + fee.period + "\", "
                            + "fee_"+fee_num+", "
                            + "\"" + fee.invoice + "\");"
            }
        }
        return fees_text;
    }

    genNoteText = note_num => {
        let note_text = "";
        if (this.props.state.functionality.notifications === true) {
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
        return note_text;
    }

    genWorkText = work_num => {
        let work_text = "";
        if (this.props.state.functionality.workflow === true) {
            let work = this.props.state.workflows[work_num];
            if (work.action === "Open") {
                work_text += "activateTask(\""+work.task+"\");";
            } else if (work.action === "Close") {
                work_text += "closeTask(\""+work.task+"\", "
                            + "\"" + work.status + "\", "
                            + "\"" + work.comment + "\", "
                            + "null);"
            } else {
                work_text += ""
            }
        }
        return work_text;
    }

    genInspectionText = insp_num => {
        let insp_text = "";
        if (this.props.state.functionality.inspections === true) {
            let insp = this.props.state.inspections[insp_num];
            insp_text += "scheduleInspect(capId, \""
                        + insp.type + "\", "
                        + insp.days_out + ");";
        }
        return insp_text;
    }

    genCancelText = (cancel_num, tab="") => {
        let cancel_text = "";
        if (this.props.state.functionality.cancel === true
            && ((this.props.state.event_type
            && ["ASB", "IRSB", "WTUB"].includes(this.props.state.event_type))
            || this.props.state.mode === "pageflow"))
        {
            cancel_text = "";
            let cancel = this.props.state.cancels[cancel_num];
            cancel_text += "cancel = true;\n";
            cancel_text += tab + "showMessage = true;\n";
            cancel_text += tab + "comment = \"" + cancel.message + "\";";
        }
        return cancel_text;
    }

    genASIText = (asi_num) => {
        let asi_text = "";
        if (this.props.state.functionality.asi === true) {
            let asi = this.props.state.asis[asi_num];
            asi_text += "editAppSpecific(\""
                        + asi.name + "\", \""
                        + asi.value + "\");";
        }
        return asi_text;
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
