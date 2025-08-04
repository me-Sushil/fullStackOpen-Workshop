import SayHello from "./SayHello";

const App = () => {
  let persons = [
    { fName: "Sushil", lName: "Bishowkarma" },
    { fName: "Sudesh", lName: "Mateh" },
    { fName: "Sugam", lName: "Mateh" },
  ];

  return (
    <div>
      <h1 className="hello">Hello World</h1>
      {persons.map((person) => (
        <SayHello fName={person.fName} lName={person.lName} />
      ))}
      {/* <h1 className="hello">Hello World</h1>
      <SayHello name="Sushil"/>
      <SayHello name="Sudesh"/>
      <SayHello name="Sugam"/> */}
    </div>
  );
};
export default App;
