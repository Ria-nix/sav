export let array = [];
export let delay = 30;
export let isSortingActive = false; 
export let stopSorting = false; 

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const BAR_WIDTH = 10;

export function generateArray() {
    if (isSortingActive) return false; 
    
    array = [];
    for (let i = 0; i < 80; i++) {
        array.push(Math.random() * 300 + 10);
    }
    drawArray();
    return true;
}

export function drawArray(active = []) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < array.length; i++) {
        ctx.fillStyle = active.includes(i) ? "#ff4444" : "#4caf50";
        ctx.fillRect(i * BAR_WIDTH, canvas.height - array[i], BAR_WIDTH - 1, array[i]);
    }
}

export async function sleep(ms) {
    return new Promise((resolve, reject) => {
        let timeoutId = null;
        let intervalId = null;
        
        timeoutId = setTimeout(() => {
            if (intervalId) clearInterval(intervalId);
            resolve();
        }, ms);
        
        intervalId = setInterval(() => {
            if (stopSorting) {
                // Очищаем оба таймера
                if (timeoutId) clearTimeout(timeoutId);
                if (intervalId) clearInterval(intervalId);
                reject(new Error('Сортировка остановлена'));
            }
        }, 10);
    });
}

export async function sleepWithRAF(ms) {
    return new Promise((resolve, reject) => {
        const startTime = performance.now();
        let animationFrameId = null;
        
        function checkStopAndTime(currentTime) {
            if (stopSorting) {
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
                reject(new Error('Сортировка остановлена'));
                return;
            }
            
            if (currentTime - startTime >= ms) {
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
                resolve();
                return;
            }
            
            animationFrameId = requestAnimationFrame(checkStopAndTime);
        }
        
        animationFrameId = requestAnimationFrame(checkStopAndTime);
    });
}

export function updateDelay(value) {
    delay = value;
}

export function getDelay() {
    return delay;
}

export function setArray(newArray) {
    array = newArray;
}

export function getArray() {
    return array;
}

export function startSortingProcess() {
    isSortingActive = true;
    stopSorting = false;
}

export function stopSortingProcess() {
    stopSorting = true;
    isSortingActive = false;
}

export function isSorting() {
    return isSortingActive;
}

export function resetStopFlag() {
    stopSorting = false;
}