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

    loadTypes() {
        let types = [<option key={-1}/>]
        if (this.props.new_records[this.props.rec_number].structure.module) {
            let used_types = []
            types = types.concat(this.props.loaded_data.filter(item => {
                return item.module === this.props.new_records[this.props.rec_number].structure.module;
            }).filter(item => {
                if (used_types.includes(item.type)) {
                    return false;
                } else {
                    used_types.push(item.type);
                    return true;
                }
            }).sort((item1, item2) => {
                return item1.type.localeCompare(item2.type);
            }).map(item => {
                return <option key={item.key} label={item.type} value={item.type}/>
            }));
        }
        return types;
    }

    loadSubTypes() {
        let subtypes = [<option key={-1}/>]
        if (this.props.new_records[this.props.rec_number].structure.type) {
            let used_subtypes = []
            subtypes = subtypes.concat(this.props.loaded_data.filter(item => {
                return item.type === this.props.new_records[this.props.rec_number].structure.type;
            }).filter(item => {
                if (used_subtypes.includes(item.subtype)) {
                    return false;
                } else {
                    used_subtypes.push(item.subtype);
                    return true;
                }
            }).sort((item1, item2) => {
                return item1.subtype.localeCompare(item2.subtype);
            }).map(item => {
                return <option key={item.key} label={item.subtype} value={item.subtype}/>
            }));
        }
        return subtypes;
    }

    loadCategories() {
        let categories = [<option key={-1}/>];
        if (this.props.new_records[this.props.rec_number].structure.subtype) {
            let used_categories = []
            categories = categories.concat(this.props.loaded_data.filter(item => {
                return item.subtype === this.props.new_records[this.props.rec_number].structure.subtype;
            }).filter(item => {
                if (used_categories.includes(item.category)) {
                    return false;
                } else {
                    used_categories.push(item.category);
                    return true;
                }
            }).sort((item1, item2) => {
                return item1.category.localeCompare(item2.category);
            }).map(item => {
                return <option key={item.key} label={item.category} value={item.category}/>
            }));
        }
        return categories;
    }

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
                <td>{this.props.loaded_data ?
                    <Form.Control id={"module-"+this.props.rec_number} as="select" onChange={this.handleChange}>
                        {this.loadModules()}
                    </Form.Control>
                :
                    <Form.Control id={"module-"+this.props.rec_number} placeholder="Module" type="text" onChange={this.handleChange}/>
                }</td>
                <td>{this.props.loaded_data ?
                    <Form.Control id={"type-"+this.props.rec_number} as="select" onChange={this.handleChange}>
                        {this.loadTypes()}
                    </Form.Control>
                :
                    <Form.Control id={"type-"+this.props.rec_number}placeholder="Type" type="text" onChange={this.handleChange}/>
                }</td>
                <td>{this.props.loaded_data ?
                    <Form.Control id={"subtype-"+this.props.rec_number} as="select" onChange={this.handleChange}>
                        {this.loadSubTypes()}
                    </Form.Control>
                :
                    <Form.Control id={"subtype-"+this.props.rec_number} placeholder="Sub-Type" type="text" onChange={this.handleChange}/>
                }</td>
                <td>{this.props.loaded_data ?
                    <Form.Control id={"category-"+this.props.rec_number} as="select" onChange={this.handleChange}>
                        {this.loadCategories()}
                    </Form.Control>
                :
                    <Form.Control id={"category-"+this.props.rec_number} placeholder="Category" type="text" onChange={this.handleChange}/>
                }</td>
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
                    <Form.Check id={"copy-professionals-"+this.props.rec_number} label="Professionals" onChange={this.handleChange}/>
                </td>
            </tr>
            <tr>
                <th> </th>
                <td>
                    <Form.Check id={"copy-address-"+this.props.rec_number} label="Address" onChange={this.handleChange}/>
                </td>
                <td>
                    <Form.Check id={"copy-parcel-"+this.props.rec_number} label="Parcel" onChange={this.handleChange}/>
                </td>
                <td>
                    <Form.Check id={"copy-owners-"+this.props.rec_number} label="Owners" onChange={this.handleChange}/>
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
    new_records: state.new_records,
    loaded_data: state.loaded_data.caps
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
