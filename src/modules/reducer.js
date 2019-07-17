import _ from "lodash";

const initialState = {
    event_type: null,
    show_debug: false,
    conditions: { "1": {
        key: "1",
        condition_type: null,
        comparison_x: null,
        comparison_type: null,
        comparison_y: null,
        sub_conditions: {},
        actions: []
    }},
    structure: {
        module: "NA",
        type: "NA",
        subtype: "NA",
        category: "NA"
    },
    functionality: {
        fees: false,
        notification_send: false,
        status_update: false,
        inspection_schedule: false
    },
    fees: [{
        key: 0,
        code: null,
        schedule: null,
        period: "FINAL",
        quantity: null,
        invoice: null,
        duplicate: null,
        sequence: null
    }]

};

const sCubeReducer = (state = initialState, action) => {
    switch (action.type) {
    case "dump_store": {
        console.log(state);
        return state;
    }

    case "update_event_type": {
        let newState = _.cloneDeep(state);
        newState.event_type = action.payload.event_type;
        return newState;
    }
    case "update_structure": {
        let newState = _.cloneDeep(state);
        newState.structure = action.payload.structure;
        return newState;
    }

    case "update_functionality": {
        let newState = _.cloneDeep(state);
        newState.functionality = action.payload.functionality;
        return newState;
    }

    case "update_show_debug": {
        let newState = _.cloneDeep(state);
        newState.show_debug = action.payload.show_debug;
        return newState;
    }

    case "update_fees": {
        let newState = _.cloneDeep(state);
        newState.fees = action.payload.fees;
        return newState;
    }
    case "add_fee": {
        let newState = _.cloneDeep(state);
        newState.fees.push(
            {
                key: state.fees[state.fees.length-1].key+1,
                code: null,
                schedule: null,
                period: null,
                quantity: null,
                invoice: false,
                duplicate: false,
                sequence: null
            }
        );
        return newState;
    }

    case "update_conditions": {
        let newState = _.cloneDeep(state);
        newState.conditions = action.payload.conditions;
        return newState;
    }
    case "add_condit_flat": {
        let newState = _.cloneDeep(state);
        let k = Object.keys(state.conditions);
        newState.conditions["2"] =
            {
                key: "2",
                condition_type: null,
                comparison_x: null,
                comparison_type: null,
                comparison_y: null,
                sub_conditions: {},
                actions: []
            }
        return newState;
    }

    default:
        return state;
    }
};

export default sCubeReducer;
