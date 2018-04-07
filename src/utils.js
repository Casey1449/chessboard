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

export const isBlocked = (
  thisPosition,
  knightPosition,
  pieceId,
  piecePosition
) => {
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
