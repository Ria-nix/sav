import { getArray, setArray, drawArray, getDelay, sleep, stopSorting } from '../utils/helpers.js';

async function merge(start, mid, end) {
    const arr = getArray();
    const delay = getDelay();
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);
    
    let i = 0, j = 0, k = start;
    
    while (i < left.length && j < right.length) {
        if (stopSorting) {
            throw new Error('Сортировка остановлена');
        }
        
        drawArray([k]);
        await sleep(delay);
        
        if (left[i] < right[j]) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = right[j++];
        }
        setArray(arr);
        drawArray([k-1]);
    }
    
    while (i < left.length) {
        if (stopSorting) {
            throw new Error('Сортировка остановлена');
        }
        
        arr[k++] = left[i++];
        setArray(arr);
        drawArray([k-1]);
        await sleep(delay);
    }
    
    while (j < right.length) {
        if (stopSorting) {
            throw new Error('Сортировка остановлена');
        }
        
        arr[k++] = right[j++];
        setArray(arr);
        drawArray([k-1]);
        await sleep(delay);
    }
}

async function mergeSortRecursive(start, end) {
    if (start >= end) return;
    
    if (stopSorting) {
        throw new Error('Сортировка остановлена');
    }
    
    const mid = Math.floor((start + end) / 2);
    await mergeSortRecursive(start, mid);
    await mergeSortRecursive(mid + 1, end);
    await merge(start, mid, end);
}

export async function mergeSort() {
    await mergeSortRecursive(0, getArray().length - 1);
    drawArray();
}