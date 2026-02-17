#!/usr/bin/env node
function fibo(n) {
  let ans = [];
  if(n == 0) return ans;
  let t1 = 0;
  let t2 = 1;
  ans.push(t1);
  if(n == 1) return ans;
  ans.push(t2);
  if(n == 2) return ans;
  for(let i = 3; i <= n; i++){
    let t3 = t1 + t2;
    t1 = t2;
    t2 = t3;
    ans.push(t3);
  }
  return ans;
}

function fiboRes(n) {

  if (n <= 0) return [];
  if (n == 1) return [0];
  if (n == 2) return [0, 1];
  let s = fiboRes(n-1);
  if(s.length == 0) return s;
  s.push(s[s.length - 1]+s[s.length - 2]);
  return s;
}

console.log(fibo(10));
console.log(fiboRes(10));