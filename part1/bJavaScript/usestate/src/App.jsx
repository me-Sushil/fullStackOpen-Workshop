import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  console.log(counter);
  // const handleClick=()=>{
  //   console.log("clicked")
  // }
  return (
    <>
    <p>Count is: {counter}</p>
      <button onClick={()=>{setCounter(counter+1)}}>Plus</button>
      <button onClick={()=>{setCounter(0)}}>Reset</button>
    </>
  );
};
export default App;
