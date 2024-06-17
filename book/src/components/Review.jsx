import React, { useEffect, useState } from "react";
import "../assets/review.css"
import Star from "./star"
import axios from "axios";

export default function Review({data,formData,revst}){

    const [formst,setformst]=useState(false);
    const [revformst,setrevformst]=useState(revst);
    const [revdata,setrevdata] = useState([]);

    useEffect(()=>{
        formData(formst);
    },[formst]);

    useEffect(()=>{
        setrevformst(revst);
        setformst(revst);
    },[revst]);

    useEffect(()=>{

        if(data)
        {
            axios.get("http://localhost:4000/rev",{
                params:{
                    Data:data
                }
            })
            .then((res)=>{
                console.log(res);
                setrevdata(res.data.data);
            })
            .catch((err)=>{
                console.log("Error getting reviews");
                console.log(err);
            })
        }

    },[data,revformst]);

    return (

        <div className="w-100 h-100">

            <div id="revcon">

                <div id="revdata" className="w-100 h-100">

                    <div id="revhead">
                        <h2><b>Reviews</b></h2>
                        <button onClick={()=>{setformst(true)}} id="revbtn" type="button"><b>Add Review</b></button>
                    </div>

                    <div id="revrate">

                        {
                            
                            revdata.map((item,i)=>{

                                return (

                                    <div id="revitem" key={item._id}>

                                        <div id="revuser">
                                            <div id="revusername">
                                                <span id="revicon" className="material-symbols-outlined">account_circle</span>
                                                <h5 id="revname">{item.Username}</h5>
                                            </div>
                                            <div id="revrating">
                                                <Star goodst={revformst} data={1.5} paras={item.Rating} />
                                            </div>
                                        </div>

                                        <div id="userop">
                                            <p>{item.Description}</p>
                                        </div>

                                    </div>

                                )
                            })

                        }

                    </div>

                </div>

            </div>
        </div>

    )
}