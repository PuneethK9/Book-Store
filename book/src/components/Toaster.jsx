import React, { useEffect, useState } from "react";
import "../assets/Toaster.css";

export default function Toaster({data})
{

    const [st,setst] = useState(true);

    useEffect(()=>{

        setTimeout(()=>{
            setst(false);
        },3000);

    },[]);

    return (        
                true ?
                
                (<div id="toaster">

                    <div id="toasterins">
                        <i id="closeicon" className="fa-solid fa-circle-xmark text-danger"></i>
                        <div>
                            {data}
                        </div>
                    </div>

                    <div id="downbar"></div>
                </div>)

                :
                null
    )
}