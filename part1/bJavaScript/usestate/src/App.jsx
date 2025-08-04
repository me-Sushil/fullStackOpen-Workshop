import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  console.log(counter);
  // const handleClick=()=>{
  //   console.log("clicked")
  // }
  return (
    <>
      <button onClick={()=>{setCounter(counter+1)}}>Plus</button>
    </>
  );
};
export default App;
