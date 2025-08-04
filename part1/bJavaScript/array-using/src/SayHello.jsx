// const SayHello = ({person}) => {
//   //we dont need this in jsx
//   //React.createElement("p", {class:"myP"}, `Hello ${props.name}`);

//   function getFullName(){
//     return `${person.fName} ${person.lName}`;
//   }
//   return(
//   <p>Hello {getFullName()}</p>
//   )
// };

// export default SayHello;




const SayHello=({person})=>{

  function getName() {
   return `${person.fname} ${person.lname}`;
  }
 return(
   <p>Hello {getName()}</p>
 ) 
}
export default SayHello;