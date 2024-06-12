import "../style/Button.css"

function Button({type, background, color, label, img, onClick, id, border, icon, className, disabled}){
    return <>
         <button id = {id} type = {type} onClick = {onClick} className={`btn md:max-w-md rounded-full ${className} ${disabled ? "hidden-important":""}`} style={{background: background, color: color, border: border}}>{img ? <img src = {img}></img> : null}{icon}{label}</button>
    </>
}

export default Button;