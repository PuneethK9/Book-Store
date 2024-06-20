import React from "react";
import Adminheader from "../components/Adminheader"
import Adminpayments from "../components/Adminpayments"

export default function Paymentspage()
{
    return (

        <div className="h-100 w-100">

            <div id="header">
                <Adminheader />
            </div>

            <div>
                <Adminpayments />
            </div>

        </div>
    )
}