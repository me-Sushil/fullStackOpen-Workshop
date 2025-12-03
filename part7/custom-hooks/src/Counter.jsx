import useCounter from "./hooks/useCounter";

const Counter = () => {
  const count = useCounter();
  const count2 = useCounter();
  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <h1>{count.counter}</h1>
          <button onClick={count.handlePlus}>plus</button>
          <button onClick={count.handleMinus}>minus</button>
          <button onClick={count.handleZero}>zero</button>
        </div>
        <div>
          <h1>{count2.counter}</h1>
          <button onClick={count2.handlePlus}>plus</button>
          <button onClick={count2.handleMinus}>minus</button>
          <button onClick={count2.handleZero}>zero</button>
        </div>
      </div>
    </>
  );
};

export default Counter;
