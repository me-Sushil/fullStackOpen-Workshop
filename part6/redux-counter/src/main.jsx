import { createRoot } from "react-dom/client";
import { useState } from "react";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  const incriment =()=>{
    setCount(count+1);
  }
  return (
    <>
      <div>the count is {count}</div>
      <div className="card">
        <button onClick={incriment}>Increment</button>
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
