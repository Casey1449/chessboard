import { combineReducers } from "redux";
import { MOVE_PIECE } from "../actions/index";

const initialState = {
  knight: [3, 3],
  bishop: [4, 4]
};

const piecePositions = (state = initialState, action) => {
  switch (action.type) {
    case MOVE_PIECE: {
      return { ...state, [action.pieceId]: action.position };
    }
    default: {
      return state;
    }
  }
};

const rootReducer = combineReducers({
  piecePositions
});

export default rootReducer;
