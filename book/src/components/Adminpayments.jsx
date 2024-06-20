import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Adminpayments()
{
    const [data,setdata] = useState([]);

    useEffect(()=>{

        axios.get("http://localhost:4000/payment")
            .then((res)=>{
                console.log(res);
                setdata(res.data.Data);
            })
            .catch((err)=>{
                console.log("Error Fetching Payments");
                console.log(err);
            })

    },[]);

    return (

        <div className="w-100 h-100">

        <div id="productscon">

            <div id="search" className="d-flex">
                <input id="sh" ></input>
                <span id="mag" className="material-symbols-outlined">search</span>
            </div>

            <table id="protable">

                <thead>
                    <tr>
                        <th id="proid">Payment ID</th>
                        <th id="proname">Order ID</th>
                        <th>User ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th id="proop">Status</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        data.map((item,i)=>{

                            return (

                                <tr key={item.news._id}>
                                    <td id="proid">{item.news._id}</td>
                                    <td id="proname">{item._id}</td>
                                    <td>{item.Userid}</td>
                                    <td>&#8377;{item.Amount}</td>
                                    <td>{item.Date}</td>
                                    <td>
                                        {
                                    
                                            (item.Status) ?
                                            <button type="button"  className="btn btn-success w-50">Recieved</button>
                                            :
                                            <button type="button"  className="btn btn-danger w-50">Pending</button>

                                        }
                                    </td>
                                </tr>

                            )

                        })
                    }
                    
                </tbody>

            </table>

        </div>

    </div>
    )
}