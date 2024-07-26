import React, { useEffect, useState } from "react";
import Userreviews from "../components/Userreviews";
import Userside from "../components/Userside";
import Header from "../components/header";
import axios from "axios";
import Error from "../components/Error";

export default function UserReviewpage()
{
    const [err,seterr] = useState({
        status:false,
        nbr:0,
        data:"",
    });

    useEffect(()=>{

        axios.get("http://localhost:4000/store",{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        .then((res)=>{
            console.log(res);

            if(res.data.status==501 || res.data.status==502)
            {
                seterr({status:true,nbr:res.data.status,data:res.data.Auth});
                return;
            }
        })
        .catch((err)=>{
            console.log(err);
        })

    },[]);

    if(err.status)
    return (<Error nbr={err.nbr} data={err.data} />);

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