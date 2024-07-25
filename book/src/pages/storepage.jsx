import React, { useEffect, useState } from "react";
import "../assets/storepage.css"
import Header from "../components/header.jsx"
import Store from "../components/store.jsx"
import Filters from "../components/filters.jsx"
import Footer from "../components/footer.jsx"


export default function Storepage({data,updata,cartdata,maincartdata}){

    const [qy,setqy] = useState({});
    const [newdata,setnewdata] = useState(false);
    const [cartst,setcartst] = useState(false);

    useEffect(()=>{
        setnewdata(data);
    },[data])

    useEffect(()=>{
        setcartst(cartdata);
    },[cartdata]);

    function Audata(data){

        if(data.length>0)
        setqy({...qy,Author:data});
        else
        {
            const {Author,...rest} = qy;
            setqy({...rest});
        }
    }

    function Gdata(data){

        if(data.length>0)
        setqy({...qy,Genre:data});
        else
        {
            const {Genre,...rest} = qy;
            setqy({...rest});
        }
    }

    function Pdata(data){

        if(data.length>0)
        setqy({...qy,Publisher:data});
        else
        {
            const {Publisher,...rest} = qy;
            setqy({...rest});
        }
    }

    function hdata(data){

        if(data.length>0)
        setqy({...qy,Price:data});
        else
        {
            const {Price,...rest} = qy;
            setqy({...rest});
        }
    }

    function nicedata(data)
    {
        updata(data);
    }

    function cartupdata(data)
    {
        setcartst(data);
        maincartdata(data);
    }

    return (

        <div>

            <div className="h-100 w-100">

                <div id="header">
                    <Header data={newdata} negdata={nicedata} cartdata={cartst} cartupdata={cartupdata}/>
                </div>

                <div id="mai">

                    <div id="fillcol">
                        <Filters pridata={hdata} Pubdata={Pdata} Authordata={Audata} Genredata={Gdata} />
                    </div>


                    <div id="books">
                        <Store qydata={qy} />
                    </div>

                </div>

                <div id="footer">
                    <Footer/>
                </div>
                
            </div>

        </div>
    )

}