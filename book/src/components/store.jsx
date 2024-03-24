import React, { useState } from "react";
import "../assets/store.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect} from "react";
import axios from "axios";


export default function Store(){

    const [data,setdata] = useState([]);

    useEffect(function(){

        axios.get('http://localhost:4000/store')
            .then(res=>{

                console.log(res.data);

                setdata(res.data)
            })
            .catch(err=>{
                console.log(err);
            })
    },[])

    console.log(data);

    return (
        <div className="h-100 w-100" id="con">
            <div id="search" className="d-flex">
                <input id="sh"></input>
                <span id="mag" className="material-symbols-outlined">search</span>
            </div>
            <div id="items">

                {
                    data.map((item,i)=>{

                        return (
                            <div id="card" key={i}>
                                <div id="phos">
                                    <img src={item.Image}></img>
                                </div>
                                <div id="exs">
                                    <div id="data"><b id="so">{item.Title}</b></div>
                                    <div id="data"><p id="txt">{item.Genre}</p></div>
                                    <div id="data"><b id="col">&#8377;{item.Price}</b></div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
