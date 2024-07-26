import React, { useEffect, useState } from "react";
import "../assets/desc.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Desc({data,notdata,updata}){

    const [Auth,setAuth] = useState(localStorage.getItem('token'));
    const [not,setnot] = useState(false);
    const [qty,setqty] = useState(1);
    const opt = [];

    for(let i=0;i<((data)?data.Stock:0);i++)
    {
        opt.push(<option key={i+1}>{i+1}</option>)
    }

    const navigate = useNavigate();

    useEffect(()=>{
        notdata(not);
    },[not])

    function handleclick(eve)
    {
        if(!Auth)
        return navigate("/ULogin");

        axios.post("http://localhost:4000/favs",data,{
            headers:{
                'token':Auth
            }
        })
        .then(res=>{
            console.log(res);
            if(res.data.status==909)
            {
                localStorage.clear();
                return navigate("/ULogin");
            }
            if(res.data.status==501 || res.data.status==502)
                return;
        })
        .catch(err=>{
            console.log("Error sending Favourite requests");
        })
        setnot(true);        
    }

    function cartclick(eve)
    {
        const {name,value} = eve.target;
        const Bookid = value;

        axios.post("http://localhost:4000/cart",{Quantity : qty,Book:data},{
            headers:{
                'token':localStorage.getItem('token')
            }
        })
        .then((res=>{
            console.log(res);

            if(res.data.status==909)
            {
                localStorage.clear();
                return navigate("/ULogin");
            }
            if(res.data.status==501 || res.data.status==502)
                return;
        }))
        .catch((err=>{
            console.log("Error Adding to Cart");
            console.log(err);
        }))
        updata(true);
    }

    function chgclick(eve)
    {
        const {name,value} = eve.target;
        setqty(value);
    }

    return (

        <div className="h-100 w-100">
            <div id="more">
                <div id="less">

                    <div id="potos">
                        <img id="ano" src={
                                    (data) ? data.Image : "Loading"
                                }></img>
                    </div>

                    <div id="tails">

                        <h1 id="unique">
                            <b>
                                {
                                    (data) ? data.Title : "Loading"
                                }
                            
                            </b>
                        </h1>

                        <div id="lab">

                                {
                                    (data) ? 
                                    data.Genre.map(function(item,i){
                                        return (
                                            <label id="lbs" key={i}>{item}</label>
                                        )
                                    })
                                    : 
                                    "Loading"
                                }
                        </div>

                        <div id="des">
                            <p id="phidden">
                                {
                                    (data) ? data.Description : "Loading"
                                }
                            </p>
                        </div>

                        <div id="auth">
                            <h6><b>
                                {
                                    (data) ? data.Author : "Loading"
                                }
                                </b></h6>
                        </div>

                        <div id="pri">

                            <div id="descstore">

                                <div id="descopt">

                                    {
                                        (opt.length===0) ? <p style={{color:"red"}}>Not Available</p>
                                        :
                                        <select id="descsel" name="qty" onClick={chgclick}>

                                            {opt}

                                        </select>
                                    }

                                </div>

                                <button onClick={cartclick} name="item" value={(data)?data._id:null} id="pay">
                                    <span style={{marginRight:10}} className="material-symbols-outlined">shopping_cart</span>
                                    <b>Add to Cart</b>
                                </button>

                                <button onClick={handleclick} id="favsbtn" type="button">
                                    <span id="descfavs" className="material-symbols-outlined">favorite</span>
                                </button>

                            </div>
                            <h4 id="cst"><b>&#8377;{
                                    (data) ? (data.Price-data.Discount) : "Loading"
                                }</b></h4>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}