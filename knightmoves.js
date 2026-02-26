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
  let vis = []; // record visited
  let q = [];
  q.push(pos1);
  let path = [];
  while (q.length !== 0) {
    const pos = q.shift();
    if (JSON.stringify(pos) === JSON.stringify(pos2)) break;
    let next_moves = findValidMoves(pos);
    for (const move of next_moves) {
      if (!vis[move]) {
        vis[move] = 1;
        q.push(move);
        path[move] = pos; // Saving parent inorder to backtrack from pos2 to pos1
      }
    }
  }
  // Find Shortest Path
  let shortest_path = [];
  shortest_path.push(pos2);
  let pos = pos2;
  // Backtracking from pos2 to pos1
  while (pos !== pos1) {
    pos = path[pos];
    shortest_path.push(pos);
  }
  return shortest_path.reverse();
};

let shortest_path = knightMoves([0, 0], [7, 7]);
console.log(`You made it in ${shortest_path.length - 1} moves!`);
console.log(shortest_path);
