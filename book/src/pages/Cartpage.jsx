import React, { useEffect, useState } from "react";
import "../assets/cartpage.css"
import Header from  "../components/header"
import Footer from "../components/footer"
import Cart from "../components/Cart"


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