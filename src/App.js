import React, { Component } from "react";

import "./App.css";

import CoreEvent from "./components/CORE_Event.js";
import CoreStructure from "./components/CORE_Structure.js";

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
          <TestDump/>
        </div>
      </ReduxProvider>
    );
  }
}

export default App;
