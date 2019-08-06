import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Form from 'react-bootstrap/Form'

class MODE_Function extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        document.getElementById("function_name").value = this.props.mode_extras.function_name;
        document.getElementById("function_desc").value = this.props.mode_extras.function_desc;
    }

    handleChange(event) {
        let newExtras = _.cloneDeep(this.props.mode_extras);
        newExtras[event.target.id] = event.target.value;
        this.props.update({
            mode_extras: newExtras
        });
        event.preventDefault();
    };

    render() {
        return (
        <Form>
            <Form.Label>
                Name of your function:
            </Form.Label>
            <Form.Control id="function_name" type="text" placeholder="Ex. MyNewFunctionForAccela" onChange={this.handleChange}/>
            <hr/>
            <Form.Label>
                Description of your function:
            </Form.Label>
            <Form.Control id="function_desc" as="textarea" rows="4" placeholder="Ex. Sends an email to all LPs on a record." onChange={this.handleChange}/>
        </Form>
        );
    }
}

const mapStateToProps = state => ({
    mode_extras: state.mode_extras
});

const mapDispatchToProps = dispatch => ({
    update: item => dispatch({
        type: "update_mode_extras",
        payload: item
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(MODE_Function);
