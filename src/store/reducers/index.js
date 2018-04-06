import { combineReducers } from "redux";
import { MOVE_KNIGHT, MOVE_BISHOP } from "../actions/index";

const initialState = {
  knight: [3, 3],
  bishop: [4, 4]
};

export const checkMove = (oldPosition, newPosition, pieceType) => {
  const [oldX, oldY] = oldPosition;
  const [newX, newY] = newPosition;
  const deltaX = Math.abs(oldX - newX);
  const deltaY = Math.abs(oldY - newY);
  if (pieceType === "bishop") {
    return deltaX === deltaY;
  }
  if (pieceType === "knight") {
    return (deltaX === 2 && deltaY === 1) || (deltaX === 1 && deltaY === 2);
  }
  console.error(
    'checkMove must receive a "pieceType" of either "bishop" or "knight"'
  );
};

const piecePositions = (state = initialState, action) => {
  switch (action.type) {
    case MOVE_KNIGHT: {
      const isLegal = checkMove(state.knight, action.position, "knight");
      return isLegal
        ? { ...state, knight: action.position, error: null }
        : { ...state, error: "illegal move" };
    }
    case MOVE_BISHOP: {
      const isLegal = checkMove(state.bishop, action.position, "bishop");
      return isLegal
        ? { ...state, bishop: action.position, error: null }
        : { ...state, error: "illegal move" };
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
