import React, { useState } from "react";
import "../assets/Confirmation.css"

export default function Confirmation({data,updata})
{

    
    return (

        <div id="confirmwin" className="h-100 w-100 d-flex justify-content-center align-items-center">

            <div id="warning">

                <div id="warnsym">
                    <span id="warnicon" className="material-symbols-outlined text-warning">error</span>
                </div>

                <div style={{marginBottom:10}} id="warncontent">

                    <div style={{marginBottom:5}}><h4><b>Are you Sure?</b></h4></div>
                    <div>{data}</div>

                </div>

                <div id="warnbtns">

                    <button onClick={()=>{updata(true)}} style={{marginRight:55}} type="button" className="btn btn-info text-white">Confirm</button>
                    <button onClick={()=>{updata(false)}} type="button" className="btn btn-danger">Cancel</button>

                </div>

            </div>


        </div>
    )
}