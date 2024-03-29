import "./styles.css";
//import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import {
  ACTION_HIGHLIGHT,
  bubbleSort,
  initRandomArray,
  selectionSort
} from "./sorting";
const numberInArray = 10;

function TheBars(props) {
  const h = props.highlighting;
  let bars = props.numbers.map((item, index) => {
    const myStyle = { height: item * 10 };
    const myClass = "bar " + (h.indexOf(index) === -1 ? "" : " bar-highlight");
    return (
      <Flipped key={index} flipId={item}>
        <div className={myClass} style={myStyle}>
          <span>{item}</span>
        </div>
      </Flipped>
    );
  });
  const handleComplete = () => {
    //console.log("handleComplete");
  };
  return (
    <Flipper
      className="bar-container"
      flipKey={props.numbers.join("") + "-" + props.highlighting.join("")}
      onComplete={handleComplete}
      spring="gentle"
      staggerConfig={{
        // the "default" config will apply to staggered elements without explicit keys
        default: {
          // default is .1, 0 < n < 1
          speed: 0.9
        }
      }}
    >
      {bars}
    </Flipper>
  );
}

function swapAndReturn(a, p1, p2) {
  const tmp1 = a[p1];
  const tmp2 = a[p2];
  return a.map((item, index) => {
    if (index === p1) return tmp2;
    if (index === p2) return tmp1;
    return item;
  });
}
export default function App() {
  const [numberList, setNumberList] = useState(
    initRandomArray(2, 30, numberInArray)
  );
  const [highlight, setHighlight] = useState([]);
  const isRunning = useRef(false);
  const actionIndexRef = useRef(0);
  const sortActions = useRef([]);

  const handleSelectionSort = () => {
    sortActions.current = selectionSort(numberList);
    actionIndexRef.current = 0;
    alert("Sorting is finished, you can show the steps now.");
  };

  const handleBubbleSort = () => {
    sortActions.current = bubbleSort(numberList);
    actionIndexRef.current = 0;
    alert("Sorting is finished, you can show the steps now.");
  };

  const handleShowIt = () => {
    isRunning.current = true;
    setTimeout(showNextAction, 500);
  };
  const handlePauseIt = () => {
    isRunning.current = false;
  };

  const showNextAction = () => {
    const item = sortActions.current[actionIndexRef.current];
    if (item.action === ACTION_HIGHLIGHT) {
      setHighlight([...item.payload]);
    } else {
      // console.log(actionIndexRef.current);
      // console.log(item.action + " " + item.payload);
      setNumberList((prevList) =>
        swapAndReturn(prevList, item.payload[0], item.payload[1])
      );
    }
    actionIndexRef.current = actionIndexRef.current + 1;
    if (actionIndexRef.current < sortActions.current.length) {
      // console.log("running=" + isRunning.current);
      if (!isRunning.current) {
        return;
      }
      setTimeout(showNextAction, item.delay);
    } else {
      setTimeout(() => {
        setHighlight([]);
      }, 500);
      isRunning.current = false;
      alert("Done.");
    }
  };

  const handleReset = () => {
    setNumberList(initRandomArray(2, 30, numberInArray));
    setHighlight([]);
    actionIndexRef.current = 0;
    isRunning.current = false;
  };

  return (
    <div className="App">
      <h1>Sorting Algorithm</h1>
      <TheBars numbers={numberList} highlighting={highlight} />
      <button onClick={handleSelectionSort}>Selection Sort</button>
      <button onClick={handleBubbleSort}>Bubble Sort</button>
      <br />
      <button onClick={handleShowIt}>Show the steps</button>
      <button onClick={handlePauseIt}>Pause</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
