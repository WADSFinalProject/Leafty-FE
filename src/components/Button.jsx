import "../style/Button.css"

function Button({type, background, color, label, img, onClick, id, border}){
    return <>
         <button id = {id} type = {type} onClick = {onClick} class='btn max-w-md rounded-full' style={{background: background, color: color, border: border}}><img src = {img}></img>{label}</button>
    </>
}

export default Button;