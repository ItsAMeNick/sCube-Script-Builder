import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

import NoteItem from "./NOTE_Item.js";

class NOTE_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateNoteItems = () => {
        let stats = [];
        for (let n in this.props.notifications) {
            stats.push(<NoteItem key={this.props.notifications[n].key} note_number={this.props.notifications[n].key}/>)
        }
        return stats;
    }

    render() {
        return (
        <div>
        {this.props.isOn ?
        <div>
            <hr/>
            <h3>Notification Manager</h3>
            <Table striped bordered>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Template Name</th>
                    <th>From Email</th>
                    <th>Recipients*</th>
                    <th>Professionals*</th>
                    <th>Include Report?</th>
                    <th>Parameters</th>
                    </tr>
                </thead>
                <tbody>
                    {this.generateNoteItems()}
                </tbody>
            </Table>
            <p>*Please enter all contact types seperated by a comma or type ALL</p>
            <button onClick={() => {this.props.add()}}> Add Notification</button>
        </div> : null}
        </div>
        );
    }
}

const mapStateToProps = state => ({
    isOn: state.functionality.notifications,
    notifications: state.notifications
});

const mapDispatchToProps = dispatch => ({
    add: () => dispatch({
        type: "add_note",
        payload: null
    }),
    update: s => dispatch({
        type: "update_notes",
        payload: s
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(NOTE_Container);
