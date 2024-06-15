import React from "react";
import "../assets/star.css";
import star from "../assets/star.png"

export default function Star()
{



    return (
        <div className="bg-info w-100 h-100">
            <div id="starcon">

                <img id="staricon" src={star}></img>

            </div>
        </div>
    )
}