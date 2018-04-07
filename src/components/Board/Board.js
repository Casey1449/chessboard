import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { connect } from "react-redux";
import { movePiece } from "../../store/actions/index";
import Piece from "../Piece/Piece";
import Square from "../Square/Square";
import styles from "./Board.css";

@connect(({ piecePositions }) => ({ piecePositions }), {
  movePiece
})
@DragDropContext(HTML5Backend)
export default class Board extends Component {
  makeSquare = i => {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const { piecePositions } = this.props;
    const { knight, bishop } = piecePositions;
    let piece = null;
    if (x === knight[0] && y === knight[1]) {
      piece = <Piece id={"knight"} />;
    }
    if (x === bishop[0] && y === bishop[1]) {
      piece = <Piece id={"bishop"} />;
    }
    return (
      <Square
        key={`${x}${y}`}
        x={x}
        y={y}
        piece={piece}
        piecePositions={piecePositions}
        movePiece={this.props.movePiece}
      />
    );
  };

  render() {
    const squares = Array(64)
      .fill()
      .map((s, i) => this.makeSquare(i));

    return <div className={styles.board}>{squares}</div>;
  }
}
