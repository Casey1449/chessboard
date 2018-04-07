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

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
});

@DragSource("piece", pieceSource, collect)
export default class Piece extends Component {
  componentDidMount() {
    const { id, connectDragPreview } = this.props;
    const img = new Image();
    img.src = pieceImages[id];
    img.onload = () => connectDragPreview(img);
  }

  render() {
    const { connectDragSource, isDragging, id } = this.props;

    return connectDragSource(
      <img
        className={cx(styles.piece, isDragging && styles.isDragging)}
        src={pieceImages[id]}
        alt={id}
      />
    );
  }
}
