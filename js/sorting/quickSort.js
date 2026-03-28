import { getArray, setArray, drawArray, getDelay, sleep, stopSorting } from '../utils/helpers.js';

async function partition(start, end) {
    const arr = getArray();
    const delay = getDelay();
    const pivot = arr[end];
    let i = start;
    
    for (let j = start; j < end; j++) {
        if (stopSorting) {
            throw new Error('Сортировка остановлена');
        }
        
        drawArray([j, end]);
        await sleep(delay);
        
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            setArray(arr);
            drawArray([i, j]);
            i++;
        }
    }
    
    [arr[i], arr[end]] = [arr[end], arr[i]];
    setArray(arr);
    drawArray([i, end]);
    
    return i;
}

async function quickSortRecursive(start, end) {
    if (start >= end) return;
    
    if (stopSorting) {
        throw new Error('Сортировка остановлена');
    }
    
    const index = await partition(start, end);
    await quickSortRecursive(start, index - 1);
    await quickSortRecursive(index + 1, end);
}

export async function quickSort() {
    const arr = getArray();
    await quickSortRecursive(0, arr.length - 1);
    drawArray();
}