import "./Button.css"

function Button({background, color, label, img}){
    return <>
         <button class='btn max-w-md rounded-full' style={{background: background, color: color, border: "2px solid #0F7275"}}><img src = {img}></img>{label}</button>
    </>
}

export default Button;