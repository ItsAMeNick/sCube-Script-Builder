import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Form from "react-bootstrap/Form";

class ASI_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newASIs = _.cloneDeep(this.props.asis);
        let newValue = event.target.value;
        newASIs[this.props.asi_number][event.target.id] = newValue;
        this.props.update({
            asis: newASIs
        });
    };

    loadOptionsFromData() {
        return [<option key={-1}/>].concat(this.props.loaded_asis.filter(item => {
            if (this.props.loaded_id >= 0) {
                return this.props.loaded_data[this.props.loaded_id].asi_code === item.code;
            } else {
                return true;
            }
        }).filter(item => {
            return item.group === "APPLICATION";
        }).sort((item1, item2) => {
            console.log()
            if (item1.code.localeCompare(item2.code) === 0) {
                if (item1.type.localeCompare(item2.type) === 0) {
                    return item1.name.localeCompare(item2.name);
                } else {
                    return item1.type.localeCompare(item2.type)
                }
            } else {
                return item1.code.localeCompare(item2.code);
            }
        }).map(item => {
            return <option key={item.key} label={item.alias ? item.code+" - "+item.type+" - "+item.alias : item.code+" - "+item.type+" - "+item.name} value={item.name}/>
        }));
    }

    render() {
        return (
        <tr>
            <td>{this.props.asi_number}</td>
            <td>
                {this.props.loaded_asis ?
                    <Form.Control id="name" as="select" onChange={this.handleChange}>
                        {this.loadOptionsFromData()}
                    </Form.Control>
                :
                    <Form.Control id="name" onChange={this.handleChange}/>
                }
            </td>
            <td>
                <Form.Control id="value" onChange={this.handleChange}/>
            </td>
            {this.props.asi_number !== 1 ?
            <td>
                <button onClick={() => {
                    this.props.delete(this.props.asi_number);
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
    asis: state.asis,
    loaded_asis: state.loaded_data.asis,
    loaded_data: state.loaded_data.caps,
    loaded_id: state.structure.loaded_id
});

const mapDispatchToProps = dispatch => ({
    update: a => dispatch({
        type: "update_asis",
        payload: a
    }),
    delete: a => dispatch({
        type: "delete_asi",
        payload: a
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ASI_Item);
