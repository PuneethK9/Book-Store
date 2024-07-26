import React, { useEffect, useState } from "react";
import "../assets/Orders.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Orders()
{
    const [st,setst] = useState(null);
    const navigate = useNavigate();
    const [data,setdata] = useState([]);
    const [status,setstatus] = useState(null);
    const [ref,setref] = useState(false);

    useEffect(()=>{

        axios.get("http://localhost:4000/orders",{
            headers:{
                'token':localStorage.getItem('token')
            }
        })
        .then((res)=>{
            console.log(res);

            if(res.data.status==909)
            {
                localStorage.clear();
                return navigate("/ULogin")
            }
            if(res.data.status==501 || res.data.status==502)
                return;
            setdata(res.data.Data);
        })
        .catch((err)=>{
            console.log("Error Fetching Order data");
            console.log(err);
        })

    },[ref]);

    useEffect(()=>{

        if(status)
        {
            axios.put("http://localhost:4000/status",{status},{
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
                setstatus(null);
                setref(!ref);
            })
            .catch((err)=>{
                console.log("Error Updating the Status");
                console.log(err);
            })
        }

    },[status]);

    return (

        <div className="w-100 h-100">

        <div id="productscon">

            <div id="search" className="d-flex">
                <input id="sh"></input>
                <span id="mag" className="material-symbols-outlined">search</span>
            </div>

            <div id="orderscon">

                {
                    data.map((item,i)=>{

                        return (

                            <div id="orderdiv" key={item._id}>

                                <div id="orderhd" onClick={()=>{ (st)? setst(null):setst(item._id) }}>
                                    <h5><b>Order ID: {item._id}</b></h5>

                                    <div>

                                        {
                                            (item.Status) ?
                                            <span id="sze" className="material-symbols-outlined text-success">check_circle</span>
                                            :
                                            <span id="sze" className="material-symbols-outlined text-danger">schedule</span>
                                        }

                                        <span id="sze"  className="material-symbols-outlined">
                                            {
                                                (st==item._id)?"expand_less":"expand_more"
                                            }
                                        </span>

                                    </div>
                                    
                                </div>

                                <div id="discont" style={{display:(st==item._id)?"block":"none"}}>

                                    {
                                        item.news.map((x,j)=>{

                                            return (

                                                <div id="cartitems" key={x.Book._id}>

                                                    <div id="lftside">

                                                        <div id="cartpho" style={{width:250}}>
                                                            <img id="cartimg" src={x.Book.Image}></img>
                                                        </div>

                                                    </div>

                                                     <div id="rytside">

                                                        <div id="rytcon" style={{paddingLeft:10}}>

                                                            <div id="carttitle">

                                                                <div><b>{x.Book.Title}</b></div>
                                                                <div><b>MRP : &#8377; {x.ct*x.Book.FinalPrice}</b></div>

                                                            </div>

                                                            <div>
                                                                {x.Book.Author}
                                                            </div>

                                                            <div> 
                                                                {x.Book.Publisher}
                                                            </div>

                                                            <div> 
                                                                <label>
                                                                    Quantity : {x.ct}
                                                                </label>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>


                                            )

                                        })
                                    }

                                    <div id="orderlst">
                                        <b>Total</b>
                                        <b>&#8377;{item.Amount}</b>
                                    </div>

                                    <div id="orderlst">
                                        <b>Date</b>
                                        <b>{item.Date}</b>
                                    </div>

                                    {
                                        (!item.Status) ?
                                        <div id="orderlst">
                                            <b>Status</b>
                                            <button type="button" onClick={()=>{setstatus(item)}} className="btn btn-success">Recieved?</button>
                                        </div>
                                        :
                                        ""
                                    }
                                    
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