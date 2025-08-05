import { useState } from "react";

function App() {
  // const [left, setLeft] = useState(0);
  // const [right, setRight] = useState(0);
  const [click, handleClick] = useState({left:0, right:0})

  const handleLeftClick=()=>{
    
    handleClick(click.left + 1);

  }

  const handleRightClick=()=>{
    handleClick(click.right + 1);
  }

  return (
    <>
      <div>
        <p>The left btn is clicked {click.left} times</p>
        <button onClick={handleLeftClick}>Left BTN</button>
      </div>
      <div>
        <p>The left btn is clicked {click.right} times</p>
        <button onClick={handleRightClick}>Right BTN</button>
      </div>
    </>
  );
}

export default App;
