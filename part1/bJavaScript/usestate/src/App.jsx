import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  console.log("counter", counter);
  setTimeout(() => {
    setCounter(counter + 1);
  }, 1000);
  return (
    <>
      <p>Count is {counter}</p>
    </>
  );
};
export default App;
