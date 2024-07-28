import React, { useEffect, useState } from "react";
import Adminheader from "../components/Adminheader";
import Allproducts from "../components/Allproducts";
import axios from "axios";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";

export default function Adminhomepage()
{
    const [err,seterr] = useState({
        status:false,
        nbr:0,
        data:"",
    });

    const navigate = useNavigate();

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
                return navigate("/ALogin");
            }

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
    return <Error nbr={err.nbr} data={err.data} />;

    return (

        <div className="h-100 w-100">

            <div id="header">
                <Adminheader />
            </div>

            <div>
                <Allproducts />
            </div>

        </div>
    )
}