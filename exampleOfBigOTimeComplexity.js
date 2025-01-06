// Example 1: O(n) Time Complexity
function linearSearch(arr, target) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === target) {
            return i;
        }
    }
    return -1;
}

// Example 2: O(log n) Time Complexity
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// Example usage and comparison of linear and binary search
console.log('Starting search in hugeArray');
const hugeArray = Array.from({length: 10000000}, (_, i) => i);
const target = 9999999;

console.time('Linear Search Time');
console.log('Linear Search Result:', linearSearch(hugeArray, target));
console.timeEnd('Linear Search Time');

console.time('Binary Search Time');
console.log('Binary Search Result:', binarySearch(hugeArray, target));
console.timeEnd('Binary Search Time');