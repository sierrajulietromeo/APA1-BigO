
// Color configuration for terminal output
const COLORS = Object.freeze({
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
    ].map(frame => `${COLORS.cyan}${frame}${COLORS.reset}`);
    
    for (const frame of compareFrames) {
        console.log(`\n${frame}`);
        console.log(`${COLORS.yellow}${value} ${COLORS.gray}vs${COLORS.reset} ${COLORS.green}${target}${COLORS.reset}`);
        await sleep(200);
        console.clear();
    }
};

const countdown = async () => {
    for (let i = 3; i > 0; i--) {
        console.clear();
        console.log('\n\n');
        console.log(createSparkles(10));
        console.log(`\n${COLORS.bright}Starting search in...${COLORS.reset}`);
        console.log(`\n${COLORS.yellow}${i}${COLORS.reset}`);
        console.log('\n');
        console.log(createSparkles(10));
        await sleep(500);
    }
    console.clear();
    console.log('\n\n');
    console.log(createSparkles(20));
    console.log(`\n${COLORS.green}GO!${COLORS.reset}`);
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
        console.log(`${COLORS.cyan}${frame}${COLORS.reset}`);
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
            if (index === mid) return `${COLORS.red}|${num}|${COLORS.reset}`;
            if (index === left || index === right) return `${COLORS.yellow}[${num}]${COLORS.reset}`;
            if (index >= left && index <= right) return `${COLORS.cyan} ${num} ${COLORS.reset}`;
            return `${COLORS.gray} ${num} ${COLORS.reset}`;
        }).join(' ');
        
        console.clear();
        console.log(`\n${COLORS.bright}🔍 Binary Search - Step ${steps}${COLORS.reset}`);
        console.log(COLORS.magenta + '━'.repeat(50) + COLORS.reset);
        console.log(`\n${COLORS.bright}Target: ${COLORS.green}${target}${COLORS.reset}`);
        console.log(`\nSearch Progress: ${createProgressBar(((arr.length - (right - left + 1)) / arr.length) * 100, 100)}`);
        console.log('\nArray:');
        console.log(visual);
        console.log(`\n${COLORS.bright}Current Search:${COLORS.reset}`);
        console.log(`${COLORS.yellow}Left: ${left}  Middle: ${mid}  Right: ${right}${COLORS.reset}`);
        
        await displaySearchAttempt(steps, arr[mid], target);
        
        if (arr[mid] === target) {
            found = true;
            foundIndex = mid;
            break;
        }
        
        if (arr[mid] < target) {
            console.log(`\n${COLORS.blue}Target is larger ⟶ Moving right...${COLORS.reset}`);
            left = mid + 1;
        } else {
            console.log(`\n${COLORS.blue}Target is smaller ⟵ Moving left...${COLORS.reset}`);
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
    console.log(`\n${COLORS.bright}Search Complete!${COLORS.reset}`);
    console.log(`\n${COLORS.bright}Target Number: ${COLORS.green}${target}${COLORS.reset}`);
    console.log(`\n${found ? COLORS.green + '🎯 Target Found!' : COLORS.red + '❌ Target Not Found'}${COLORS.reset}`);
    if (found) console.log(`${COLORS.bright}Position: ${foundIndex}${COLORS.reset}`);
    console.log(`${COLORS.bright}Steps taken: ${steps}${COLORS.reset}\n`);
    
    displaySearchHistory(history, arr);
};

const displaySearchHistory = (history, arr) => {
    console.log(`${COLORS.bright}Search History:${COLORS.reset}`);
    console.log('━'.repeat(50));
    
    history.forEach(state => {
        console.log(`\n${COLORS.bright}Step ${state.step}:${COLORS.reset}`);
        const stepVisual = visualizeHistoryStep(state, arr);
        console.log(stepVisual);
        console.log(getDirectionMessage(state));
    });
};

const visualizeHistoryStep = (state, arr) => {
    return arr.map((num, index) => {
        const boldNum = `${COLORS.bright}${num}${COLORS.reset}`;
        if (index === state.mid) return `${COLORS.red}|${boldNum}|${COLORS.reset}`;
        if (index === state.left || index === state.right) return `${COLORS.yellow}[${boldNum}]${COLORS.reset}`;
        if (index >= state.left && index <= state.right) return `${COLORS.cyan} ${boldNum} ${COLORS.reset}`;
        return `${COLORS.gray} ${boldNum} ${COLORS.reset}`;
    }).join(' ');
};

const getDirectionMessage = (state) => {
    const baseMessage = `Checked: ${COLORS.bright}${state.value}${COLORS.reset} `;
    if (state.direction === 'found') return baseMessage + `${COLORS.green}(Found!)${COLORS.reset}`;
    return baseMessage + `${COLORS.blue}(Too ${state.direction === 'right' ? 'small' : 'large'})${COLORS.reset}`;
};

// Initialize and run the visualization
const ARRAY_SIZE = 15;
const arr = Array.from({ length: ARRAY_SIZE }, (_, i) => i * 2);
const target = arr[Math.floor(Math.random() * arr.length)];

console.log(`${COLORS.bright}✨ Binary Search Visualisation ✨${COLORS.reset}`);
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
