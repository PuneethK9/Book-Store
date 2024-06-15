import React, { useEffect, useState } from "react";
import "../assets/review.css"

export default function Review({formData}){

    const [formst,setformst]=useState(false);


    useEffect(()=>{
        formData(formst);
    },[formst]);

    return (

        <div className="w-100 h-100">

            <div id="revcon">

                <div id="revdata" className="w-100 h-100">

                    <div id="revhead">
                        <h2><b>Reviews</b></h2>
                        <button onClick={()=>{setformst(!formst)}} id="revbtn" type="button"><b>Add Review</b></button>
                    </div>

                    <div id="revrate">

                        <div id="revitem">

                            <div id="revuser">
                                <div id="revusername">
                                    <span id="revicon" className="material-symbols-outlined">account_circle</span>
                                    <h5 id="revname">Goku</h5>
                                </div>
                                <div id="revrating">
                                    10/10
                                </div>
                            </div>

                            <div id="userop">
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate vitae harum aut quisquam sunt molestiae sequi tenetur ea. Natus repellendus et blanditiis magnam officiis fugit expedita odit hic tempore ipsam!</p>
                            </div>

                        </div>

                        <div id="revitem">

                            <div id="revuser">
                                <div id="revusername">
                                    <span id="revicon" className="material-symbols-outlined">account_circle</span>
                                    <h5 id="revname">Goku</h5>
                                </div>
                                <div id="revrating">
                                    10/10
                                </div>
                            </div>

                            <div id="userop">
                                <p id="revuserdata">nice movie</p>
                            </div>

                        </div>


                    </div>

                </div>

            </div>
        </div>

    )
}