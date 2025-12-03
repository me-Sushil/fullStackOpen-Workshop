import useField from "./hooks/useField";
const FormField = () => {
  const name = useField("text");
  const born = useField("date");
  const height = useField("number");

  return (
    <div>
      <form>
        name:
        {/* <input type={name.type} value={name.value} onChange={name.onChange} /> */}
        <input {...name} />
        <br />
        birthdate:
        {/* <input type={born.type} value={born.value} onChange={born.onChange} /> */}
        <input {...born} />
        <br />
        height:
        {/* <input type={height.type} value={height.value} onChange={height.onChange}/> */}
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  );
};
export default FormField;
