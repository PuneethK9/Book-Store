import React, { useEffect, useState } from "react";
import Star  from "./star"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Userreviews()
{
    const [ref,setref] = useState(false);
    const [data,setdata] = useState([]);
    const [del,setdel] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{

        axios.get("http://localhost:4000/Urev",{
            headers:{
                'token':localStorage.getItem('token')
            }
        })
        .then((res)=>{
            console.log(res);

            if(res.data.status==909)
            {
                localStorage.clear();
                return navigate("/ULogin");
            }
            if(res.data.status==501 || res.data.status==502)
            return;
            setdata(res.data.Data);
        })
        .catch((err)=>{
            console.log("Error Getting User Reviews");
            console.log(err);
        })

    },[ref]);

    useEffect(()=>{

        if(del)
        {
            console.log(del);

            axios.delete("http://localhost:4000/Urev",{
                headers:{
                    'token':localStorage.getItem('token')
                },
                data:{
                    del
                }
            })
            .then((res)=>{
                console.log(res);

                if(res.data.status==909)
                {
                    localStorage.clear();
                    return navigate("/ULogin")
                }
                setref(!ref);
                setdel(null);
            })
            .catch((err)=>{
                console.log("Error deleting Reviews");
                console.log(err);
            })
        }

    },[del]);

    return (

        <div className="w-100 h-100">

            <div id="productscon">

                <div id="search" className="d-flex">
                    <input id="sh" ></input>
                    <span id="mag" className="material-symbols-outlined">search</span>
                </div>

                <div id="userrevuser">

                    {
                        data.map((item,i)=>{

                            return (

                                <div id="cartitems" key={item._id}>

                                    <div id="lftside">

                                        
                                        <div id="cartpho">
                                            <img id="cartimg" src={item.news.Image}></img>
                                        </div>
                                        

                                    </div>

                                    <div id="rytside">

                                        <div id="rytcon">

                                            <div id="carttitle">

                                                <div><b>{item.news.Title}</b></div>

                                            </div>

                                            <div style={{width:90}}>
                                                <Star paras={item.Rating} />
                                            </div>

                                            <div> 
                                                <p>{item.Description}</p>
                                            </div>

                                            <div> 
                                                <div id="iconcon">
                                                    <button onClick={()=>{setdel(item)}} type="button" className="btn btn-danger">Delete</button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            )

                        })
                    }

                </div>

            </div>

    </div>
    )
}