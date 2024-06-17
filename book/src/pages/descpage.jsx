import React, { useEffect, useState } from "react";
import "../assets/descpage.css"
import Header from "../components/header";
import Desc from "../components/desc";
import Footer from "../components/footer";
import Similar from "../components/similar"
import Review from "../components/Review"
import { useParams } from "react-router-dom";
import axios from "axios";
import Reviewform from "../components/Reviewform";


export default function Descpage({maindata,updata,nowdata}){

    const { id } = useParams();
    const [ book,setbook] = useState(null);
    const [oth,setoth] = useState(null);
    const [cartst,setcartst] = useState(false);
    const [notify,setnotify] = useState(false);
    const [st,setst] = useState(false);

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

    useEffect(()=>{
        setnotify(updata);
    },[updata])

    function nicedata(data)
    {
        setnotify(data);
        maindata(data);
    }

    function cartdata(data)
    {
        setcartst(data);
        nowdata(data);
    }

    function fundata(data)
    {
        setst(data);
    }

    function formstdata(data)
    {
        setst(data);
    }

    return (
        <div className="h-100 w-100">
            
            <div id="header">
                <Header data={notify} negdata={nicedata} cartdata={cartst} cartupdata={cartdata}/>
            </div>

            <div id="nice1">
                <Desc data={book} notdata={nicedata} updata={cartdata}  />
            </div>

            <div id="nice2">
                <Similar data={oth} />
            </div>
            
            <div id="rev">
                <Review data={book} revst={st} formData={fundata} />
            </div>

            {
                (st)?<Reviewform data={book} updata={formstdata} />:""
            }

            <div id="footer">
                <Footer />
            </div>
        </div>
    )
}