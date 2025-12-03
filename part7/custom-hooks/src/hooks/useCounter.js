import { useState } from "react";

const useCounter = () => {
  const [counter, setCounter] = useState(0);

  const handlePlus = () => {
    setCounter(counter + 1);
  };
  const handleMinus = () => {
    setCounter(counter - 1);
  };
  const handleZero = () => {
    setCounter(0);
  };

  return {
    counter,
    handleMinus,
    handlePlus,
    handleZero,
  };
};
export default useCounter;