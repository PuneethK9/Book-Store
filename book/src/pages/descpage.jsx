import React, { useEffect, useState } from "react";
import "../assets/descpage.css"
import Header from "../components/header";
import Desc from "../components/desc";
import Footer from "../components/footer";
import Similar from "../components/similar"
import { useParams } from "react-router-dom";
import axios from "axios";


export default function Descpage(){

    const { id } = useParams();
    const [ book,setbook] = useState(null);
    const [oth,setoth] = useState(null);
    const [notify,setnotify] = useState(false);

    useEffect(function(){

        axios.get(`http://localhost:4000/desc/${id}`)
            .then(res=>{
                //console.log(res.data);
                setbook(res.data.Book);
                setoth(res.data.others);
            })
            .catch(err=>{
                console.log(err);
            })
    },[id]);

    function nicedata(data)
    {
        setnotify(data);
    }

    return (
        <div className="h-100 w-100">
            <div id="header">
                <Header data={notify} />
            </div>

            <div id="cons">

                <div id="nice1">
                    <Desc data={book} notdata={nicedata}  />
                </div>

                <div id="nice2">
                    <Similar data={oth} />
                </div>
            </div>

            <div id="footer">
                <Footer />
            </div>
        </div>
    )
}