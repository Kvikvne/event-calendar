import React, { useState } from "react";


function Btn() {
    const [number, setNumber] = useState(0);
    
    const clickHandler = () => {
        setNumber(number + 1);

        if (number > 19) {
            setNumber(0)
        }
      };
      
    return (
        <button 
            onClick={clickHandler} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >{number}
        </button>
    )
}

export default Btn