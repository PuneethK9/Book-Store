import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Quantity({data,refdata})
{
    const [qty,setqty] = useState(data.count);
    const [ref,setref] = useState(false);
    const navigate = useNavigate();
    const {name,value} = qty;

    useEffect(()=>{
        refdata(true);
    },[qty])

    //console.log("no");

    const com = [];

    for(let i=0;i<data.news.Stock;i++)
    {
        com.push(<option key={i+1}>{i+1}</option>)
    }

    function handleclick(eve)
    {
        const {name,value} = eve.target;
        setqty(value);
    }

    useEffect(()=>{

        axios.put("http://localhost:4000/cart",{Quantity : qty,Book:data},{
            headers:{
                'token':localStorage.getItem('token')
            }
        })
        .then((res)=>{
            //console.log(res);

            if(res.data.status==909)
            {
                localStorage.clear();
                return navigate("/ULogin");
            }
            setref(true);
            //console.log("now");
        })
        .catch((err)=>{
            console.log("Error Changing Cart");
            console.log(err);
        })

    },[qty])

    return (
        <select onChange={handleclick}  name="qty" value={qty} style={{width:40,outline:"none"}}>
            {com}
        </select>
    )
}