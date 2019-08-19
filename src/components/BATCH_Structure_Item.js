import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Form from "react-bootstrap/Form";

class BATCH_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newBatch = _.cloneDeep(this.props.batch);
        let type = event.target.id.split("-");
        newBatch.structures[this.props.bsi_number][type[0]] = event.target.value;
        this.props.update({
            batch: newBatch
        });
        this.forceUpdate();
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

    loadTypes() {
        let types = [<option key={-1}/>]
        if (this.props.batch.structures[this.props.bsi_number].module) {
            let used_types = []
            types = types.concat(this.props.loaded_data.filter(item => {
                return item.module === this.props.batch.structures[this.props.bsi_number].module;
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
        if (this.props.batch.structures[this.props.bsi_number].type) {
            let used_subtypes = []
            subtypes = subtypes.concat(this.props.loaded_data.filter(item => {
                return item.type === this.props.batch.structures[this.props.bsi_number].type;
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
        let categories = [<option key={-1}/>]
        if (this.props.batch.structures[this.props.bsi_number].subtype) {
            let used_categories = []
            categories = categories.concat(this.props.loaded_data.filter(item => {
                return item.subtype === this.props.batch.structures[this.props.bsi_number].subtype;
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
        {this.props.mode === "batch_script" ?
        <tr>
            <td>{this.props.bsi_number}</td>
            <td>{this.props.loaded_data ?
                <Form.Control id={"module-"+this.props.bsi_number}as="select" onChange={this.handleChange}>
                    {this.loadModules()}
                </Form.Control>
            :
                <Form.Control id={"module-"+this.props.bsi_number} type="text" onChange={this.handleChange}/>
            }</td>
            <td>{this.props.loaded_data ?
                <Form.Control id={"type-"+this.props.bsi_number}as="select" onChange={this.handleChange}>
                    {this.loadTypes()}
                </Form.Control>
            :
                <Form.Control id={"type-"+this.props.bsi_number} type="text" onChange={this.handleChange}/>
            }</td>
            <td>{this.props.loaded_data ?
                <Form.Control id={"subtype-"+this.props.bsi_number}as="select" onChange={this.handleChange}>
                    {this.loadSubTypes()}
                </Form.Control>
            :
                <Form.Control id={"subtype-"+this.props.bsi_number} type="text" onChange={this.handleChange}/>
            }</td>
            <td>{this.props.loaded_data ?
                <Form.Control id={"category-"+this.props.bsi_number}as="select" onChange={this.handleChange}>
                    {this.loadCategories()}
                </Form.Control>
            :
                <Form.Control id={"category-"+this.props.bsi_number} type="text" onChange={this.handleChange}/>
            }</td>
            {this.props.bsi_number !== 1 ?
            <td>
                <button onClick={() => {
                    this.props.delete(this.props.bsi_number);
                }}>
                    Delete
                </button>
            </td>
            : null}
        </tr> : null}
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    batch: state.batch,
    mode: state.mode,
    loaded_data: state.loaded_data.caps
});

const mapDispatchToProps = dispatch => ({
    update: batch => dispatch({
        type: "update_batch",
        payload: batch
    }),
    delete: batch => dispatch({
        type: "delete_batch_structure",
        payload: batch
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BATCH_Item);
