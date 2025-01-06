// Function to measure approximate memory usage of different data structures
function measureSpaceComplexity(n) {
    console.log(`\nMeasuring space complexity for input size n = ${n}`);
    
    // O(1) Space Complexity Example
    function constantSpace(n) {
        const start = process.memoryUsage().heapUsed;
        
        let sum = 0;
        for (let i = 0; i < n; i++) {
            sum += i;
        }
        
        const end = process.memoryUsage().heapUsed;
        return end - start;
    }
    
    // O(n) Space Complexity Example
    function linearSpace(n) {
        const start = process.memoryUsage().heapUsed;
        
        const arr = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            arr[i] = i;
        }
        
        const end = process.memoryUsage().heapUsed;
        return end - start;
    }
    
    // O(n²) Space Complexity Example
    function quadraticSpace(n) {
        const start = process.memoryUsage().heapUsed;
        
        const matrix = Array(n).fill().map(() => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                matrix[i][j] = i * j;
            }
        }
        
        const end = process.memoryUsage().heapUsed;
        return end - start;
    }
    
    // Measure and format results
    const formatBytes = (bytes) => (bytes / 1024).toFixed(2) + ' KB';
    
    const results = {
        'O(1) Constant': formatBytes(constantSpace(n)),
        'O(n) Linear': formatBytes(linearSpace(n)),
        'O(n²) Quadratic': formatBytes(quadraticSpace(n))
    };
    
    // Print results
    console.table(results);
}

// Test with different input sizes
[100, 1000, 5000].forEach(n => measureSpaceComplexity(n));