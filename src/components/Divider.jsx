function Divider({label}){
 return (
    <div class="flex items-center"> 
        <hr class="flex-grow border-t border-gray-300" /> 
        <span class="px-3 text-gray-500 font-bold"> 
            {label}
        </span> 
        <hr class="flex-grow border-t border-gray-300" /> 
    </div> 
 )
}

export default Divider;