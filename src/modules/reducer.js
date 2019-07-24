import _ from "lodash";

const initialState = {
    event_type: null,
    show_debug: false,
    mode: "event_script",
    conditions: {
        "1": {
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
        conditions: true,
        fees: false,
        fees_advanced: false,
        notification_send: false,
        status_update: false,
        inspection_schedule: false
    },
    status: {
        "1": {
            key: 1,
            label: null,
            comment: null,
            optional_cap: false,
            cap: null
        }
    },
    fees: {
        "1": {
        key: 1,
        code: null,
        schedule: null,
        period: "FINAL",
        quantity: null,
        invoice: "Y"
    }},
    parameter_sets: {
        "1": {
            key: 1,
            parameters: {
                "1": {
                    ref: null,
                    porlet: null,
                    level1: null,
                    level2: null,
                    level3: null,
                    level4: null
                }
            }
        }
    },
    notifications: {
        "1": {
            key: 1,
            template: null,
            from: null,
            contacts: [],
            professionals: [],
            reportName: null,
            reportParameter: null,
            reportModule: null,
            emailParams: null
        }
    }

};

const sCubeReducer = (state = initialState, action) => {
    switch (action.type) {
    case "dump_store": {
        console.log(state);
        return state;
    }

    case "update_mode": {
        let newState = _.cloneDeep(state);
        newState.mode = action.payload.mode;
        return newState;
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

    case "update_status": {
        let newState = _.cloneDeep(state);
        newState.status = action.payload.status;
        return newState;
    }
    case "add_status": {
        let newState = _.cloneDeep(state);
        let status_codes = Object.keys(state.status);
        let m = 0;
        for (let s in status_codes) {
            m = Math.max(m,state.status[status_codes[s]].key);
        }
        m+=1;
        newState.status[m] =
            {
                key: m,
                label: null,
                comment: null,
                optional_cap: false,
                cap: null
            }
        return newState;
    }
    case "delete_status": {
        let newState = _.cloneDeep(state);
        //Safeguard, should be prevented by the Fee_Item
        if (action.payload === "1") {
            return newState;
        }
        delete newState.status[action.payload]
        return newState;
    }

    case "update_fees": {
        let newState = _.cloneDeep(state);
        newState.fees = action.payload.fees;
        return newState;
    }
    case "add_fee": {
        let newState = _.cloneDeep(state);
        let fee_codes = Object.keys(state.fees);
        let m = 0;
        for (let f in fee_codes) {
            m = Math.max(m,state.fees[fee_codes[f]].key);
        }
        let prev = m;
        m+=1;
        newState.fees[m] =
            {
                key: m,
                code: null,
                schedule: state.fees[prev].schedule,
                period: "FINAL",
                quantity: null,
                invoice: "Y"
            }
        return newState;
    }
    case "delete_fee": {
        let newState = _.cloneDeep(state);
        //Safeguard, should be prevented by the Fee_Item
        if (action.payload === "1") {
            return newState;
        }
        delete newState.fees[action.payload]
        return newState;
    }

    case "update_note": {
        let newState = _.cloneDeep(state);
        newState.notification = action.payload.notification;
        return newState;
    }
    case "add_note": {
        let newState = _.cloneDeep(state);
        let note_codes = Object.keys(state.notifications);
        let m = 0;
        for (let s in note_codes) {
            m = Math.max(m,state.notifications[note_codes[s]].key);
        }
        m+=1;
        newState.notifications[m] =
            {
                key: m,
                template: null,
                from: null,
                contacts: [],
                professionals: [],
                report_bool: false,
                report_name: null,
                report_parameter: null,
                report_module: null,
                email_params: null
            }
        return newState;
    }
    case "delete_note": {
        let newState = _.cloneDeep(state);
        //Safeguard, should be prevented by the Fee_Item
        if (action.payload === "1") {
            return newState;
        }
        delete newState.notifications[action.payload]
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
                actions: {},
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
                actions: {},
                level: myLevel
            }
        return newState;
    }
    case "delete_condition": {
        let newState = _.cloneDeep(state);
        delete newState.conditions[action.payload];
        return newState;
    }
    case "add_condit_action": {
        let newState = _.cloneDeep(state);
        let newActions = newState.conditions[action.payload].actions;
        let newId = "";
        let m = 0;
        if (_.isEmpty(newActions)) {
            m = 1;
        } else {
            for (let a in newActions) {
                m = Math.max(m, a.split("A")[1]);
            }
            m += 1;
        }
        newId = action.payload + "-A" + m;
        newActions[newId] = "";
        newState.conditions[action.payload].actions = newActions;
        return newState;
    }
    case "delete_action": {
        let newState = _.cloneDeep(state);
        delete newState.conditions[action.payload.parent].actions[action.payload.id];
        return newState;
    }

    default:
        return state;
    }
};

export default sCubeReducer;
