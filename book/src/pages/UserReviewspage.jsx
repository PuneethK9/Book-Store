import React from "react";
import Userreviews from "../components/Userreviews";
import Userside from "../components/Userside";
import Header from "../components/header";

export default function UserReviewpage()
{
    return (

        <div className="h-100 w-100">

            <div id="header">
                <Header />
            </div>

            <div style={{display:"flex"}} className="h-100 w-100">

                <div style={{width:"25%"}}>
                    <Userside />
                </div>

                <div style={{width:"75%"}}>
                    <Userreviews />
                </div>

            </div>

        </div> 

    )
}