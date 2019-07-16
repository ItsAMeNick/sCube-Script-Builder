import React, { Component } from "react";

import "./App.css";

import CoreEvent from "./components/CORE_Event.js";
import CoreStructure from "./components/CORE_Structure.js";
import CoreFunction from "./components/CORE_Function.js";
import TestShowDebug from "./components/TEST_ShowDebug.js";

import Fees from "./components/FEE_FeeContainer.js";

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
            <CoreEvent/>
            <CoreStructure/>
            <CoreFunction/>
            <TestShowDebug/>
            <Fees/>
            <Generate/>
            <TestDump/>
        </div>
        </ReduxProvider>
        );
    }
}

export default App;
