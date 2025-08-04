import SayHello from "./SayHello";

const App = () => {
  let persons = [
    { fName: "Sushil", lName: "Bishowkarma", id: 202 },
    { fName: "Sudesh", lName: "Mateh", id: 101 },
    { fName: "Sugam", lName: "Mateh", id: 303 },
  ];

  return (
    <div>
      <h1 className="hello">Hello World</h1>
      {/*conditions ? true : false*/}
      {persons.length > 0 ? (
        persons.filter(person => person.id > 200).map((person) => <SayHello person={person} key={person.id} />)
      ) : (
        <p>There is no item</p>
      )}

      {/* <h1 className="hello">Hello World</h1>
      <SayHello name="Sushil"/>
      <SayHello name="Sudesh"/>
      <SayHello name="Sugam"/> */}
    </div>
  );
};
export default App;
