import _ from "lodash";

const initialState = {
  event_type: null
};

const sCubeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "update_event_type": {
        let newState = _.cloneDeep(state);
        newState["event_type"] = action.payload.event_type;
        return newState;
    }
    case "update_structure": {
        let newState = _.cloneDeep(state);
        newState["structure_module"] = action.payload.module;
        newState["structure_type"] = action.payload.type;
        newState["structure_subtype"] = action.payload.subtype;
        newState["structure_category"] = action.payload.category;
        return newState;
    }

    default:
      return state;
  }
};

export default sCubeReducer;
