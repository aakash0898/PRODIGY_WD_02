let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.querySelector('.display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.querySelector('.laps');

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const millisecondsFormatted = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${minutes}:${seconds}:${millisecondsFormatted.slice(0, 2)}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(function() {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timer);
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    laps = [];
    updateDisplay();
    lapsList.innerHTML = '';
}

function lapTimer() {
    laps.push(elapsedTime);
    const lapTime = laps[laps.length - 1] - (laps.length > 1 ? laps[laps.length - 2] : 0);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
    lapsList.appendChild(lapItem);
}

startBtn.addEventListener('click', function() {
    if (!isRunning) {
        startTimer();
    }
});

pauseBtn.addEventListener('click', function() {
    if (isRunning) {
        pauseTimer();
    }
});

resetBtn.addEventListener('click', function() {
    resetTimer();
});

lapBtn.addEventListener('click', function() {
    if (isRunning) {
        lapTimer();
    }
});

updateDisplay();
