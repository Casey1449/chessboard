import React, { Component } from "react";
import styles from "./Piece.css";
import { DragSource } from "react-dnd";
import bishopImg from "../../static/bishop_white.png";
import knightImg from "../../static/knight_black.png";
import cx from "classnames";

const pieceImages = {
  knight: knightImg,
  bishop: bishopImg
};

const pieceSource = {
  beginDrag(props) {
    const item = { id: props.id, prevX: props.x, prevY: props.y };
    return item;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

@DragSource("piece", pieceSource, collect)
export default class Piece extends Component {
  componentDidMount() {
    const img = new Image();
    img.src = pieceImages[this.props.id];

    img.onload = () => this.props.connectDragPreview(img);
  }
  render() {
    const { connectDragSource, isDragging, id } = this.props;
    // if (isDragging) {
    //   return this.props.connectDragPreview(knightImg);
    // }
    return connectDragSource(
      <img
        className={cx(styles.piece, isDragging && styles.isDragging)}
        src={pieceImages[id]}
        alt={id}
      />
    );
  }
}
