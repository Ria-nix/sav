import { getArray, setArray, drawArray, getDelay, sleep, stopSorting } from '../utils/helpers.js';

export async function bubbleSort() {
    const arr = getArray();
    const delay = getDelay();
    
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (stopSorting) {
                throw new Error('Сортировка остановлена');
            }
            
            drawArray([j, j+1]);
            await sleep(delay);
            
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                setArray(arr);
                drawArray([j, j+1]);
            }
        }
    }
    drawArray();
}