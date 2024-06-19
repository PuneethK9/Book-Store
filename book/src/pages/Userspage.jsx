import React from "react";
import Users from "../components/Users";
import Adminheader from "../components/Adminheader";

export default function Userspage(){

    return (

        <div className="h-100 w-100">

            <div id="header">
                <Adminheader />
            </div>

            <div>
                <Users />
            </div>

        </div>
    )
}