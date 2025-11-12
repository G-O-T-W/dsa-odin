#!/usr/bin/env node
function merge(arr, low, mid, high) {
    let temp = [];
    let left = low;
    let right = mid + 1;
    while(left <= mid && right <= high) {
        if(arr[left] <= arr[right]){
            temp.push(arr[left]);
            left++;
        } else {
            temp.push(arr[right]);
            right++;
        }
    }
    while(left <= mid) temp.push(arr[left++]);
    while(right <= high) temp.push(arr[right++]);
    for(let i = low; i <= high; i++){
        arr[i] = temp[i - low];
    }
}

function mergeSort(arr, low, high) {
  if(low >= high) return;
  const mid = parseInt(( low + high ) / 2);
  mergeSort(arr, 0, mid);
  mergeSort(arr, mid + 1, high);
  merge(arr, low, mid, high);
}

arr = [5, 8, 4, 7, 1, 9];
console.log("Unsorted array\n", arr);

mergeSort(arr, 0, arr.length - 1);
console.log("Sorted Array\n", arr);