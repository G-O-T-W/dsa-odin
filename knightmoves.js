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

export const hasGoal = (arr, pos2) => {
  let contains = arr.some((pos) => {
    return JSON.stringify(pos) === JSON.stringify(pos2);
  });
  return !contains ? false : true;
};

export const createAdjList = (pos1, pos2) => {
  let adj = [];
  let q = [];
  q.push(pos1);
  while (q.length !== 0) {
    const pos = q.shift();
    if (adj[pos]) continue;
    let next_moves = findValidMoves(pos);
    q = [...q, ...next_moves];
    adj[pos] = next_moves;
    if (JSON.stringify(pos) === JSON.stringify(pos2)) break;
    // if (hasGoal(next_moves, pos2)) break;
  }
  return adj;
};



export function shortestPath(pos1, pos2) {
  let vis = [];
  let q = [];
  let path = [];
  q.push(pos1);
  while (q.length !== 0) {
    const pos = q.shift();
    if (vis[pos]) continue;
    let next_moves = findValidMoves(pos);
    q = [...q, ...next_moves];
    if (JSON.stringify(pos) === JSON.stringify(pos2)) break;
  }
  return adj;
}

export const knightMoves = (pos1, pos2) => {
  let vis = [];
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
        path[move] = pos; 
      }
    }
  }
  let shortest_path = [];
  shortest_path.push(pos2);
  let pos = pos2;
  while (pos !== pos1) {
    pos = path[pos];
    shortest_path.push(pos);
  }
  return shortest_path.reverse();
};

let shortest_path = knightMoves([0, 0], [4, 5]);
console.log(`You made it in ${shortest_path.length - 1} moves!`);
console.log(shortest_path);
