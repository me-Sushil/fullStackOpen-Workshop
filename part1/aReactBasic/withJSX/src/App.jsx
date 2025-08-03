import SayHello from "./SayHello";

const App = () => {
  // const myDiv = React.createElement("div", {}, [
  // React.createElement("h1", {class:"hello"}, "Hello World"),
  // React.createElement(SayHello, {name:"Sushil"}),
  // React.createElement(SayHello, {name:"Sudesh"}),
  // React.createElement(SayHello, {name:"Sugam"})
  //  ])
  //   return myDiv;

  return (
    <div>
      <h1 className="hello">Hello World</h1>
      <SayHello name="Sushil"/>
      <SayHello name="Sudesh"/>
      <SayHello name="Sugam"/>
    </div>
  );
};
export default App;
