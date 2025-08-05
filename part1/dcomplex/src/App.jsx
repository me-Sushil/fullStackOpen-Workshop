import { useState } from "react";

function App() {
  // const [left, setLeft] = useState(0);
  // const [right, setRight] = useState(0);
  const [click, handleClick] = useState({left:0, right:0})
  const [allClicks, setAll] = useState([]);

  const handleLeftClick=()=>{
    setAll(allClicks.concat("L"));
    handleClick({...click, left: click.left+1});
  }

  const handleRightClick=()=>{
    setAll(allClicks.concat("U"));
    handleClick({...click, right:click.right+1});
  }

  return (
    <>
      <div>
        <p>update arr {allClicks.join(" ")}</p>
        <p>The left btn is clicked {click.left} times</p>
        <button onClick={handleLeftClick}>Left BTN</button>
      </div>
      <div>
        <p>The right btn is clicked {click.right} times</p>
        <button onClick={handleRightClick}>Right BTN</button>
      </div>
    </>
  );
}

export default App;
