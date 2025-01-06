const colours = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    gray: '\x1b[90m'
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function countdown() {
    for (let i = 3; i > 0; i--) {
        console.clear();
        console.log('\n\n');
        console.log(createSparkles(10));
        console.log(`\n${colours.bright}Starting search in...${colours.reset}`);
        console.log(`\n${colours.yellow}${i}${colours.reset}`);
        console.log('\n');
        console.log(createSparkles(10));
        await sleep(500);
    }
    console.clear();
    console.log('\n\n');
    console.log(createSparkles(20));
    console.log(`\n${colours.green}GO!${colours.reset}`);
    console.log('\n');
    console.log(createSparkles(20));
    await sleep(300);
}

async function animateTransition() {
    const frames = [
        '🔍 ═══════',
        '═ 🔍 ══════',
        '══ 🔍 ═════',
        '═══ 🔍 ════',
        '════ 🔍 ═══',
        '═════ 🔍 ══',
        '══════ 🔍 ═',
        '═══════ 🔍 ',
    ];
    
    for (let frame of frames) {
        console.clear();
        console.log('\n\n');
        console.log(`${colours.cyan}${frame}${colours.reset}`);
        console.log('\n\n');
        await sleep(50);
    }
}

function createSparkles(width) {
    const sparkles = ['✨', '⭐', '🌟'];
    return Array.from({ length: width }, () => 
        sparkles[Math.floor(Math.random() * sparkles.length)]
    ).join(' ');
}

function createProgressBar(current, total, width = 30) {
    const progress = Math.round((current / total) * width);
    const bar = '█'.repeat(progress) + '▒'.repeat(width - progress);
    const percentage = Math.round((current / total) * 100);
    const sparkles = percentage === 100 ? ' ✨' : '';
    return `[${bar}] ${percentage}%${sparkles}`;
}

async function displaySearchAttempt(step, value, target) {
    const compareFrames = [
        `${colours.cyan}Comparing${colours.reset}`,
        `${colours.cyan}Comparing.${colours.reset}`,
        `${colours.cyan}Comparing..${colours.reset}`,
        `${colours.cyan}Comparing...${colours.reset}`
    ];
    
    for (let frame of compareFrames) {
        console.log(`\n${frame}`);
        console.log(`${colours.yellow}${value} ${colours.gray}vs${colours.reset} ${colours.green}${target}${colours.reset}`);
        await sleep(200);
        console.clear();
    }
}

async function animateBinarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let steps = 0;
    let found = false;
    let foundIndex = -1;
    let history = [];
    
    while (left <= right) {
        steps++;
        let mid = Math.floor((left + right) / 2);
        
        // Save state for history
        history.push({
            step: steps,
            left: left,
            right: right,
            mid: mid,
            value: arr[mid],
            direction: arr[mid] < target ? 'right' : arr[mid] > target ? 'left' : 'found'
        });
        
        await animateTransition();
        
        // Create the visualization
        let visual = arr.map((num, index) => {
            if (index === mid) {
                return `${colours.red}|${num}|${colours.reset}`;
            }
            if (index === left) {
                return `${colours.yellow}[${num}]${colours.reset}`;
            }
            if (index === right) {
                return `${colours.yellow}[${num}]${colours.reset}`;
            }
            if (index >= left && index <= right) {
                return `${colours.cyan} ${num} ${colours.reset}`;
            }
            return `${colours.gray} ${num} ${colours.reset}`;
        }).join(' ');
        
        console.clear();
        console.log(`\n${colours.bright}🔍 Binary Search - Step ${steps}${colours.reset}`);
        console.log(colours.magenta + '━'.repeat(50) + colours.reset);
        console.log(`\n${colours.bright}Target: ${colours.green}${target}${colours.reset}`);
        console.log(`\nSearch Progress: ${createProgressBar(((arr.length - (right - left + 1)) / arr.length) * 100, 100)}`);
        console.log('\nArray:');
        console.log(visual);
        console.log(`\n${colours.bright}Current Search:${colours.reset}`);
        console.log(`${colours.yellow}Left: ${left}  Middle: ${mid}  Right: ${right}${colours.reset}`);
        
        await displaySearchAttempt(steps, arr[mid], target);
        
        if (arr[mid] === target) {
            found = true;
            foundIndex = mid;
            break;
        } else if (arr[mid] < target) {
            console.log(`\n${colours.blue}Target is larger ⟶ Moving right...${colours.reset}`);
            left = mid + 1;
        } else {
            console.log(`\n${colours.blue}Target is smaller ⟵ Moving left...${colours.reset}`);
            right = mid - 1;
        }
        
        await sleep(800);
    }
    
    // Display final results with history
    console.clear();
    console.log(`\n${createSparkles(30)}`);
    console.log(`\n${colours.bright}Search Complete!${colours.reset}`);
    console.log(`\n${colours.bright}Target Number: ${colours.green}${target}${colours.reset}`);
    console.log(`\n${found ? colours.green + '🎯 Target Found!' : colours.red + '❌ Target Not Found'}${colours.reset}`);
    if (found) console.log(`${colours.bright}Position: ${foundIndex}${colours.reset}`);
    console.log(`${colours.bright}Steps taken: ${steps}${colours.reset}\n`);
    
    console.log(`${colours.bright}Search History:${colours.reset}`);
    console.log('━'.repeat(50));
    
    for (let i = 0; i < history.length; i++) {
        const state = history[i];
        console.log(`\n${colours.bright}Step ${state.step}:${colours.reset}`);
        
        // Display array state for this step with bold numbers
        const stepVisual = arr.map((num, index) => {
            const boldNum = `${colours.bright}${num}${colours.reset}`;
            if (index === state.mid) {
                return `${colours.red}|${boldNum}|${colours.reset}`;
            }
            if (index === state.left) {
                return `${colours.yellow}[${boldNum}]${colours.reset}`;
            }
            if (index === state.right) {
                return `${colours.yellow}[${boldNum}]${colours.reset}`;
            }
            if (index >= state.left && index <= state.right) {
                return `${colours.cyan} ${boldNum} ${colours.reset}`;
            }
            return `${colours.gray} ${boldNum} ${colours.reset}`;
        }).join(' ');
        
        console.log(stepVisual);
        console.log(`Checked: ${colours.bright}${state.value}${colours.reset} ${state.direction === 'found' ? 
            `${colours.green}(Found!)${colours.reset}` : 
            state.direction === 'right' ? 
            `${colours.blue}(Too small)${colours.reset}` : 
            `${colours.blue}(Too large)${colours.reset}`}`);
    }
    
    return { index: foundIndex, steps };
}

// Create demo array and run animation
const size = 15;
const arr = Array.from({ length: size }, (_, i) => i * 2); // Even numbers
const target = arr[Math.floor(Math.random() * arr.length)]; // Random target from array

console.log(`${colours.bright}✨ Binary Search Visualisation ✨${colours.reset}`);
console.log(`\nArray: [${arr.join(', ')}]`);
console.log(`Target: ${target}`);
console.log('\nPress Enter to start...');

// Wait for Enter key
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', async function(data) {
    if (data[0] === 13) {  // Enter key
        process.stdin.setRawMode(false);
        process.stdin.pause();
        await countdown();
        await animateBinarySearch(arr, target);
    } else if (data[0] === 3) {  // Ctrl+C
        process.exit();
    }
});