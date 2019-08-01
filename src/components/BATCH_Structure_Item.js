import React, { Component } from 'react';
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";

class BATCH_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
        <React.Fragment>
        {this.props.mode === "batch_script" ?
        <tr>
            <td>{this.props.bsi_number}</td>
            <td>
                <Form.Control id={"module-"+this.props.bsi_number} type="text" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id={"type-"+this.props.bsi_number} type="text" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id={"subtype-"+this.props.bsi_number} type="text" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id={"category-"+this.props.bsi_number} type="text" onChange={this.handleChange}/>
            </td>
        </tr> : null}
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    mode: state.mode
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(BATCH_Item);
