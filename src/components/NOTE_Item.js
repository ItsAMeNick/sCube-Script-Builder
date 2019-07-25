import React, { Component } from 'react';
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";

class NOTE_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newNotifications = this.props.notifications;
        let newValue = event.target.value;
        if (event.target.id === "report_bool") {
            newValue = event.target.checked;
        }
        if (event.target.id === "contacts" || event.target.id === "professionals") {
            if (event.target.value.trim().toLowerCase() === "all") {
                newValue = "ALL";
            } else {
                let people = event.target.value;
                people = people.split(",").map(p => {
                    return p.trim();
                })
                newValue = JSON.stringify(people);
            }
        }
        newNotifications[this.props.note_number][event.target.id] = newValue;
        this.props.update({
            note: newNotifications
        });
        this.forceUpdate();
    };

    generateOptions() {
        let options = [<option key="0"/>];
        for (let s in this.props.parameter_sets) {
            let displayName = "Set " + this.props.parameter_sets[s].key + ": Unnamed"
            if (this.props.parameter_sets[s].name !== null) {
                displayName = "Set " + this.props.parameter_sets[s].key + ": " + this.props.parameter_sets[s].name;
            }
            options.push(<option label={displayName} value={this.props.parameter_sets[s].key} key={s}/>)
        }
        return options;
    }

    render() {
        return (
        <React.Fragment>
        <tr>
            <td>{this.props.note_number}</td>
            <td>
                <Form.Control id="template" type="text" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id="from" type="email" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id="contacts" type="text" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id="professionals" type="text" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Check id="report_bool" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id="email_params" as="select" onChange={this.handleChange}>
                    {this.generateOptions()}
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
                <td>
                    <Form.Control id="report_module" type="text" onChange={this.handleChange}/>
                </td>
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
                        {this.generateOptions()}
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
    parameter_sets: state.parameter_sets
});

const mapDispatchToProps = dispatch => ({
    update: n => dispatch({
        type: "update_notes",
        payload: n
    }),
    delete: n => dispatch({
        type: "delete_note",
        payload: n
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(NOTE_Item);
