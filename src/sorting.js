const ACTION_HIGHLIGHT = "highlight";
const ACTION_SWAP = "swap";

function initRandomArray(begin, end, count) {
  let ret = [];
  for (let i = 0; i < count; i++) {
    ret.push(getRandomInt(begin, end));
  }
  return ret;
}

function getRandomInt(begin, end) {
  return Math.floor(Math.random() * (end - begin)) + begin;
}

function swap(a, p1, p2) {
  const tmp = a[p1];
  a[p1] = a[p2];
  a[p2] = tmp;
}

const selectionSort = (numberList) => {
  let innerArray = [...numberList];
  const len = innerArray.length;
  let sortActions = [];
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      sortActions.push({
        action: ACTION_HIGHLIGHT,
        payload: [i, minIndex, j],
        delay: 500
      });
      if (innerArray[j] < innerArray[minIndex]) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      sortActions.push({
        action: ACTION_SWAP,
        payload: [i, minIndex],
        delay: 1000
      });
      swap(innerArray, i, minIndex);
      //        console.log(i + ", " + minIndex);
    }
  }
  return sortActions;
};

const bubbleSort = (numberList) => {
  let innerArray = [...numberList];
  const len = innerArray.length;
  let sortActions = [];
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      sortActions.push({
        action: ACTION_HIGHLIGHT,
        payload: [j, j + 1],
        delay: 500
      });
      if (innerArray[j + 1] < innerArray[j]) {
        sortActions.push({
          action: ACTION_SWAP,
          payload: [j, j + 1],
          delay: 1000
        });
        swap(innerArray, j, j + 1);
      }
    }
  }
  return sortActions;
};

export {
  ACTION_HIGHLIGHT,
  ACTION_SWAP,
  initRandomArray,
  selectionSort,
  bubbleSort
};
