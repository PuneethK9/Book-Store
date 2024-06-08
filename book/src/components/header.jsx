import React, { useEffect, useState } from "react";
import "../assets/header.css";
import {Link} from "react-router-dom"
import axios from "axios"
import Toaster from "./Toaster";

export default function Header({data}){

    const [Auth,setAuth] = useState("");
    const [tol,settol] = useState(false);

    useEffect(()=>{
        settol(data);
    },[data]);

    useEffect(function(){

        if(localStorage.getItem('token'))
        {
            axios.get("http://localhost:4000/store",{
                headers:{
                    'token':localStorage.getItem('token')
                }
            })
            .then(res=>{

                if(res.data.status==909)
                localStorage.clear();
                else
                setAuth(res.data.User.username);
 
            })
            .catch(err=>{
                console.log("Error Retrieving Data");
            })
        }

    },[]);

    function chgclick(){
        settol(false);
    }

    return (
        <div className="h-100 w-100">
            <div id="con">
                <div id="mans">

                    <div id="logo">
                        <span id="szs" className="material-symbols-outlined">book_4</span>
                        <h2><b>BookHaven</b></h2>
                    </div>

                    <div id="lks">
                        <div id="hv"><label id="link">Home</label></div>
                        <Link style={{textDecoration:"none",color:"black"}} to="/store"><div id="hv"><label id="link">Store</label></div></Link>

                        <Link onClick={chgclick} style={{textDecoration:"none",color:"black"}} to="/Favs">
                            <div id="hv">
                            {
                                (tol)?<div id="toastsz"></div> :""
                            }
                            <label id="link"><span id="icons" className="material-symbols-outlined">favorite</span>
                            </label></div>
                        </Link>

                        <div id="hv"><label id="link"><span id="icons" className="material-symbols-outlined">shopping_cart</span></label></div>
                        <div id="hv">
                            <label id="link">
                                <span id="icons" className="material-symbols-outlined">account_circle</span>
                                <span id="us">
                                    {
                                        (Auth=="")? ("Sign In"):(Auth)
                                    }
                                </span>
                            </label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}