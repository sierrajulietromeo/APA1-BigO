const ARRAY_SIZE = 15;
const testArray = Array.from({ length: ARRAY_SIZE }, (_, i) => i * 2);
const target = testArray[Math.floor(Math.random() * testArray.length)];

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

console.log('Binary Search Result:', binarySearch(testArray, target));