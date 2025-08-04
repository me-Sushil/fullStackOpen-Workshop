import { useState } from "react";
import Display from "./Display";
import Button from "./Button";

const App = () => {
  const [counter, setCounter] = useState(0);
  console.log(counter);
  const handlePlus = () => setCounter(counter + 1);
  const handleReset = () => setCounter(0);
  const handleMinus = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };
  return (
    <>
      <Display count={counter} />
      <Button onClick={handlePlus} text="Plus"/>
      <Button onClick={handleMinus} text="Minus"/>
      <Button onClick={handleReset} text="Reset"/>
    </>
  );
};
export default App;
