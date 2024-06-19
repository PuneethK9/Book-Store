import React from "react";
import Adminheader from "../components/Adminheader";
import Addbook from "./Addbook";

export default function Adding()
{
    return (

        <div className="h-100 w-100">

            <div id="header">
                <Adminheader />
            </div>

            <div>
                <Addbook />
            </div>

        </div>
    )
}