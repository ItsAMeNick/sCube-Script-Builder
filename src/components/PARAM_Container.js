import React, { Component } from 'react';
import { connect } from "react-redux";

import Set from "./PARAM_Set.js";

class PARAM_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateSets() {
        let sets = [];
        for (let s in this.props.parameter_sets) {
            sets.push(<Set key={this.props.parameter_sets[s].key} set_number={this.props.parameter_sets[s].key}/>)
        }
        return sets;
    }

    render() {
        return (
        <div>
        {this.props.isOn ?
        <div>
            <hr/>
            <h3>Parameter Manager</h3>
            <h5>Use this section to populate the notification with information from Accela</h5>
            <h5>By putting two dollar signs on either side of the reference name, dynamic information will populate within the email</h5>
            <h5>For instance, if wanting to address the contact by their first name: $$REFERENCE_NAME$$</h5>
            <h5>(Dollar signs are not required here, just within your notification template)</h5>

            {this.generateSets()}
            <button onClick={() => {this.props.add()}}> Add Parameter Set</button>
        </div> : null}
        </div>
        );
    }
}

const mapStateToProps = state => ({
    isOn: (state.functionality.notifications || state.functionality.report),
    parameter_sets: state.parameter_sets
});

const mapDispatchToProps = dispatch => ({
    add: () => dispatch({
        type: "add_parameter_set",
        payload: null
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(PARAM_Container);
