import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Form from "react-bootstrap/Form";

class REPORT_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newReports = _.cloneDeep(this.props.reports);
        let newValue = event.target.value;

        newReports[this.props.report_number][event.target.id] = newValue;
        this.props.update({
            reports: newReports
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

    render() {
        return (
        <tr>
            <td>{this.props.report_number}</td>
            <td>
                <Form.Control id="name" type="text" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id="module" type="text" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id="parameters" as="select" onChange={this.handleChange}>
                    {this.generateOptions("report")}
                </Form.Control>
            </td>
            {this.props.report_number !== 1 ?
            <td>
                <button onClick={() => {
                    this.props.delete(this.props.report_number);
                }}>
                    Delete
                </button>
            </td>
            : null}
        </tr>
        );
    }
}

const mapStateToProps = state => ({
    reports: state.reports,
    parameter_sets: state.parameter_sets
});

const mapDispatchToProps = dispatch => ({
    update: r => dispatch({
        type: "update_reports",
        payload: r
    }),
    delete: r => dispatch({
        type: "delete_report",
        payload: r
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(REPORT_Item);
