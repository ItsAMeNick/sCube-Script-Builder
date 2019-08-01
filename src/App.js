import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./App.css";

import CoreMode from "./components/CORE_Mode.js";
import Core from "./components/CORE.js";
import CoreFunctionality from "./components/CORE_Functionality.js";

import TestShowDebug from "./components/TEST_ShowDebug.js";

import Fees from "./components/FEE_Container.js";
import Status from "./components/STATUS_Container.js";
import Asi from "./components/ASI_Container.js";
import Workflow from "./components/WORK_Container.js";
import Inspection from "./components/INSP_Container.js";
import Cancel from "./components/CANCEL_Container.js";

import Notes from "./components/NOTE_Container.js";
import Params from "./components/PARAM_Container.js";

import ConditContainer from "./components/CONDIT_Container.js"

import Generate from "./components/CORE_GenerateOutput.js";
import TestDump from "./components/TEST_DUMP.js";

import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./modules/store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

class App extends Component {
    render() {
        return (
        <ReduxProvider store={reduxStore}>
        <div className="App">
        <Container>
            <Row> <h6>&nbsp;</h6> </Row>
            <Row>
                <h1>[s]Cube Script Builder</h1>
            </Row>
            <hr/>
            <CoreMode/>
            <hr/>
            <Row>
                <Col>
                    <Core/>
                </Col> <Col>
                    <CoreFunctionality/>
                    <TestShowDebug/>
                </Col>
            </Row> <Col>
                <Status/>
            </Col> <Col>
                <Asi/>
            </Col> <Col>
                <Fees/>
            </Col> <Col>
                <Params/>
            </Col> <Col>
                <Notes/>
            </Col> <Col>
               <Workflow/>
           </Col> <Col>
               <Inspection/>
           </Col> <Col>
               <Cancel/>
           </Col> <Col>
                <ConditContainer/>
            </Col> <hr/> <Col>
                <Generate/>
            </Col> <hr/> <Row>
                <TestDump/>
            </Row>
        </Container>
        </div>
        </ReduxProvider>
        );
    }
}

export default App;
