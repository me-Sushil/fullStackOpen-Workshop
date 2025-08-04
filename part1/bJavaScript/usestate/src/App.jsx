import { useState } from "react";
import Display from "./Display";

const App = () => {
  const [counter, setCounter] = useState(0);
  console.log(counter);
  const handlePlus=()=>setCounter(counter+1);
  const handleReset=()=>setCounter(0);
  const handleMinus=()=>{if(counter > 0){setCounter(counter -1);}}
  return (
    <>
    <Display count ={counter} />
      <button onClick={handlePlus}>Plus</button>
      <button onClick={handleMinus}>Minus</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};
export default App;
