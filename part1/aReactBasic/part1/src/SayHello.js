import React from "react";
const SayHello =(props)=>{
return React.createElement("p", {class:"myP"}, `Hello ${props.name}`);
}

export default SayHello;