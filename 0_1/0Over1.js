function addTwoElements(arr, indexOne, indexTwo) { 
    return arr[indexOne] + arr[indexTwo]; 
}

const numbers = [1, 2, 3, 4, 5];
console.log(addTwoElements(numbers, 1, 3)); // Output: 6 (adds numbers[1] which is 2 and numbers[3] which is 4)