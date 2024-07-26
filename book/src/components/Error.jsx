import React, { useEffect } from "react";
import "../assets/Error.css"


export default function Error({nbr,data}){

    return (

        <div className="h-100 w-100">

            <div id="Errorcon" >

                <div id="Errordata">

                    <div style={{fontSize:"15rem",color:"lightgray"}}> {nbr} </div>

                    <div style={{fontSize:"2rem", color:"lightgray"}}>
                        {data}
                    </div>

                </div>
                
            </div>

        </div>
    )
}