import React, { useState } from "react";
import "../assets/store.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect} from "react";
import axios from "axios";


export default function Store(){

    const [data,setdata] = useState([]);
    const [input,setinput] = useState("");

    useEffect(function(){

        axios.get('http://localhost:4000/store')
            .then(res=>{
                setdata(res.data)
            })
            .catch(err=>{
                console.log(err);
            })
    },[])


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
                            <div id="card" key={i}>
                                <div id="phos">
                                    <img src={item.Image}></img>
                                </div>
                                <div id="exs">
                                    <div id="data"><b id="so">{item.Title}</b></div>

                                    <div id="data">

                                        {
                                            item.Genre.map(function(j,i){
                                                return (

                                                    (i+1===item.Genre.length) ? <p id="txt" key={i}>{j}</p> : <p id="txt" key={i}>{j},</p>
                                
                                                )
                                            })
                                        }

                                    </div>

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