import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { connect } from "react-redux";

class CORE_Structure extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newStructure = this.props.structure;
        let newValue = "NA";
        if (event.target.value.replace(/\s+/g, '') !== '') {
            newValue = event.target.value;
        }
        newStructure[event.target.id] = newValue;
        this.props.update({
            structure: newStructure
        });
    };

    render() {
        return (
        <div>
        <Container>
            <Row>
                <Form.Label>Please define the four level structure:</Form.Label>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Module:</Form.Label>
                </Col> <Col>
                    <Form.Control id="module" type="text" onChange={this.handleChange}/>
                </Col>
            </Row> <br/> <Row>
                <Col>
                    <Form.Label>Type: </Form.Label>
                </Col> <Col>
                    <Form.Control id="type" type="text" onChange={this.handleChange}/>
                </Col>
            </Row> <br/> <Row>
                <Col>
                    <Form.Label>SubType:</Form.Label>
                </Col> <Col>
                    <Form.Control id="subtype" type="text" onChange={this.handleChange}/>
                </Col>
            </Row> <br/> <Row>
                <Col>
                    <Form.Label>Category:</Form.Label>
                </Col> <Col>
                    <Form.Control id="category" type="text" onChange={this.handleChange}/>
                </Col>
            </Row>
        </Container>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    structure: state.structure
});

const mapDispatchToProps = dispatch => ({
    update: item => dispatch({
        type: "update_structure",
        payload: item
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_Structure);
