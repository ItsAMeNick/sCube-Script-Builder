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
        this.guessLoadedId = this.guessLoadedId.bind(this);
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
        newStructure.loaded_id = this.guessLoadedId(event.target.id.split(".")[1], newValue);
        this.props.update({
            structure: newStructure
        });
        this.forceUpdate();
    };

    guessLoadedId(org, value) {
        let mod = this.props.structure.module;
        let type = this.props.structure.type;
        let sub = this.props.structure.subtype;
        let cat = this.props.structure.category;

        switch (org) {
            case "module": {mod = value; break;}
            case "type": {type = value; break;}
            case "subtype": {sub = value; break;}
            case "category": {cat = value; break;}
            default: break;
        }

        for (let i in this.props.loaded_data) {
            if (this.props.loaded_data[i].module === mod
                && this.props.loaded_data[i].type === type
                && this.props.loaded_data[i].subtype === sub
                && this.props.loaded_data[i].category === cat
            ) return this.props.loaded_data[i].key;
        }
        return -1;
    }

    loadModules() {
        let used_modules = [];
        let modules = [<option key={-1}/>, <option key={"*"} label={"*"} value={"*"}/>].concat(this.props.loaded_data.filter(item => {
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
        let types = [<option key={-1}/>, <option key={"*"} label={"*"} value={"*"}/>, <option key={"NA"} label={"NA"} value={"NA"}/>]
        if (this.props.structure.module) {
            let used_types = ["NA"];
            types = types.concat(this.props.loaded_data.filter(item => {
                return item.module === this.props.structure.module;
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
        let subtypes = [<option key={-1}/>, <option key={"*"} label={"*"} value={"*"}/>, <option key={"NA"} label={"NA"} value={"NA"}/>]
        if (this.props.structure.type) {
            let used_subtypes = ["NA"];
            subtypes = subtypes.concat(this.props.loaded_data.filter(item => {
                return item.type === this.props.structure.type;
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
        let categories = [<option key={-1}/>, <option key={"*"} label={"*"} value={"*"}/>, <option key={"NA"} label={"NA"} value={"NA"}/>]
        if (this.props.structure.subtype) {
            let used_categories = ["NA"];
            categories = categories.concat(this.props.loaded_data.filter(item => {
                return item.subtype === this.props.structure.subtype;
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

    getAlias() {
        if (this.props.structure.loaded_id >= 0) {
            return this.props.loaded_data[this.props.structure.loaded_id].alias;
        }
        return "N/A";
    }

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
                    {this.props.loaded_data ?
                        <Form.Control id="structure.module" as="select" onChange={this.handleChange}>
                            {this.loadModules()}
                        </Form.Control>
                    :
                        <Form.Control id="structure.module" type="text" onChange={this.handleChange}/>
                    }
                </Col>
            </Row> <br/> <Row>
                <Col>
                    <Form.Label>Type: </Form.Label>
                </Col> <Col>
                {this.props.loaded_data ?
                    <Form.Control id="structure.type" as="select" onChange={this.handleChange}>
                        {this.loadTypes()}
                    </Form.Control>
                :
                    <Form.Control id="structure.type" type="text" onChange={this.handleChange}/>
                }
                </Col>
            </Row> <br/> <Row>
                <Col>
                    <Form.Label>SubType:</Form.Label>
                </Col> <Col>
                {this.props.loaded_data ?
                    <Form.Control id="structure.subtype" as="select" onChange={this.handleChange}>
                        {this.loadSubTypes()}
                    </Form.Control>
                :
                    <Form.Control id="structure.subtype" type="text" onChange={this.handleChange}/>
                }
                </Col>
            </Row> <br/> <Row>
                <Col>
                    <Form.Label>Category:</Form.Label>
                </Col> <Col>
                {this.props.loaded_data ?
                    <Form.Control id="structure.category" as="select" onChange={this.handleChange}>
                        {this.loadCategories()}
                    </Form.Control>
                :
                    <Form.Control id="structure.category" type="text" onChange={this.handleChange}/>
                }
                </Col>
            </Row> <br/> <Row>
                {this.props.loaded_data ? <React.Fragment>
                    <Col>
                        <Form.Label>Record Alias:</Form.Label>
                    </Col> <Col>
                        <Form.Label>{this.getAlias()}</Form.Label>
                    </Col>
                </React.Fragment> : null}
            </Row>
        </Container>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    structure: state.structure,
    loaded_data: state.loaded_data.caps
});

const mapDispatchToProps = dispatch => ({
    update: item => dispatch({
        type: "update_structure",
        payload: item
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_Structure);
