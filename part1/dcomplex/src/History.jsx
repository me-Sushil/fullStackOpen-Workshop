const History = (props) => {
//   return (
//     <>
//       {props.allClicks.length === 0
//         ? `the app is used by pressing the buttons`
//         : `button press history: ${props.allClicks.join(" ")}`}
//     </>
//   );

      if (props.allClicks.length === 0) {
      return (
        <div>
          the app is used by pressing the buttons
        </div>
      )
    }
    return (
      <div>
        button press history: {props.allClicks.join(' ')}
      </div>
    )
};
export default History;
