import React, { Component } from "react";
import styles from "./Square.css";
import cx from "classnames";
import { DropTarget } from "react-dnd";
import { checkMove, isBlocked } from "../../utils";

const squareTarget = {
  canDrop(props, monitor) {
    const { id: pieceId } = monitor.getItem();
    const { x, y, piecePositions, piece } = props;
    const thisPosition = [x, y];
    const isInPath = checkMove(piecePositions[pieceId], thisPosition, pieceId);
    const isOccupiedSquare = !!piece;
    const isBlockedSquare =
      isInPath &&
      isBlocked(
        thisPosition,
        piecePositions.knight,
        pieceId,
        piecePositions[pieceId]
      );
    return isInPath && !isOccupiedSquare && !isBlockedSquare;
  },

  drop(props, monitor) {
    const { id: pieceId } = monitor.getItem();
    const { x, y, movePiece } = props;
    movePiece(x, y, pieceId);
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop()
});

@DropTarget("piece", squareTarget, collect)
export default class Square extends Component {
  render() {
    const { x, y, connectDropTarget, canDrop, piece } = this.props;
    const isDark = (x + y) % 2 === 1;
    return connectDropTarget(
      <div
        className={cx(
          styles.square,
          isDark && styles.dark,
          canDrop && styles.canDrop
        )}
      >
        {piece}
      </div>
    );
  }
}
