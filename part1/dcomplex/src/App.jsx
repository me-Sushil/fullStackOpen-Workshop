import { useState } from "react";

function App() {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  return (
    <>
      <div>
        <p>The left btn is clicked {left} times</p>
        <button onClick={()=>setLeft(left +1)}>Left BTN</button>
      </div>
      <div>
        <p>The left btn is clicked {right} times</p>
        <button onClick={()=>setRight(right +1)}>Right BTN</button>
      </div>
    </>
  );
}

export default App;
