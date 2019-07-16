import _ from "lodash";

const initialState = {
    event_type: null,
    structure: {
        module: null,
        type: null,
        subtype: null,
        category: null
    },
    functionality: {
        fees: false,
        notification_send: false,
        status_update: false,
        inspection_schedule: false
    }
};

const sCubeReducer = (state = initialState, action) => {
    switch (action.type) {
    case "dump_store": {
        console.log(state);
        return state;
    }

    case "update_event_type": {
        let newState = _.cloneDeep(state);
        newState["event_type"] = action.payload.event_type;
        return newState;
    }
    case "update_structure": {
        let newState = _.cloneDeep(state);
        newState["structure"] = action.payload.structure;
        return newState;
    }

    case "update_functionality": {
        console.log(action)
        let newState = _.cloneDeep(state);
        newState["functionality"] = action.payload.functionality;
        return newState;
    }

    default:
        return state;
    }
};

export default sCubeReducer;
