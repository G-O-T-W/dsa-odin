import {
  findValidMoves,
  playMove,
  isValidMove,
  hasGoal,
  knightMoves,
} from "./knightmoves";

test("playMove is working correctly", () => {
  expect(playMove([0, 0], 2, 1)).toStrictEqual([2, 1]);
});

test("isValidMove is working correctly", () => {
  expect(isValidMove([8, 2])).toBe(false);
  expect(isValidMove([3, 3])).toBe(true);
});

test("findValidMoves is working correctly", () => {
  expect(findValidMoves([0, 0])).toStrictEqual([
    [2, 1],
    [1, 2],
  ]);
});

describe("knightMoves is working correctly", () => {
  test("knightMoves([0, 0], [3, 3]) gives accurate result", () => {
    expect(knightMoves([0, 0], [3, 3])).toStrictEqual([
      [0, 0],
      [2, 1],
      [3, 3],
    ]);
  });
  test("knightMoves([3, 3], [0, 0]) gives accurate result", () => {
    expect(knightMoves([3, 3], [0, 0])).toStrictEqual([
      [3, 3],
      [1, 2],
      [0, 0],
    ]);
  });
  test("knightMoves([0, 0], [7, 7]) gives accurate result", () => {
    expect([
      [
        [0, 0],
        [2, 1],
        [4, 2],
        [6, 3],
        [4, 4],
        [6, 5],
        [7, 7],
      ],
      [
        [0, 0],
        [2, 1],
        [4, 2],
        [6, 3],
        [7, 5],
        [5, 6],
        [7, 7],
      ],
      [
        [0, 0],
        [2, 1],
        [4, 0],
        [6, 1],
        [7, 3],
        [6, 5],
        [7, 7],
      ],
    ]).toContainEqual(knightMoves([0, 0], [7, 7]));
  });
  test("knightMoves([7, 7], [0, 0]) gives accurate result", () => {
    expect([
      [
        [7, 7],
        [5, 6],
        [3, 5],
        [1, 4],
        [2, 2],
        [0, 0],
      ],
      [
        [7, 7],
        [5, 6],
        [7, 5],
        [5, 4],
        [3, 3],
        [1, 2],
        [0, 0],
      ],
      [
        [7, 7],
        [6, 5],
        [4, 4],
        [2, 3],
        [0, 2],
        [1, 0],
        [0, 0],
      ],
    ]).toContainEqual(knightMoves([7, 7], [0, 0]));
  });
});
