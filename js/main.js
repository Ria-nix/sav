const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let array = [];
let delay = 30;
let width = 10;

// Генерация массива
function generateArray() {
  array = [];
  for (let i = 0; i < 80; i++) {
    array.push(Math.random() * 300 + 10);
  }
  drawArray();
}

// Отрисовка
function drawArray(active = []) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < array.length; i++) {
    ctx.fillStyle = active.includes(i) ? "red" : "lime";
    ctx.fillRect(i * width, canvas.height - array[i], width - 1, array[i]);
  }
}

// Задержка
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ======================
// Bubble Sort
// ======================
async function bubbleSort() {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      drawArray([j, j + 1]);
      await sleep(delay);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  drawArray();
}

// ======================
// Quick Sort
// ======================
async function quickSort(start = 0, end = array.length - 1) {
  if (start >= end) return;

  let index = await partition(start, end);
  await quickSort(start, index - 1);
  await quickSort(index + 1, end);
}

async function partition(start, end) {
  let pivot = array[end];
  let i = start;

  for (let j = start; j < end; j++) {
    drawArray([j, end]);
    await sleep(delay);

    if (array[j] < pivot) {
      [array[i], array[j]] = [array[j], array[i]];
      i++;
    }
  }

  [array[i], array[end]] = [array[end], array[i]];
  return i;
}

// ======================
// Merge Sort
// ======================
async function mergeSort(start = 0, end = array.length - 1) {
  if (start >= end) return;

  let mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
}

async function merge(start, mid, end) {
  let left = array.slice(start, mid + 1);
  let right = array.slice(mid + 1, end + 1);

  let i = 0,
    j = 0,
    k = start;

  while (i < left.length && j < right.length) {
    drawArray([k]);
    await sleep(delay);

    if (left[i] < right[j]) {
      array[k++] = left[i++];
    } else {
      array[k++] = right[j++];
    }
  }

  while (i < left.length) {
    array[k++] = left[i++];
  }

  while (j < right.length) {
    array[k++] = right[j++];
  }
}

// ======================
// Управление
// ======================
async function startSort() {
  let algo = document.getElementById("algorithm").value;

  if (algo === "bubble") {
    await bubbleSort();
  } else if (algo === "quick") {
    await quickSort();
  } else if (algo === "merge") {
    await mergeSort();
  }
}

generateArray();
