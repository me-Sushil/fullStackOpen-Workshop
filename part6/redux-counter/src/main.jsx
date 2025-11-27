import { createRoot } from "react-dom/client";
import { useState } from "react";
import "./index.css";
import { createStore } from "redux";

const counterReducer = (state=0, action) => {
  if (action.type === "INCREMENT") {
    return state + 1;
  } else if (action.type === "DECREMENT") {
    return state - 1;
  } else if (action.type === "ZERO") {
    return 0;
  }

  return state;
};

const store = createStore(counterReducer);

function App() {
  const [count, setCount] = useState(0);

  const incriment = () => {
    // setCount(count + 1);
    store.dispatch({ type: "INCREMENT" });
  };
  return (
    <>
      {/* <div>the count is {count}</div> */}
      <div>the count is {store.getState()}</div>
      <div className="card">
        <button onClick={incriment}>Increment</button>
      </div>
    </>
  );
}
// createRoot(document.getElementById("root")).render(<App />);
const myRoot = createRoot(document.getElementById("root"));
function myRender() {
  myRoot.render(<App />);
}
myRender();
store.subscribe(myRender);//every time store value change that time 
// myRender function call and this will render the app
