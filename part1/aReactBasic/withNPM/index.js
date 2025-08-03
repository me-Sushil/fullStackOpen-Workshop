const react = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(react);

const SayHello = (props) => {
  //to ctrate element we need 3 things //tagName  //attribute  // text of tag  or  children
  // this is text example
  return React.createElement("p", { class: "pCalss" }, `Hello ${props.name}`);
};

const App = () => {
  const myDiv = React.createElement("div", { class: "divClass" }, [
    React.createElement("h1", { class: "h1Calss" }, `Hello world `),
    React.createElement(SayHello, { name: "sushil" }),
    React.createElement(SayHello, { name: "sudesh" }),
    React.createElement(SayHello, { name: "sugam" }),
  ]);
  return myDiv;
};
reactRoot.render(React.createElement(App));

// this is children example
// const reactH2 = React.createElement("h2", {class:"h2tag"}, "hello bro world ", React.createElement("strong", null, "boldok"), " this is outer text ok");
// reactRoot.render(reactH2);
