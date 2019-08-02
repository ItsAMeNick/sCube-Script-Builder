import _ from "lodash";

const initialState = {
    show_debug: false,
    mode: "event_script",
    event_type: null,
    structure: {
        module: "NA",
        type: "NA",
        subtype: "NA",
        category: "NA"
    },
    mode_extras: {
        function_name: "",
        function_desc: "",
    },
    batch: {
        name: null,
        use_lic: true,
        structures: {
            "1": {
                key: 1,
                module: "NA",
                type: "NA",
                subtype: "NA",
                category: "NA"
            }
        },
        lic_only: {
            range: 0,
            current_status: null,
            new_status: null
        }
    },
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
    functionality: {
        conditions: true,
        fees: false,
        fees_advanced: false,
        notifications: false,
        status_update: false,
        asi: false,
        workflow: false,
        inspections: false,
        cancel: false,
        pageflow_documents: false
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
    asis: {
        "1": {
            key: 1,
            name: null,
            value: null
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
            name: "set 1",
            style: "email",
            parameters: {
                "1": {
                    key: 1,
                    ref: null,
                    script: null,
                    portlet: null,
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
            report_name: null,
            report_parameters: null,
            report_module: null,
            email_params: null
        }
    },
    workflows: {
        "1": {
            key: 1,
            action: null,
            task: null,
            status: null,
            comment: null
        }
    },
    inspections: {
        "1": {
            key: 1,
            type: null,
            days_out: null
        }
    },
    cancels: {
        "1": {
            key: 1,
            message: null
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

    case "update_batch": {
        let newState = _.cloneDeep(state);
        newState.batch = action.payload.batch;
        return newState;
    }
    case "add_batch_structure": {
        let newState = _.cloneDeep(state);
        let batch_codes = Object.keys(state.batch.structures);
        let m = 0;
        for (let b in batch_codes) {
            m = Math.max(m,state.batch.structures[batch_codes[b]].key);
        }
        m+=1;
        newState.batch.structures[m] =
            {
                key: m,
                module: "NA",
                type: "NA",
                subtype: "NA",
                category: "NA"
            }
        return newState;
    }
    case "delete_batch_structure": {
        let newState = _.cloneDeep(state);
        newState.batch = action.payload.batch;
        return newState;
    }

    case "update_mode_extras": {
        let newState = _.cloneDeep(state);
        newState.mode_extras = action.payload.mode_extras;
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

    //Status
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
        //Safeguard, should be prevented by the STATUS_Item
        if (action.payload === "1") {
            return newState;
        }
        delete newState.status[action.payload]
        return newState;
    }

    //ASI
    case "update_asis": {
        let newState = _.cloneDeep(state);
        newState.asis = action.payload.asis;
        return newState;
    }
    case "add_asi": {
        let newState = _.cloneDeep(state);
        let asi_codes = Object.keys(state.asis);
        let m = 0;
        for (let a in asi_codes) {
            m = Math.max(m,state.asis[asi_codes[a]].key);
        }
        m+=1;
        newState.asis[m] =
            {
                key: m,
                name: null,
                value: null
            }
        return newState;
    }
    case "delete_asi": {
        let newState = _.cloneDeep(state);
        //Safeguard, should be prevented by the ASI_Item
        if (action.payload === "1") {
            return newState;
        }
        delete newState.asis[action.payload]
        return newState;
    }

    //Fees
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

    //Notes
    case "update_notes": {
        let newState = _.cloneDeep(state);
        newState.notifications = action.payload.notifications;
        return newState;
    }
    case "add_note": {
        let newState = _.cloneDeep(state);
        let note_codes = Object.keys(state.notifications);
        let m = 0;
        for (let n in note_codes) {
            m = Math.max(m,state.notifications[note_codes[n]].key);
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
                report_parameters: null,
                report_module: null,
                email_params: null
            }
        return newState;
    }
    case "delete_note": {
        let newState = _.cloneDeep(state);
        //Safeguard, should be prevented by the NOTE_Item
        if (action.payload === "1") {
            return newState;
        }
        delete newState.notifications[action.payload]
        return newState;
    }

    //Params
    case "update_parameter_set": {
        let newState = _.cloneDeep(state);
        newState.parameter_sets = action.payload.parameter_sets;
        return newState;
    }
    case "update_parameter": {
        let newState = _.cloneDeep(state);
        newState.parameter_sets[action.payload.set_number].parameters = action.payload.parameters;
        return newState;
    }
    case "add_parameter_set": {
        let newState = _.cloneDeep(state);
        let set_codes = Object.keys(state.parameter_sets);
        let m = 0;
        for (let s in set_codes) {
            m = Math.max(m,state.parameter_sets[set_codes[s]].key);
        }
        m+=1;
        newState.parameter_sets[m] =
            {
                key: m,
                name: "set "+m,
                style: "email",
                parameters: {
                    "1": {
                        key: 1,
                        ref: null,
                        script: null,
                        portlet: null,
                    }
                }
            }
        return newState;
    }
    case "add_parameter": {
        let newState = _.cloneDeep(state);
        let myParams = newState.parameter_sets[action.payload].parameters
        let param_codes = Object.keys(myParams);
        let m = 0;
        for (let p in param_codes) {
            m = Math.max(m,myParams[param_codes[p]].key);
        }
        m+=1;
        myParams[m] =
            {
                key: m,
                ref: null,
                script: null,
                portlet: null,
            }
        newState.parameter_sets[action.payload].parameters = myParams;
        return newState;
    }

    //Workflow
    case "update_workflow": {
        let newState = _.cloneDeep(state);
        newState.workflows = action.payload.workflows;
        return newState;
    }
    case "add_workflow": {
        let newState = _.cloneDeep(state);
        let workflow_codes = Object.keys(state.workflows);
        let m = 0;
        for (let w in workflow_codes) {
            m = Math.max(m,state.workflows[workflow_codes[w]].key);
        }
        m+=1;
        newState.workflows[m] =
            {
                key: m,
                action: null,
                task: null,
                status: null,
                comment: null
            }
        return newState;
    }
    case "delete_workflow": {
        let newState = _.cloneDeep(state);
        //Safeguard, should be prevented by the WORK_Item
        if (action.payload === "1") {
            return newState;
        }
        delete newState.workflows[action.payload]
        return newState;
    }

    //Inspections
    case "update_inspections": {
        let newState = _.cloneDeep(state);
        newState.inspections = action.payload.inspections;
        return newState;
    }
    case "add_inspection": {
        let newState = _.cloneDeep(state);
        let inspection_codes = Object.keys(state.inspections);
        let m = 0;
        for (let i in inspection_codes) {
            m = Math.max(m,state.inspections[inspection_codes[i]].key);
        }
        m+=1;
        newState.inspections[m] =
            {
                key: m,
                type: null,
                days_out: null
            }
        return newState;
    }
    case "delete_inspection": {
        let newState = _.cloneDeep(state);
        //Safeguard, should be prevented by the STATUS_Item
        if (action.payload === "1") {
            return newState;
        }
        delete newState.inspections[action.payload]
        return newState;
    }

    //Cancels
    case "update_cancels": {
        let newState = _.cloneDeep(state);
        newState.cancels = action.payload.cancels;
        return newState;
    }
    case "add_cancel": {
        let newState = _.cloneDeep(state);
        let cancel_codes = Object.keys(state.cancels);
        let m = 0;
        for (let c in cancel_codes) {
            m = Math.max(m,state.cancels[cancel_codes[c]].key);
        }
        m+=1;
        newState.cancels[m] =
            {
                key: m,
                message: null
            }
        return newState;
    }
    case "delete_cancel": {
        let newState = _.cloneDeep(state);
        //Safeguard, should be prevented by the STATUS_Item
        if (action.payload === "1") {
            return newState;
        }
        delete newState.cancels[action.payload]
        return newState;
    }

    //Conditions
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
