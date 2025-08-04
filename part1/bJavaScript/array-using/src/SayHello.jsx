const SayHello = (props) => {
  //we dont need thid in jsx
  //React.createElement("p", {class:"myP"}, `Hello ${props.name}`);
  return(
  <p>Hello {props.fName} {props.lName}</p>
  )
};

export default SayHello;
