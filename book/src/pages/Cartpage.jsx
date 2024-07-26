import React, { useEffect, useState } from "react";
import "../assets/cartpage.css"
import Header from  "../components/header"
import Footer from "../components/footer"
import Cart from "../components/Cart"
import axios from "axios";
import Error from "../components/Error";


export default function Cartpage({data,nicedata}){

    const [svst,setsvst] = useState(false);

    useEffect(()=>{
        setsvst(data);
    },[data]);

    function updata(data)
    {
        nicedata(data);
        setsvst(data);
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

        <div className="w-100 h-100">

            <div id="header">
                <Header data={svst} negdata={updata}/>
            </div>

            <div id="cartpage">
                <Cart updata={updata} />
            </div>

            <div id="footer">
                <Footer />
            </div>

        </div>

    )
}