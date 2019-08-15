import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Form from "react-bootstrap/Form";

class NOTE_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleMulti = this.handleMulti.bind(this);
    }

    handleChange(event) {
        let newNotifications = _.cloneDeep(this.props.notifications);
        let newValue = "";
        if (event.target.id === "report_bool") {
            newValue = event.target.checked;
        }
        if (event.target.id === "contacts" || event.target.id === "professionals") {
            if (event.target.value.trim().toLowerCase() === "all") {
                newValue = "\"ALL\"";
            } else {
                let people = event.target.value;
                people = people.split(",").map(p => {
                    return p.trim();
                })
                newValue = JSON.stringify(people);
            }
        } else {
            newValue = event.target.value;
        }

        if (event.target.id === "template" && this.props.loaded_notes) {
            newNotifications[this.props.note_number].template = this.props.loaded_notes[event.target.value].template;
            newNotifications[this.props.note_number].from = this.props.loaded_notes[event.target.value].from;
        } else {
            newNotifications[this.props.note_number][event.target.id] = newValue;
        }

        this.props.update({
            notifications: newNotifications
        });
        this.forceUpdate();
    };

    generateOptions(type) {
        let options = [<option key="0"/>];
        for (let s in this.props.parameter_sets) {
            if (this.props.parameter_sets[s].style !== type) continue;
            let displayName = "Set " + this.props.parameter_sets[s].key + ": Unnamed"
            if (this.props.parameter_sets[s].name !== null) {
                displayName = "Set " + this.props.parameter_sets[s].key + ": " + this.props.parameter_sets[s].name;
            }
            options.push(<option label={displayName} value={this.props.parameter_sets[s].key} key={s}/>)
        }
        return options;
    }

    handleMulti(event) {
        let newNotifications = _.cloneDeep(this.props.notifications);
        let selected;
        if (!this.props.notifications[this.props.note_number][event.target.id]) {
            selected = JSON.stringify([event.target.value]);
        } else {
            selected = [...event.target.options].filter(o => {
                return o.selected;
            }).map(o => {
                return o.label;
            })
            selected = JSON.stringify(selected);
        }
        newNotifications[this.props.note_number][event.target.id] = selected;
        this.props.update({
            notifications: newNotifications
        });
    }

    loadOptionsFromData(type) {
        let loaded_data;
        if (type === "contacts") {
            loaded_data = this.props.loaded_contacts;
        } else if (type === "lps") {
            loaded_data = this.props.loaded_lps;
        } else {
            return <option/>
        }

        let used_types = []
        let types = loaded_data.filter(item => {
            if (used_types.includes(item.value)) {
                return false;
            } else {
                used_types.push(item.value);
                return true;
            }
        }).sort((item1, item2) => {
            return item1.value.localeCompare(item2.value);
        }).map(item => {
            return <option key={item.key} label={item.value} value={item.value}/>
        });
        return types;
    }

    loadNotesFromData(type) {
        let used_notes = []
        let notes = [<option key={-1}/>].concat(this.props.loaded_notes.filter(item => {
            if (used_notes.includes(item.template)) {
                return false;
            } else {
                used_notes.push(item.template);
                return true;
            }
        }).sort((item1, item2) => {
            return item1.template.localeCompare(item2.template);
        }).map(item => {
            return <option key={item.key} label={item.template} value={item.key}/>
        }));
        return notes;
    }

    loadModules() {
        let used_modules = []
        let modules = [<option key={-1}/>].concat(this.props.loaded_data.filter(item => {
            if (used_modules.includes(item.module)) {
                return false;
            } else {
                used_modules.push(item.module);
                return true;
            }
        }).sort((item1, item2) => {
            return item1.module.localeCompare(item2.module);
        }).map(item => {
            return <option key={item.key} label={item.module} value={item.module}/>
        }));
        return modules;
    }

    render() {
        return (
        <React.Fragment>
        <tr>
            <td>{this.props.note_number}</td>
            {this.props.loaded_notes ?
            <td>
                <Form.Control id="template" as="select" onChange={this.handleChange}>
                    {this.loadNotesFromData()}
                </Form.Control>
            </td>
            :
            <td>
                <Form.Control id="template" type="text" onChange={this.handleChange}/>
            </td>
            }
            {this.props.loaded_notes ?
                <td>
                    <Form.Control id="from" type="email" readOnly value={this.props.notifications[this.props.note_number]["from"] ? this.props.notifications[this.props.note_number]["from"] : ""}/>
                </td>
            :
                <td>
                    <Form.Control id="from_READONLY" type="email" onChange={this.handleChange}/>
                </td>
            }
            {this.props.loaded_contacts ?
            <td>
                <Form.Control id="contacts" as="select" multiple onChange={this.handleMulti}>
                    {this.loadOptionsFromData("contacts")}
                </Form.Control>
            </td>
            :
            <td>
                <Form.Control id="contacts" type="text" onChange={this.handleChange}/>
            </td>
            }
            {this.props.loaded_lps ?
            <td>
                <Form.Control id="professionals" as="select" multiple onChange={this.handleMulti}>
                    {this.loadOptionsFromData("lps")}
                </Form.Control>
            </td>
            :
            <td>
                <Form.Control id="professionals" type="text" onChange={this.handleChange}/>
            </td>
            }
            <td>
                <Form.Check id="report_bool" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id="email_params" as="select" onChange={this.handleChange}>
                    {this.generateOptions("email")}
                </Form.Control>
            </td>
            {this.props.note_number !== 1 ?
            <td>
                <button onClick={() => {
                    this.props.delete(this.props.note_number);
                }}>
                    Delete
                </button>
            </td>
            : null}
        </tr>
        {this.props.notifications[this.props.note_number].report_bool ?
            <React.Fragment>
            <tr>
                <td colSpan="4"/>
                <td colSpan="1">
                    <p>Report&nbsp;Module:</p>
                </td>
                {this.props.loaded_data ?
                    <td>
                        <Form.Control id="report_module" as="select" onChange={this.handleChange}>
                            {this.loadModules()}
                        </Form.Control>
                    </td>
                :
                    <td>
                        <Form.Control id="report_module" type="text" onChange={this.handleChange}/>
                    </td>
                }
            </tr>
            <tr>
                <td colSpan="4"/>
                <td colSpan="1">
                    Report&nbsp;Name:
                </td>
                <td>
                    <Form.Control id="report_name" type="text" onChange={this.handleChange}/>
                </td>
            </tr>
            <tr>
                <td colSpan="4"/>
                <td colSpan="1">
                    <p>Report&nbsp;Parameters:</p>
                </td>
                <td>
                    <Form.Control id="report_parameters" as="select" onChange={this.handleChange}>
                        {this.generateOptions("report")}
                    </Form.Control>
                </td>
            </tr>
            </React.Fragment>
        : null}
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    notifications: state.notifications,
    parameter_sets: state.parameter_sets,
    loaded_contacts: state.loaded_data.contact_types,
    loaded_lps: state.loaded_data.lp_types,
    loaded_notes: state.loaded_data.notes,
    loaded_data: state.loaded_data.caps
});

const mapDispatchToProps = dispatch => ({
    update: notifications => dispatch({
        type: "update_notes",
        payload: notifications
    }),
    delete: n => dispatch({
        type: "delete_note",
        payload: n
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(NOTE_Item);
