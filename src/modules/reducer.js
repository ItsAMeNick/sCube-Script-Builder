import _ from "lodash";

const initialState = {
  event_type: null
};

const sCubeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "update_event_type": {
        let newState = _.cloneDeep(state);
        newState["event_type"] = action.payload.event_type;
        //let index = _.findIndex(newState.items, { id: action.payload });
        //newState.items.splice(index, 1);
        return newState;
    }

    default:
      return state;
  }
};

export default sCubeReducer;
