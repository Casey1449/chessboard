export const MOVE_KNIGHT = "MOVE_KNIGHT";
export const MOVE_BISHOP = "MOVE_BISHOP";

export const moveKnight = (x, y) => ({
  type: MOVE_KNIGHT,
  position: [x, y]
});

export const moveBishop = (x, y) => ({
  type: MOVE_BISHOP,
  position: [x, y]
});
