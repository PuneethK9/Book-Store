import React, { useEffect, useState } from "react";
import "../assets/cart.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Quantity from "./Quantity";

export default function Cart({updata}) 
{
    const navigate = useNavigate();
    const [del,setdel] = useState(null);
    const [fav,setfav] = useState(null);
    const [favstate,setfavstate] = useState(false);
    const [many,setmany] = useState({
        data:[],
        count:0.0,
        total:0.0,
        disct:0.0,
        ref:true
    });

    //console.log("yes");

    if(many.ref)
    {
        console.log("1");

        axios.get("http://localhost:4000/cart",{
            headers:{
                'token':localStorage.getItem('token')
            }
        })
        .then((res=>{

            if(res.data.status==909)
            {
                localStorage.clear();
                return navigate("/ULogin");
            }

            let val=0,tol=0,dis=0;
            for(let i=0;i<res.data.data.length;i++)
            {
                val=val+res.data.data[i].count;
                tol=tol+res.data.data[i].Total;
                dis=dis+res.data.data[i].Discount;
            }
            setmany({data:res.data.data,count:val,total:tol,disct:dis,ref:false});
        }))
        .catch(err=>{
            console.log("Error Getting Cart Items");
            console.log(err);
        })
    }

    function nicedata(data)
    {
        setmany(prev=>({...prev,ref:true}))
    }

    
    useEffect(function(){

        console.log("In request")

        //if(del)
        //{
            axios.delete("http://localhost:4000/cart",{
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
                    return navigate("/ULogin");
                }
                setmany(prev=>({...prev,ref:true}));
            })
            .catch((err)=>{
                console.log("Error Deleting An item");
                console.log(err);
            })
        //}

    },[del]);

    useEffect(()=>{

        if(fav)
        {
            axios.post("http://localhost:4000/favs",fav,{
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
                setmany(prev=>({...prev,ref:true}));
            })
            .catch((err)=>{
                console.log("Error Adding to Fav from Cart");
                console.log(err);
            })
            updata(true);
            setfavstate(true);
        }

    },[fav])

    return (

        <div id="cartlast">

            <div id="cartcon">

                <div id="cartdata">

                        <div id="carthead">
                            <h3><b></b></h3>
                        </div>

                    {
                        many.data.map((item,i)=>{

                            return (

                                <div id="cartitems" key={item._id}>

                                    <div id="lftside">

                                        <Link to={`/desc/${item._id}`}>
                                            <div id="cartpho">
                                                <img id="cartimg" src={item.news.Image}></img>
                                            </div>
                                        </Link>

                                    </div>

                                    <div id="rytside">

                                        <div id="rytcon">

                                            <div id="carttitle">

                                                <div><b>{item.news.Title}</b></div>
                                                <div><b>MRP : &#8377; {(item.Total-item.Discount).toFixed(2)}</b></div>

                                            </div>

                                            <div>
                                                {item.news.Author}
                                            </div>

                                            <div> 
                                                {item.news.Publisher}
                                            </div>

                                            <div> 
                                                <label>

                                                    Quantity :  <Quantity data={item} refdata={nicedata} />

                                                </label>
                                            </div>

                                            <div> 
                                                <div id="iconcon">
                                                    <span onClick={()=>{setfav(item)}} id="carthv" className="material-symbols-outlined">favorite</span>
                                                    <span onClick={()=>{setdel(item)}} name="del" value={item} id="carthv" className="material-symbols-outlined">delete</span>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )
                        })
                    }

                </div>

                <div id="carttol">

                    <div id="cartsum">

                        <div id="carthead" style={{marginLeft:0}}>
                            <h3><b>Summary</b></h3>
                        </div>

                        <div id="cartamt">

                            <div id="cartplace">
                                <div>
                                    {many.count} Items
                                </div>
                                <div>
                                    &#8377; {(many.total-many.disct).toFixed(2)}
                                </div>
                            </div>

                            <div id="cartplace">
                                <div>
                                    Original Price
                                </div>
                                <div>
                                    &#8377; {(many.total).toFixed(2)}
                                </div>
                            </div>

                            <div id="cartplace">
                                <div>
                                    Delivery
                                </div>
                                <div>
                                    Free
                                </div>
                            </div>

                            <div id="cartplace">
                                <div style={{color:"gray"}}>
                                    Discount
                                </div>
                                <div style={{color:"gray"}}>
                                    &#8377; -{(many.disct).toFixed(2)}
                                </div>
                            </div>

                            <div id="cartplace" style={{marginTop:20,marginBottom:20}}>
                                <div>
                                    <b>Total</b>
                                </div>
                                <div>
                                    <b>&#8377; {(many.total-many.disct).toFixed(2)}</b>
                                </div>
                            </div>

                        </div>

                        <div id="cartpay">
                            <button id="cartorder" type="button"><b>Place Order</b></button>
                        </div>

                    </div>

                </div>

            </div>
            
        </div>

    )
}