import { 
    generateArray, 
    updateDelay, 
    getArray, 
    startSortingProcess, 
    stopSortingProcess,
    isSorting,
    resetStopFlag,
    stopSorting
} from './utils/helpers.js';
import { bubbleSort } from './sorting/bubbleSort.js';
import { quickSort } from './sorting/quickSort.js';
import { mergeSort } from './sorting/mergeSort.js';

let actionBtn, generateBtn, algorithmSelect, speedSlider, speedValue, sortingStatus;

document.addEventListener('DOMContentLoaded', () => {
    actionBtn = document.getElementById('actionBtn');
    generateBtn = document.getElementById('generateBtn');
    algorithmSelect = document.getElementById('algorithm');
    speedSlider = document.getElementById('speed');
    speedValue = document.getElementById('speedValue');
    sortingStatus = document.getElementById('sortingStatus');
    
    generateArray();
    
    speedSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        speedValue.textContent = value;
        updateDelay(Number(value));
    });
    
    actionBtn.addEventListener('click', handleAction);
    generateBtn.addEventListener('click', handleGenerate);
    
    updateStatus('ready');
});

function updateButtonsState(isSortingActive) {
    if (isSortingActive) {
        actionBtn.textContent = 'Стоп';
        actionBtn.classList.add('sorting');
        generateBtn.disabled = true;
        algorithmSelect.disabled = true;
        
        actionBtn.disabled = false;
    } else {
        actionBtn.textContent = 'Сортировать';
        actionBtn.classList.remove('sorting');
        generateBtn.disabled = false;
        algorithmSelect.disabled = false;
        
        actionBtn.disabled = false;
    }
}

function updateStatus(status, message = '') {
    sortingStatus.className = 'status';
    
    switch(status) {
        case 'sorting':
            sortingStatus.textContent = message || 'Сортировка выполняется...';
            sortingStatus.classList.add('sorting');
            break;
        case 'completed':
            sortingStatus.textContent = message || 'Сортировка завершена!';
            sortingStatus.classList.add('completed');
            break;
        case 'stopped':
            sortingStatus.textContent = message || 'Сортировка остановлена';
            sortingStatus.classList.add('stopped');
            break;
        default:
            sortingStatus.textContent = 'Готов к работе';
            sortingStatus.classList.add('completed');
    }
}

function handleGenerate() {
    if (isSorting()) {
        updateStatus('sorting', 'Сначала остановите сортировку');
        return;
    }
    
    generateArray();
    updateStatus('ready');
}

async function handleAction() {
    if (isSorting()) {
        stopSortingProcess();
        updateStatus('stopped', 'Останавливаю сортировку...');
        updateButtonsState(false);
    } else {
        await startSort();
    }
}

async function startSort() {
    const algorithm = algorithmSelect.value;
    const algorithmNames = {
        'bubble': 'Пузырьковая сортировка',
        'quick': 'Быстрая сортировка',
        'merge': 'Сортировка слиянием'
    };
    
    startSortingProcess();
    updateButtonsState(true);
    updateStatus('sorting', `Выполняется ${algorithmNames[algorithm]}...`);
    
    try {
        if (algorithm === 'bubble') {
            await bubbleSort();
        } else if (algorithm === 'quick') {
            await quickSort();
        } else if (algorithm === 'merge') {
            await mergeSort();
        }

        if (!stopSorting) {
            updateStatus('completed', `${algorithmNames[algorithm]} успешно завершена!`);
        }
    } catch (error) {
        if (error.message === 'Сортировка остановлена') {
            updateStatus('stopped', `${algorithmNames[algorithm]} остановлена`);
        } else {
            console.error('Ошибка при сортировке:', error);
            updateStatus('stopped', `Ошибка: ${error.message}`);
        }
    } finally {
        stopSortingProcess();
        updateButtonsState(false);
        resetStopFlag();
    }
}