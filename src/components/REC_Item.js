import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Form from "react-bootstrap/Form";

class REC_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newRecords = _.cloneDeep(this.props.new_records);
        let newValue = event.target.value;
        let type = event.target.id.split("-");
        if (type[0] === "relationship") {
            newRecords[this.props.rec_number].relationship = newValue;
        } else if (["module","type","subtype","category"].includes(type[0])) {
            if (!newValue) newValue = "NA";
            newRecords[this.props.rec_number].structure[type[0]] = newValue;
        } else if (type[0] === "copy") {
            newRecords[this.props.rec_number].copy_data[type[1]] = event.target.checked;
        }
        this.props.update({
            new_records: newRecords
        });
        this.forceUpdate();
    };

    render() {
        return (
        <React.Fragment>
            <tr>
                <th>{this.props.rec_number}</th>
                <td>
                    Relationship:
                </td>
                <td>
                    <Form.Control id={"relationship-"+this.props.rec_number} as="select" onChange={this.handleChange}>
                        <option/>
                        <option label="Parent" value="parent"/>
                        <option label="Child" value="child"/>
                        <option label="None" value=""/>
                    </Form.Control>
                </td>
                {this.props.rec_number !== 1 ?
                <td>
                    <button onClick={() => {
                        this.props.delete(this.props.rec_number);
                    }}>
                        Delete
                    </button>
                </td>
                : null}
            </tr>
            <tr>
                <th>Structure: </th>
                <td>
                    <Form.Control id={"module-"+this.props.rec_number} placeholder="Module" type="text" onChange={this.handleChange}/>
                </td>
                <td>
                    <Form.Control id={"type-"+this.props.rec_number} placeholder="Type" type="text" onChange={this.handleChange}/>
                </td>
                <td>
                    <Form.Control id={"subtype-"+this.props.rec_number} placeholder="Sub-Type" type="text" onChange={this.handleChange}/>
                </td>
                <td>
                    <Form.Control id={"category-"+this.props.rec_number} placeholder="Category" type="text" onChange={this.handleChange}/>
                </td>
            </tr>
            <tr>
                <th>Copy: </th>
                <td>
                    <Form.Check id={"copy-asi-"+this.props.rec_number} label="ASI" onChange={this.handleChange}/>
                </td>
                <td>
                    <Form.Check id={"copy-asit-"+this.props.rec_number} label="ASIT" onChange={this.handleChange}/>
                </td>
                <td>
                    <Form.Check id={"copy-contacts-"+this.props.rec_number} label="Contacts" onChange={this.handleChange}/>
                </td>
                <td>
                    <Form.Check id={"copy-owners-"+this.props.rec_number} label="Owners" onChange={this.handleChange}/>
                </td>
            </tr>
            <tr>
                <th> </th>
                <td>
                    <Form.Check id={"copy-professionals-"+this.props.rec_number} label="Professionals" onChange={this.handleChange}/>
                </td>
                <td>
                    <Form.Check id={"copy-ph-"+this.props.rec_number} label="Place Holder" onChange={this.handleChange}/>
                </td>
                <td>
                    <Form.Check id={"copy-ph-"+this.props.rec_number} label="Place Holder" onChange={this.handleChange}/>
                </td>
                <td>
                    <Form.Check id={"copy-ph-"+this.props.rec_number} label="Place Holder" onChange={this.handleChange}/>
                </td>
            </tr>
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    new_records: state.new_records
});

const mapDispatchToProps = dispatch => ({
    update: r => dispatch({
        type: "update_new_records",
        payload: r
    }),
    delete: r => dispatch({
        type: "delete_new_record",
        payload: r
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(REC_Item);
