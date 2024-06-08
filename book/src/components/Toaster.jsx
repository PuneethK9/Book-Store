import React, { useState } from "react";
import "../assets/Toaster.css";

export default function Toaster({data})
{
    const [input,setinput] = useState("Write Something Here");

    return (
            <div id="toastsz">
            </div>
    )
}