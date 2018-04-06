import React, { Component } from "react";
import styles from "./Square.css";
import cx from "classnames";
import { DropTarget } from "react-dnd";
import { checkMove } from "../../store/reducers/index";

const isBlocked = (thisPosition, knightPosition, pieceId, piecePosition) => {
  const pieceHasBlocker = checkMove(piecePosition, knightPosition, pieceId);
  if (pieceHasBlocker) {
    const [knightX, knightY] = knightPosition;
    const [thisX, thisY] = thisPosition;
    const [bishopX, bishopY] = piecePosition;
    const knightDx = bishopX - knightX;
    const knightDy = bishopY - knightY;
    if (knightDx > 0 && knightDy > 0) {
      return thisX < knightX && thisY < knightY;
    }
    if (knightDx < 0 && knightDy > 0) {
      return thisX > knightX && thisY < knightY;
    }
    if (knightDx < 0 && knightDy < 0) {
      return thisX > knightX && thisY > knightY;
    }
    if (knightDx > 0 && knightDy < 0) {
      return thisX < knightX && thisY > knightY;
    }
  }
  return;
};

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
    if (pieceId === "bishop") {
      props.moveBishop(props.x, props.y);
    }
    if (pieceId === "knight") {
      props.moveKnight(props.x, props.y);
    }
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

@DropTarget("piece", squareTarget, collect)
export default class Square extends Component {
  render() {
    const { x, y, connectDropTarget, isOver, canDrop, piece } = this.props;
    const isDark = (x + y) % 2 === 1;
    return connectDropTarget(
      <div
        className={cx(
          styles.square,
          isDark && styles.dark,
          isOver && styles.isOver,
          canDrop && styles.canDrop
        )}
      >
        {piece}
      </div>
    );
  }
}
