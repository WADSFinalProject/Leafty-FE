import "../style/Button.css"

function Button({type, noMax = false, background, color, label, img, onClick, id, border, icon, className, disabled}){
    return <>
         <button id = {id} type = {type} onClick = {onClick} className={`btn ${noMax ? "" : "md:max-w-md"} rounded-full ${className} ${disabled ? "hidden-important":""}`} style={{background: background, color: color, border: border}}>{img ? <img src = {img}></img> : null}{icon}{label}</button>
    </>
}

export default Button;