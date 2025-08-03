const react = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(react);


const SayHello =(props)=>{
return React.createElement("p", {class:"myP"}, `Hello ${props.name}`);
}

const App=()=>{
 const myDiv = React.createElement("div", {class:"mydiv"}, [
React.createElement(SayHello, {naem:"Sushil"}),
React.createElement(SayHello, {name:"sudesh"}),
React.createElement(SayHello, {name:"sugam"})
 ])
  return myDiv;
} 
reactRoot.render(React.createElement(App));