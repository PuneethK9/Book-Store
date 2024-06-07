import React, { useState } from "react";
import "../assets/store.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect} from "react";
import axios from "axios";
import  { Link } from "react-router-dom";


export default function Store({qydata}){

    const [data,setdata] = useState([]);
    const [input,setinput] = useState("");
    const [nice,setnice] = useState(null);

    function hvr(i){
        setnice(i);
    }

    function nohvr(){
        setnice(null);
    }

    useEffect(function(){
        axios.post('http://localhost:4000/store', qydata)
            .then(res=>{
                setdata(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
    },[qydata]);

    function search(e){

        const value = e.target.value;
        const val = document.querySelectorAll("#card");

        val.forEach(function(item){
            const mat = item.children.exs.children[0].children[0].textContent;

            if( mat.toLowerCase().includes(value.toLowerCase()) || value=='')
            item.style.display = "block";
            else
            item.style.display = "none";
        })

        setinput(e.target.value);
    }


    return (
        <div className="h-100 w-100" id="con">
            <div id="search" className="d-flex">
                <input id="sh" onChange={search} ></input>
                <span id="mag" className="material-symbols-outlined">search</span>
            </div>
            <div id="items">

                
                {
                    
                    data.map((item,i)=>{

                        return (
                            <div id="card" onMouseEnter={()=>hvr(i)} onMouseLeave={hvr} key={i}>
                                <div id="phos">
                                   <Link to={`/desc/${item._id}`}><img src={item.Image}></img></Link>
                                </div>
                                <div id="exs">
                                    <div id="data"><b id="so">{item.Title}</b></div>

                                    <div id="data" style={{display:(nice !== i)?"flex":"none"}}>

                                        {
                                            item.Genre.map(function(j,i){
                                                return (
                                                    (i+1===item.Genre.length) ? <p id="txt" key={i}>{j}</p> : <p id="txt" key={i}>{j},</p>
                                                )
                                            })
                                        }

                                    </div>

                                    <div id="pricecon" style={{display:(nice === i)?"block":"none"}}>
                                        <button id="price">
                                            <span style={{marginRight:10}} className="material-symbols-outlined">shopping_cart</span>
                                            <b>&#8377;{item.Price}</b>
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        )
                    })
                    
                }

            </div>
        </div>
    )
}
