import React, { useState } from "react";
import "../assets/Payments.css"
import Confirmation from "./Confirmation"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Payments({data,senddata})
{
    const [em,setem] = useState("");
    const [confirm,setconfirm] = useState(false);
    const navigate = useNavigate();

    function handleemail(e)
    {
        const {name,value} = e.target;
        setem(value);
    }

    function gooddata(finaldata)
    {
        if(finaldata)
        {
            axios.post("http://localhost:4000/order",{Data:data,Email:em},{
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
                senddata(false);
            })
            .catch((err)=>{
                console.log("Error Making an Order");
                console.log(err);
            })

        }
        setconfirm(false);
    }

    return (

        <div id="paypos" className="h-100 w-100">

            <div id="payoutcon">

                <div id="paycon">

                    <div id="dfc">
                        <h3><b>Payment</b></h3>
                        <button style={{height:40}} onClick={()=>{senddata(false)}} type="button" className="btn btn-white"><span className="material-symbols-outlined">close</span></button>
                    </div>

                    <div>
                        <label id="paylabel">Email address</label><br></br>
                        <input id="payint" name="Email" onChange={handleemail}  type="email" placeholder="example@gmail.com"></input>
                    </div>

                    <div>
                        <label id="paylabel">Credit Card Number</label><br></br>
                        <input id="payint" type="email" placeholder="x x x x    x x x x    x x x x    x x x x"></input>
                    </div>

                    <div className="w-100 d-flex" style={{justifyContent:"space-between"}}>
                        <div id="paycv">
                            <label id="paylabel">Expiry Date</label><br></br>
                            <input id="payint" type="email" placeholder="mm / yy"></input>
                        </div>
                        <div id="paycv">
                            <label id="paylabel">CVV</label><br></br>
                            <input id="payint" type="email" placeholder="x x x"></input>
                        </div>
                    </div>

                    <div id="dfc">
                        <label id="paylabel">Subamount</label>
                        <b>&#8377;{data.total-data.disct}</b>
                    </div>

                    <div id="dfc" className="nice">
                        <label id="paylabel">Platform Fee</label>
                        <b>&#8377;0</b>
                    </div>

                    <div id="dfc">
                        <label id="paylabel">Total Amount</label>
                        <b>&#8377;{data.total-data.disct}</b>
                    </div>

                    <div className="w-100">
                        <button onClick={()=>{setconfirm(true)}} style={{height:45}} type="button" className="btn btn-primary w-100">Make Payment</button>
                    </div>

                </div>

            </div>

            {
                (confirm) ? <Confirmation data={"Confirm Payment"} updata={gooddata} /> :""
            }

        </div>
    )
}