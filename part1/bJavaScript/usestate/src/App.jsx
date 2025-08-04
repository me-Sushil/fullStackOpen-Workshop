// import { useState } from "react";

const App = () => {
  //const [counter, setCounter] = useState(0);
  const handleClick=()=>{
    console.log("clicked")
  }
  return (
    <>
      <button onClick={handleClick}>Plus</button>
    </>
  );
};
export default App;
