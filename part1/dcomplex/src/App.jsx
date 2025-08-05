import { useState } from "react";

function App() {
  // const [left, setLeft] = useState(0);
  // const [right, setRight] = useState(0);
  const [click, handleClick] = useState({left:0, right:0})
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);
  
  const handleLeftClick=()=>{
    setAll(allClicks.concat("L"));
    const updateLeft ={...click, left: click.left+1};
    handleClick(updateLeft);
    setTotal(updateLeft.left + click.right);


  }

  const handleRightClick=()=>{
    setAll(allClicks.concat("R"));
    handleClick({...click, right:click.right+1});
    console.log("right click",click.right)

    const updateRight = {...click, right:click.right+1};
    handleClick(updateRight);
    setTotal(click.left + updateRight.right);
  }

  return (
    <>
      <div>
        <p>update arr {allClicks.join(" ")}</p>
        <p>The left btn is clicked {click.left} times</p>
        <button onClick={handleLeftClick}>Left BTN</button>
        <p>The right btn is clicked {click.right} times</p>
        <button onClick={handleRightClick}>Right BTN</button>
        <p>The Total {total}</p>
      </div>
    </>
  );
}

export default App;
