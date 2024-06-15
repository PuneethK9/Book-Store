import React from "react";
import "../assets/Reviewfrom.css"

export default function Reviewform({updata})
{


    return (
        <div className="h-100 w-100" id="revformpos">

            <div id="revformcon">

                <div id="revform">

                    <div id="heading">
                        <h4><b>Harry Potter and The Philospher's Stone</b></h4>
                    </div>

                    <div id="revstar">
                        10/10
                    </div>

                    <div id="revformdata">
                        <textarea id="revmaindata" placeholder="Your Opinion..">

                        </textarea>
                    </div>

                    <div id="revformbtn">
                        <button id="revsbt" type="button">Submit</button>
                        <button id="revcnl" onClick={()=>{updata(false)}} type="button">Cancel</button>
                    </div>

                </div>

            </div>

        </div>
    )
}