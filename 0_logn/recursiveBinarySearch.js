// MUST be sorted array for binary search to work!
const sortedNumbers = [2, 4, 6, 8, 10, 12, 14, 16];

function findNumber(target, start = 0, end = sortedNumbers.length - 1) {
  // Base case: number not found in this section
  if (start > end) {
    return "Number not found in array";
  }

  // Find the middle point
  const mid = Math.floor((start + end) / 2);

  // Found the target!
  if (sortedNumbers[mid] === target) {
    return `Found at position ${mid}`;
  }

  // If target is larger, search right half
  if (target > sortedNumbers[mid]) {
    return findNumber(target, mid + 1, end);
  }

  // If target is smaller, search left half
  return findNumber(target, start, mid - 1);
}

// Example call to the function
console.log(findNumber(6));