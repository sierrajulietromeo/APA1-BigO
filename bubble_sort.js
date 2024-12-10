// server.js
const express = require('express');
const app = express();
const port = 3000;



// Route to serve the HTML page
app.get('/', (req, res) => {

    // Create HTML content
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Bubble Sort</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .algorithm {
                    background-color: #f5f5f5;
                    padding: 20px;
                    margin: 20px 0;
                    border-radius: 5px;
                }
                .time {
                    color: #2c5282;
                    font-weight: bold;
                }
                button {
                    background-color: #4299e1;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                }
                button:hover {
                    background-color: #2b6cb0;
                }
                #arrayDisplay {
                    margin: 10px 0;
                    word-wrap: break-word;
                }
                #executionTime {
                    margin-top: 10px;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            
            <div class="algorithm">
                <h2>Bubble Sort</h2>
                <button onclick="runBubbleSort()">Run Bubble Sort</button>
                <div id="arrayDisplay"></div>
                <div id="executionTime"></div>
            </div>

            <script>
                function bubbleSort(arr) {
                    const array = [...arr];
                    for (let i = 0; i < array.length; i++) {
                        for (let j = 0; j < array.length - i - 1; j++) {
                            if (array[j] > array[j + 1]) {
                                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                            }
                        }
                    }
                    return array;
                }

                function runBubbleSort() {
                    // Generate random array
                    const arraySize = 1000;
                    const array = Array.from({ length: arraySize }, 
                        () => Math.floor(Math.random() * 1000)
                    );
                    
                    // Display initial array (first 20 elements)
                    document.getElementById('arrayDisplay').innerHTML = 
                        '<p><strong>Initial array (first 20 elements):</strong><br>' + 
                        array.slice(0, 20).join(', ') + '...</p>';
                    
                    // Measure sort time
                    const start = performance.now();
                    const sortedArray = bubbleSort(array);
                    const end = performance.now();
                    const executionTime = (end - start).toFixed(4);
                    
                    // Display results
                    document.getElementById('arrayDisplay').innerHTML += 
                        '<p><strong>Sorted array (first 20 elements):</strong><br>' + 
                        sortedArray.slice(0, 20).join(', ') + '...</p>';
                    
                    document.getElementById('executionTime').innerHTML = 
                        'Execution Time: <span class="time">' + executionTime + ' ms</span>';
                }
            </script>
        </body>
        </html>
    `;

    res.send(html);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
