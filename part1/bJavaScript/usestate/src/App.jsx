import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  console.log(counter);
  const handlePlus=()=>setCounter(counter+1);
  const handleReset=()=>setCounter(0);
  return (
    <>
    <p>Count is: {counter}</p>
      <button onClick={handlePlus}>Plus</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};
export default App;
