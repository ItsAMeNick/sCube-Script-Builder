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
        actions: {},
        level: 1
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
        key: 1,
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
        let ids = Object.keys(state.conditions).map(c => {return c.split(".")});
        let m = 0;
        for (let k in ids) {
            m = Math.max(m,ids[k][0]);
        }
        m+=1;
        newState.conditions[m.toString()] =
            {
                key: m.toString(),
                condition_type: null,
                comparison_x: null,
                comparison_type: null,
                comparison_y: null,
                actions: [],
                level: 1
            }
        return newState;
    }
    case "add_condit_sub": {
        let newState = _.cloneDeep(state);
        let myId = action.payload.toString().split(".");
        let myLevel = action.payload.toString().split(".").length+1;
        let ids = Object.keys(state.conditions);
        let ids_split = ids.map(c => {return c.split(".")});
        let m = 0;
        for (let k in ids_split) {
            if (myLevel+1 !== ids_split[k].length+1) continue;
            if (myId.join(".") !== _.initial(ids_split[k]).join(".")) continue;
            m = Math.max(m,ids_split[k][myLevel-1]);
        }
        myId = (myId.join(".") + "." + (m+1)).toString();
        newState.conditions[myId] =
            {
                key: myId,
                condition_type: null,
                comparison_x: null,
                comparison_type: null,
                comparison_y: null,
                actions: [],
                level: myLevel
            }
        return newState;
    }
    case "add_condit_action": {
        let newState = _.cloneDeep(state);
        newState.conditions[action.payload].actions.push("Do Something...");
        return newState;
    }

    default:
        return state;
    }
};

export default sCubeReducer;
