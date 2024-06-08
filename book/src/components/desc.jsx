import React, { useEffect, useState } from "react";
import "../assets/desc.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Desc({data,notdata}){

    const [Auth,setAuth] = useState(localStorage.getItem('token'));
    const [not,setnot] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        notdata(not);
    },[not])

    function handleclick(eve)
    {
        if(!Auth)
        return navigate("/ULogin");

        axios.post("http://localhost:4000/favs",data,{
            headers:{
                'token':Auth
            }
        })
        .then(res=>{
            console.log(res);
            if(res.data.status==909)
            {
                localStorage.clear();
                return navigate("/ULogin");
            }
        })
        .catch(err=>{
            console.log("Error sending Favourite requests");
        })
        setnot(true);        
    }

    return (

        <div className="h-100 w-100">
            <div id="more">
                <div id="less">

                    <div id="potos">
                        <img id="ano" src={
                                    (data) ? data.Image : "Loading"
                                }></img>
                    </div>

                    <div id="tails">

                        <h1 id="unique">
                            <b>
                                {
                                    (data) ? data.Title : "Loading"
                                }
                            
                            </b>
                        </h1>

                        <div id="lab">

                                {
                                    (data) ? 
                                    data.Genre.map(function(item,i){
                                        return (
                                            <label id="lbs" key={i}>{item}</label>
                                        )
                                    })
                                    : 
                                    "Loading"
                                }
                        </div>

                        <div id="des">
                            <p>
                                {
                                    (data) ? data.Description : "Loading"
                                }
                            </p>
                        </div>

                        <div id="auth">
                            <h6><b>
                                {
                                    (data) ? data.Author : "Loading"
                                }
                                </b></h6>
                        </div>

                        <div id="pri">

                            <div id="descstore">

                                <button id="pay">
                                    <span style={{marginRight:10}} className="material-symbols-outlined">shopping_cart</span>
                                    <b>Add to Cart</b>
                                </button>

                                <button onClick={handleclick} id="favsbtn" type="button">
                                    <span id="descfavs" className="material-symbols-outlined">favorite</span>
                                </button>

                            </div>
                            <h4 id="cst"><b>&#8377;{
                                    (data) ? data.Price : "Loading"
                                }</b></h4>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}