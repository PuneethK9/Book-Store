import React, { useEffect, useState } from "react";
import "../assets/storepage.css"
import Header from "../components/header.jsx"
import Store from "../components/store.jsx"
import Filters from "../components/filters.jsx"
import Footer from "../components/footer.jsx"


export default function Storepage(){

    const [qy,setqy] = useState({});

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

    return (

        <div>

            <div className="h-100 w-100">

                <div id="header">
                    <Header/>
                </div>

                <div id="mai">

                    <div id="fillcol">
                        <Filters Authordata={Audata} Genredata={Gdata} />
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