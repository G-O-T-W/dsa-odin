// import createAdjList from "./createAdjList";
const BOARD_SIZE = 8;

export const playMove = (pos, x, y) => {
  return [pos[0] + x, pos[1] + y];
};

export const isValidMove = (pos) => {
  return (
    pos[0] >= 0 && pos[0] < BOARD_SIZE && pos[1] >= 0 && pos[1] < BOARD_SIZE
  );
};

export const findValidMoves = (pos) => {
  let valid_moves = [];
  let next_pos = playMove(pos, 2, -1);
  if (isValidMove(next_pos)) valid_moves.push(next_pos);
  next_pos = playMove(pos, 2, 1);
  if (isValidMove(next_pos)) valid_moves.push(next_pos);
  next_pos = playMove(pos, 1, 2);
  if (isValidMove(next_pos)) valid_moves.push(next_pos);
  next_pos = playMove(pos, -1, 2);
  if (isValidMove(next_pos)) valid_moves.push(next_pos);
  next_pos = playMove(pos, -2, 1);
  if (isValidMove(next_pos)) valid_moves.push(next_pos);
  next_pos = playMove(pos, -2, -1);
  if (isValidMove(next_pos)) valid_moves.push(next_pos);
  next_pos = playMove(pos, -1, -2);
  if (isValidMove(next_pos)) valid_moves.push(next_pos);
  next_pos = playMove(pos, 1, -2);
  if (isValidMove(next_pos)) valid_moves.push(next_pos);
  return valid_moves;
};

export const knightMoves = (pos1, pos2) => {
  // BFS
  const key = (pos) => `${pos[0]},${pos[1]}`;

  let vis = new Set();
  let path = new Map();
  let q = [];

  q.push(pos1);
  vis.add(key(pos1));

  while (q.length !== 0) {
    const pos = q.shift();
    if (key(pos) === key(pos2)) break;

    for (const move of findValidMoves(pos)) {
      if (!vis.has(key(move))) {
        vis.add(key(move));
        path.set(key(move), pos);
        q.push(move);
      }
    }
  }

  // Backtrack from pos2 to pos1
  let shortest_path = [];
  let pos = pos2;
  shortest_path.push(pos);
  while (key(pos) !== key(pos1)) {
    pos = path.get(key(pos));
    shortest_path.push(pos);
  }

  return shortest_path.reverse();
};



