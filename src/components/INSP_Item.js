import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Form from "react-bootstrap/Form";

class INSP_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newInspections = _.cloneDeep(this.props.inspections);
        let newValue = event.target.value;
        newInspections[this.props.insp_number][event.target.id] = newValue;
        this.props.update({
            inspections: newInspections
        });
    };

    loadOptionsFromData() {
        return [<option key={-1}/>].concat(this.props.loaded_inspections.filter(item => {
            if (this.props.loaded_id >= 0) {
                return this.props.loaded_data[this.props.loaded_id].insp_code === item.code;
            } else {
                return true;
            }
        }).sort((item1, item2) => {
            if (item1.code.localeCompare(item2.code) === 0) {
                if (item1.group.localeCompare(item2.group) === 0) {
                    return item1.type.localeCompare(item2.type);
                } else {
                    return item1.group.localeCompare(item2.group)
                }
            } else {
                return item1.code.localeCompare(item2.code);
            }
        }).map(item => {
            return <option key={item.key} label={item.code+" - "+item.group+" - "+item.type} value={item.type}/>
        }));
    }

    render() {
        return (
        <tr>
            <td>{this.props.insp_number}</td>
            {this.props.loaded_inspections ?
                <td>
                    <Form.Control id="type" as="select" onChange={this.handleChange}>
                        {this.loadOptionsFromData()}
                    </Form.Control>
                </td>
            :
                <td>
                    <Form.Control id="type" onChange={this.handleChange}/>
                </td>
            }
            <td>
                <Form.Control id="days_out" type="number" onChange={this.handleChange}/>
            </td>
            {this.props.insp_number !== 1 ?
            <td>
                <button onClick={() => {
                    this.props.delete(this.props.insp_number);
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
    inspections: state.inspections,
    loaded_data: state.loaded_data.caps,
    loaded_id: state.structure.loaded_id,
    loaded_inspections: state.loaded_data.inspections
});

const mapDispatchToProps = dispatch => ({
    update: i => dispatch({
        type: "update_inspections",
        payload: i
    }),
    delete: i => dispatch({
        type: "delete_inspection",
        payload: i
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(INSP_Item);
