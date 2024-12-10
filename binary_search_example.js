const colors = {
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
        console.log(`\n${colors.bright}Starting search in...${colors.reset}`);
        console.log(`\n${colors.yellow}${i}${colors.reset}`);
        console.log('\n');
        console.log(createSparkles(10));
        await sleep(500);
    }
    console.clear();
    console.log('\n\n');
    console.log(createSparkles(20));
    console.log(`\n${colors.green}GO!${colors.reset}`);
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
        console.log(`${colors.cyan}${frame}${colors.reset}`);
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
        `${colors.cyan}Comparing${colors.reset}`,
        `${colors.cyan}Comparing.${colors.reset}`,
        `${colors.cyan}Comparing..${colors.reset}`,
        `${colors.cyan}Comparing...${colors.reset}`
    ];
    
    for (let frame of compareFrames) {
        console.log(`\n${frame}`);
        console.log(`${colors.yellow}${value} ${colors.gray}vs${colors.reset} ${colors.green}${target}${colors.reset}`);
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
                return `${colors.red}|${num}|${colors.reset}`;
            }
            if (index === left) {
                return `${colors.yellow}[${num}]${colors.reset}`;
            }
            if (index === right) {
                return `${colors.yellow}[${num}]${colors.reset}`;
            }
            if (index >= left && index <= right) {
                return `${colors.cyan} ${num} ${colors.reset}`;
            }
            return `${colors.gray} ${num} ${colors.reset}`;
        }).join(' ');
        
        console.clear();
        console.log(`\n${colors.bright}🔍 Binary Search - Step ${steps}${colors.reset}`);
        console.log(colors.magenta + '━'.repeat(50) + colors.reset);
        console.log(`\n${colors.bright}Target: ${colors.green}${target}${colors.reset}`);
        console.log(`\nSearch Progress: ${createProgressBar(((arr.length - (right - left + 1)) / arr.length) * 100, 100)}`);
        console.log('\nArray:');
        console.log(visual);
        console.log(`\n${colors.bright}Current Search:${colors.reset}`);
        console.log(`${colors.yellow}Left: ${left}  Middle: ${mid}  Right: ${right}${colors.reset}`);
        
        await displaySearchAttempt(steps, arr[mid], target);
        
        if (arr[mid] === target) {
            found = true;
            foundIndex = mid;
            break;
        } else if (arr[mid] < target) {
            console.log(`\n${colors.blue}Target is larger ⟶ Moving right...${colors.reset}`);
            left = mid + 1;
        } else {
            console.log(`\n${colors.blue}Target is smaller ⟵ Moving left...${colors.reset}`);
            right = mid - 1;
        }
        
        await sleep(800);
    }
    
    // Display final results with history
    console.clear();
    console.log(`\n${createSparkles(30)}`);
    console.log(`\n${colors.bright}Search Complete!${colors.reset}`);
    console.log(`\n${colors.bright}Target Number: ${colors.green}${target}${colors.reset}`);
    console.log(`\n${found ? colors.green + '🎯 Target Found!' : colors.red + '❌ Target Not Found'}${colors.reset}`);
    if (found) console.log(`${colors.bright}Position: ${foundIndex}${colors.reset}`);
    console.log(`${colors.bright}Steps taken: ${steps}${colors.reset}\n`);
    
    console.log(`${colors.bright}Search History:${colors.reset}`);
    console.log('━'.repeat(50));
    
    for (let i = 0; i < history.length; i++) {
        const state = history[i];
        console.log(`\n${colors.bright}Step ${state.step}:${colors.reset}`);
        
        // Display array state for this step with bold numbers
        const stepVisual = arr.map((num, index) => {
            const boldNum = `${colors.bright}${num}${colors.reset}`;
            if (index === state.mid) {
                return `${colors.red}|${boldNum}|${colors.reset}`;
            }
            if (index === state.left) {
                return `${colors.yellow}[${boldNum}]${colors.reset}`;
            }
            if (index === state.right) {
                return `${colors.yellow}[${boldNum}]${colors.reset}`;
            }
            if (index >= state.left && index <= state.right) {
                return `${colors.cyan} ${boldNum} ${colors.reset}`;
            }
            return `${colors.gray} ${boldNum} ${colors.reset}`;
        }).join(' ');
        
        console.log(stepVisual);
        console.log(`Checked: ${colors.bright}${state.value}${colors.reset} ${state.direction === 'found' ? 
            `${colors.green}(Found!)${colors.reset}` : 
            state.direction === 'right' ? 
            `${colors.blue}(Too small)${colors.reset}` : 
            `${colors.blue}(Too large)${colors.reset}`}`);
    }
    
    return { index: foundIndex, steps };
}

// Create demo array and run animation
const size = 15;
const arr = Array.from({ length: size }, (_, i) => i * 2); // Even numbers
const target = arr[Math.floor(Math.random() * arr.length)]; // Random target from array

console.log(`${colors.bright}✨ Binary Search Visualization ✨${colors.reset}`);
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