import SayHello from "./SayHello";

const App = () => {
  let persons = [
    { fName: "Sushil", lName: "Bishowkarma", id:202 },
    { fName: "Sudesh", lName: "Mateh", id:101 },
    { fName: "Sugam", lName: "Mateh", id:303 },
  ];

  return (
    <div>
      <h1 className="hello">Hello World</h1>
      {persons.map((person) => (
        <SayHello fName={person.fName} lName={person.lName} key={person.id} />
      ))}
      {/* <h1 className="hello">Hello World</h1>
      <SayHello name="Sushil"/>
      <SayHello name="Sudesh"/>
      <SayHello name="Sugam"/> */}
    </div>
  );
};
export default App;
