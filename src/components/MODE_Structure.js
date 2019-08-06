import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CORE_Structure extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (this.props.structure.module === "NA") {
            document.getElementById("structure.module").value = "";
        } else {
            document.getElementById("structure.module").value = this.props.structure.module;
        }
        if (this.props.structure.type === "NA") {
            document.getElementById("structure.type").value = "";
        } else {
            document.getElementById("structure.type").value = this.props.structure.type;
        }
        if (this.props.structure.subtype === "NA") {
            document.getElementById("structure.subtype").value = "";
        } else {
            document.getElementById("structure.subtype").value = this.props.structure.subtype;
        }
        if (this.props.structure.category === "NA") {
            document.getElementById("structure.category").value = "";
        } else {
            document.getElementById("structure.category").value = this.props.structure.category;
        }
    }

    handleChange(event) {
        let newStructure = _.cloneDeep(this.props.structure);
        let newValue = "NA";
        if (event.target.value.replace(/\s+/g, '') !== '') {
            newValue = event.target.value;
        }
        newStructure[event.target.id.split(".")[1]] = newValue;
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
                    <Form.Control id="structure.module" type="text" onChange={this.handleChange}/>
                </Col>
            </Row> <br/> <Row>
                <Col>
                    <Form.Label>Type: </Form.Label>
                </Col> <Col>
                    <Form.Control id="structure.type" type="text" onChange={this.handleChange}/>
                </Col>
            </Row> <br/> <Row>
                <Col>
                    <Form.Label>SubType:</Form.Label>
                </Col> <Col>
                    <Form.Control id="structure.subtype" type="text" onChange={this.handleChange}/>
                </Col>
            </Row> <br/> <Row>
                <Col>
                    <Form.Label>Category:</Form.Label>
                </Col> <Col>
                    <Form.Control id="structure.category" type="text" onChange={this.handleChange}/>
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
