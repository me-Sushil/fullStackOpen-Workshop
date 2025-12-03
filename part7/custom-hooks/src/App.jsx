import "./App.css";
import useCounter from "./hooks/useCounter";

function App() {
  const count = useCounter();
  return (
    <>
      <h1>{count.counter}</h1>
      <button onClick={count.handlePlus}>plus</button>
      <button onClick={count.handleMinus}>minus</button>
      <button onClick={count.handleZero}>zero</button>
    </>
  );
}

export default App;
