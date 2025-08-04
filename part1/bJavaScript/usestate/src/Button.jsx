const Button =({onClick})=>{
    return(
        <>
        <button onClick={onClick}>{onClick.text}</button>
        </>
    )
}
export default Button;