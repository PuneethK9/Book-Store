import React from "react";
import Adminheader from "../components/Adminheader";
import Allproducts from "../components/Allproducts";

export default function Adminhomepage()
{
    return (

        <div className="h-100 w-100">

            <div id="header">
                <Adminheader />
            </div>

            <div>
                <Allproducts />
            </div>

        </div>
    )
}