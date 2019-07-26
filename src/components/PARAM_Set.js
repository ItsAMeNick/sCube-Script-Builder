import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form";

import ParamItem from "./PARAM_Item.js";

class PARAM_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (this.props.parameter_sets[this.props.set_number].style === "email") {
            document.getElementById("email."+this.props.set_number).checked = true;
        }
    }

    handleChange(event) {
        let newSets = this.props.parameter_sets;
        if (event.target.id === "name") {
            newSets[this.props.set_number][event.target.id] = event.target.value;
        } else {
            let id = event.target.id.split(".");
            if (id[0] === "email") {
                newSets[this.props.set_number].style = "email";
            } else {
                newSets[this.props.set_number].style = "report";
            }
        }
        this.props.update({
            parameter_sets: newSets
        });
    }

    generateItems() {
        let items = [];
        let parameters = this.props.parameter_sets[this.props.set_number].parameters;
        for (let p in parameters) {
            items.push(<ParamItem key={parameters[p].key} param_number={parameters[p].key} set_number={this.props.set_number}/>)
        }
        return items;
    }

    // genLevels() {
    //     let levels = 0;
    //     for (let p in this.props.parameter_sets[this.props.set_number].parameters) {
    //         levels = Math.max(levels,Object.keys(this.props.parameter_sets[this.props.set_number].parameters[p]).length);
    //     }
    //     levels-=3;
    //     let headers = [];
    //     for (let i=1; i<=levels;i++) {
    //         headers.push(<th key={i}>Level{"\n"}{i}</th>);
    //     }
    //     return headers;
    // }

    render() {
        return (
        <div>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>{this.props.set_number}</th>
                        <td>Set Name: </td>
                        <td>
                            <Form.Control id="name" type="text" onChange={this.handleChange}/>
                        </td>
                        <td>
                            <Form.Check id={"email."+this.props.set_number} label="Email Parameters" type="radio" name = {"style."+this.props.set_number} onChange={this.handleChange}/>
                        </td>
                        <td>
                            <Form.Check id={"report."+this.props.set_number} label="Report Parameters" type="radio" name = {"style."+this.props.set_number} onChange={this.handleChange}/>
                        </td>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th>Reference Name</th>
                        <th>Portlet</th>
                        {/*this.genLevels()*/}
                    </tr>
                </thead>
                <tbody>
                    {this.generateItems()}
                </tbody>
            </Table>
            <button onClick={() => {this.props.add(this.props.set_number)}}> Add Parameter</button>
            <hr/>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    parameter_sets: state.parameter_sets
});

const mapDispatchToProps = dispatch => ({
    add: s => dispatch({
        type: "add_parameter",
        payload: s
    }),
    update: s => dispatch({
        type: "update_parameter_set",
        payload: s
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(PARAM_Container);
