import React, { Component } from 'react';
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";

class CONDIT_Action extends Component {
    constructor(props) {
        super(props);
        this.state = {
            local_comp_type: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newConditions = this.props.conditions
        newConditions[this.props.parent].actions[event.target.id] = event.target.value;
        this.props.update({
            conditions: newConditions
        });
        this.forceUpdate();
    };

    gatherActions = () => {
        let actions = [];
        actions.push("");

        //Handle Fees
        if (this.props.functionality.fees) {
            for (let f in this.props.fees)  {
                actions.push("Fee-"+this.props.fees[f].key);
            }
        }
        return actions.map(a => {
            return <option key={a} value={a}>{a}</option>;
        });
    }

    render() {
        return (
        <tr>
            <td>
            </td>
            <td>
            </td>
            <td>
                Action:
            </td>
            <td>
                {this.props.id}
            </td>
            <td>
                <Form.Control id={this.props.id} as="select" onChange={this.handleChange}>
                    {this.gatherActions()}
                </Form.Control>
            </td>
            <td>
                <button onClick={this.handleAddAction}>- Action</button>
            </td>
            <td>

            </td>
        </tr>
        );
    }
}

const mapStateToProps = state => ({
    functionality: state.functionality,
    conditions: state.conditions,
    fees: state.fees
});

const mapDispatchToProps = dispatch => ({
    update: actions => dispatch({
        type: "update_conditions",
        payload: actions
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(CONDIT_Action);
