import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Adminheader()
{
    const [Auth,setAuth] = useState("");

    useEffect(()=>{

        axios.get("http://localhost:4000/AProfile",{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        .then((res)=>{
            console.log(res);

            if(res.data.status==909)
            {
                localStorage.clear();
            }
            else if(res.data.status==501 || res.data.status==502)
            {

            }
            else
            setAuth(res.data.user.username);

        })
        .catch((err)=>{
            console.log(err);
        })

    },[]);

    return (

        <div className="h-100 w-100">
            <div id="con">
                <div id="mans">

                    <div id="logo">
                        <span id="szs" className="material-symbols-outlined">book_4</span>
                        <h2><b>BookHaven</b></h2>
                    </div>

                    <div id="lks" className="w-50">
                        <Link style={{textDecoration:"none",color:"black"}} to={"/AHome"} ><div id="hv"><label id="link">Home</label></div></Link>
                
                        <Link style={{textDecoration:"none",color:"black"}} to={"/Users"} ><div id="hv"><label id="link">Users</label></div></Link>
                            
                        <Link style={{textDecoration:"none",color:"black"}} to={"/Payments"} >
                        <div id="hv">
                            <label id="link">Payments</label>
                        </div>
                        </Link>

                        <Link style={{textDecoration:"none",color:"black"}} to={"/Add"} ><div id="hv"><label id="link">Add Product</label></div></Link>
                        
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