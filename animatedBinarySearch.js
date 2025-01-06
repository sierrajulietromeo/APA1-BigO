// Colour configuration for terminal output
const COLOURS = Object.freeze({
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    gray: '\x1b[90m'
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const createSparkles = (width) => {
    const SPARKLE_TYPES = ['✨', '⭐', '🌟'];
    return Array.from(
        { length: width }, 
        () => SPARKLE_TYPES[Math.floor(Math.random() * SPARKLE_TYPES.length)]
    ).join(' ');
};

const createProgressBar = (current, total, width = 30) => {
    const progress = Math.round((current / total) * width);
    const bar = '█'.repeat(progress) + '▒'.repeat(width - progress);
    const percentage = Math.round((current / total) * 100);
    return `[${bar}] ${percentage}%${percentage === 100 ? ' ✨' : ''}`;
};

const displaySearchAttempt = async (step, value, target) => {
    const compareFrames = [
        'Comparing',
        'Comparing.',
        'Comparing..',
        'Comparing...'
    ].map(frame => `${COLOURS.cyan}${frame}${COLOURS.reset}`);
    
    for (const frame of compareFrames) {
        console.log(`\n${frame}`);
        console.log(`${COLOURS.yellow}${value} ${COLOURS.gray}vs${COLOURS.reset} ${COLOURS.green}${target}${COLOURS.reset}`);
        await sleep(200);
        console.clear();
    }
};

const countdown = async () => {
    for (let i = 3; i > 0; i--) {
        console.clear();
        console.log('\n\n');
        console.log(createSparkles(10));
        console.log(`\n${COLOURS.bright}Starting search in...${COLOURS.reset}`);
        console.log(`\n${COLOURS.yellow}${i}${COLOURS.reset}`);
        console.log('\n');
        console.log(createSparkles(10));
        await sleep(500);
    }
    console.clear();
    console.log('\n\n');
    console.log(createSparkles(20));
    console.log(`\n${COLOURS.green}GO!${COLOURS.reset}`);
    console.log('\n');
    console.log(createSparkles(20));
    await sleep(300);
};

const animateTransition = async () => {
    const FRAMES = [
        '🔍 ═══════',
        '═ 🔍 ══════',
        '══ 🔍 ═════',
        '═══ 🔍 ════',
        '════ 🔍 ═══',
        '═════ 🔍 ══',
        '══════ 🔍 ═',
        '═══════ 🔍 '
    ];
    
    for (const frame of FRAMES) {
        console.clear();
        console.log('\n\n');
        console.log(`${COLOURS.cyan}${frame}${COLOURS.reset}`);
        console.log('\n\n');
        await sleep(50);
    }
};

const animateBinarySearch = async (arr, target) => {
    let left = 0;
    let right = arr.length - 1;
    let steps = 0;
    let found = false;
    let foundIndex = -1;
    const history = [];
    
    while (left <= right) {
        steps++;
        const mid = Math.floor((left + right) / 2);
        
        history.push({
            step: steps,
            left,
            right,
            mid,
            value: arr[mid],
            direction: arr[mid] < target ? 'right' : arr[mid] > target ? 'left' : 'found'
        });
        
        await animateTransition();
        
        const visual = arr.map((num, index) => {
            if (index === mid) return `${COLOURS.red}|${num}|${COLOURS.reset}`;
            if (index === left || index === right) return `${COLOURS.yellow}[${num}]${COLOURS.reset}`;
            if (index >= left && index <= right) return `${COLOURS.cyan} ${num} ${COLOURS.reset}`;
            return `${COLOURS.gray} ${num} ${COLOURS.reset}`;
        }).join(' ');
        
        console.clear();
        console.log(`\n${COLOURS.bright}🔍 Binary Search - Step ${steps}${COLOURS.reset}`);
        console.log(COLOURS.magenta + '━'.repeat(50) + COLOURS.reset);
        console.log(`\n${COLOURS.bright}Target: ${COLOURS.green}${target}${COLOURS.reset}`);
        console.log(`\nSearch Progress: ${createProgressBar(((arr.length - (right - left + 1)) / arr.length) * 100, 100)}`);
        console.log('\nArray:');
        console.log(visual);
        console.log(`\n${COLOURS.bright}Current Search:${COLOURS.reset}`);
        console.log(`${COLOURS.yellow}Left: ${left}  Middle: ${mid}  Right: ${right}${COLOURS.reset}`);
        
        await displaySearchAttempt(steps, arr[mid], target);
        
        if (arr[mid] === target) {
            found = true;
            foundIndex = mid;
            break;
        }
        
        if (arr[mid] < target) {
            console.log(`\n${COLOURS.blue}Target is larger ⟶ Moving right...${COLOURS.reset}`);
            left = mid + 1;
        } else {
            console.log(`\n${COLOURS.blue}Target is smaller ⟵ Moving left...${COLOURS.reset}`);
            right = mid - 1;
        }
        
        await sleep(800);
    }
    
    displayResults(found, foundIndex, steps, target, history, arr);
    return { index: foundIndex, steps };
};

const displayResults = (found, foundIndex, steps, target, history, arr) => {
    console.clear();
    console.log(`\n${createSparkles(30)}`);
    console.log(`\n${COLOURS.bright}Search Complete!${COLOURS.reset}`);
    console.log(`\n${COLOURS.bright}Target Number: ${COLOURS.green}${target}${COLOURS.reset}`);
    console.log(`\n${found ? COLOURS.green + '🎯 Target Found!' : COLOURS.red + '❌ Target Not Found'}${COLOURS.reset}`);
    if (found) console.log(`${COLOURS.bright}Position: ${foundIndex}${COLOURS.reset}`);
    console.log(`${COLOURS.bright}Steps taken: ${steps}${COLOURS.reset}\n`);
    
    displaySearchHistory(history, arr);
};

const displaySearchHistory = (history, arr) => {
    console.log(`${COLOURS.bright}Search History:${COLOURS.reset}`);
    console.log('━'.repeat(50));
    
    history.forEach(state => {
        console.log(`\n${COLOURS.bright}Step ${state.step}:${COLOURS.reset}`);
        const stepVisual = visualizeHistoryStep(state, arr);
        console.log(stepVisual);
        console.log(getDirectionMessage(state));
    });
};

const visualizeHistoryStep = (state, arr) => {
    return arr.map((num, index) => {
        const boldNum = `${COLOURS.bright}${num}${COLOURS.reset}`;
        if (index === state.mid) return `${COLOURS.red}|${boldNum}|${COLOURS.reset}`;
        if (index === state.left || index === state.right) return `${COLOURS.yellow}[${boldNum}]${COLOURS.reset}`;
        if (index >= state.left && index <= state.right) return `${COLOURS.cyan} ${boldNum} ${COLOURS.reset}`;
        return `${COLOURS.gray} ${boldNum} ${COLOURS.reset}`;
    }).join(' ');
};

const getDirectionMessage = (state) => {
    const baseMessage = `Checked: ${COLOURS.bright}${state.value}${COLOURS.reset} `;
    if (state.direction === 'found') return baseMessage + `${COLOURS.green}(Found!)${COLOURS.reset}`;
    return baseMessage + `${COLOURS.blue}(Too ${state.direction === 'right' ? 'small' : 'large'})${COLOURS.reset}`;
};

// Initialize and run the visualisation
const ARRAY_SIZE = 15;
const arr = Array.from({ length: ARRAY_SIZE }, (_, i) => i * 2);
const target = arr[Math.floor(Math.random() * arr.length)];

console.log(`${COLOURS.bright}✨ Binary Search Visualisation ✨${COLOURS.reset}`);
console.log(`\nArray: [${arr.join(', ')}]`);
console.log(`Target: ${target}`);
console.log('\nPress Enter to start...');

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', async data => {
    if (data[0] === 13) {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        await countdown();
        await animateBinarySearch(arr, target);
    } else if (data[0] === 3) {
        process.exit();
    }
});