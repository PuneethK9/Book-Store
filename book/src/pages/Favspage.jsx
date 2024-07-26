import React, { useEffect, useState } from "react";
import Header from "../components/header"
import Footer from "../components/footer"
import "../assets/Favspage.css"
import Favs from "../components/favs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../components/Error";


export default function Favspage({updata,cartdata,maincartdata})
{   
    const [imp,setimp] = useState(false);
    const [cartst,setcartst] = useState(false);

    useEffect(()=>{
        updata(imp);
    },[imp])

    useEffect(()=>{
        setcartst(cartdata);
    },[cartdata]);

    function nicedata(data)
    {
        setimp(data);
    } 

    function cartupdata(data)
    {
        setcartst(data);
        maincartdata(data);
    }

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
                <Header negdata={nicedata} cartdata={cartst} cartupdata={cartupdata}/>
            </div>

            <div id="confavs">

                <Favs cartdata={cartupdata}/>

            </div>

            <div id="footer">
                <Footer />
            </div>

        </div>

    )
}