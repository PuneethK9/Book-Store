import React, { useEffect, useState } from "react";
import Header from "../components/header"
import Footer from "../components/footer"
import "../assets/Favspage.css"
import Favs from "../components/favs";
import { useNavigate } from "react-router-dom";
import axios from "axios";


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