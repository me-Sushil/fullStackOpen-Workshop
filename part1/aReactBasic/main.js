const react = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(react);

//to ctrate element we need 3 things //tagName  //attribute  // text of tag  or  children
// this is text example
const reactH1 = React.createElement("h1", {class:"h1tag"}, "hello world");
reactRoot.render(reactH1);

// this is children example
// const reactH2 = React.createElement("h2", {class:"h2tag"}, "hello bro world ", React.createElement("strong", null, "boldok"), " this is outer text ok");
// reactRoot.render(reactH2);