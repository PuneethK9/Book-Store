import React, { useEffect, useState } from "react";
import "../assets/favs.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Favs()
{
    const [data,setdata] = useState([]);
    const [pro,setpro] = useState(null);
    const [now,setnow] = useState(true);

    const navigate = useNavigate();

    if(now)
    {
        if(!(localStorage.getItem('token')))
        return navigate("/ULogin");
            
        axios.get("http://localhost:4000/Favs",{
            headers:{
                'token':localStorage.getItem('token')
            }
        })
        .then(res=>{
            console.log(res);

            if(res.data.status==909)
            {
                localStorage.clear();
                return navigate("/ULogin");
            }
            setdata(res.data.data);
        })
        .catch(err=>{
            console.log("Error Getting Favourites List");
            console.log(err);
        })
        setnow(false);
    }
    
    useEffect(function(){

        if(!(localStorage.getItem('token')))
        return navigate("/ULogin");
    
            axios.delete("http://localhost:4000/Favs",{
                headers:{
                    'token':localStorage.getItem('token')
                },
                data:{
                    pro
                }
            })
            .then(res=>{
                console.log(res);
    
                if(res.data.status==909)
                {
                    localStorage.clear();
                    return navigate("/ULogin");
                }
                setnow(true);
            })
            .catch(err=>{
                console.log("Error Deleting a Favourite");
                console.log(err);
            })

    },[pro]);

    return (
        <div id="favscon">

            <div id="favsmain">

                {
                    data.map((item,i)=>{

                        return (

                        <div id="favsitems" key={item._id}>

                            <div onClick={()=>{setpro(item._id)}} id="favsclose">
                                <span name={item._id} id="closebtn" className="material-symbols-outlined">close</span>
                            </div>

                            <Link to={`/desc/${item._id}`}>

                                <div id="favsimg" className="w-100">

                                    <div id="favspho">
                                        <img id="favsphoto"  src={item.Image} alt="Image Here"></img>
                                    </div>

                                </div>

                            </Link>

                            <div id="favsdata">

                                <div id="favstitle">
                                    <b><h4 id="favsft">{item.Title}</h4></b>
                                </div>

                                <div id="favsgen" className="d-flex w-100">

                                {
                                    item.Genre.map((p,q)=>{

                                        return (
                                                <div>
                                                    <label id="genbtn" key={q}>{p}</label>
                                                </div>
                                        )
                                    })
                                }
                                    
                                </div>

                                <div id="favsdes">

                                    <p id="favsdeslen">{item.Description}</p>

                                </div>

                                <div id="favsauth">
                                    <b id="favssz">{item.Author}</b>
                                </div>

                                <div id="favsbtns">
                                        <button id="cart" type="button"><b>Add to Cart</b></button>
                                        <label><b>&#8377;{item.Price}</b></label>
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