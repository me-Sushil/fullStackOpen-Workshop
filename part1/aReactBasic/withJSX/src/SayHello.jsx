const SayHello =(props)=>{
 
    //we dont need thid in jsx
    //React.createElement("p", {class:"myP"}, `Hello ${props.name}`);
   return <p>Hellow {props.name}</p>
}

export default SayHello;