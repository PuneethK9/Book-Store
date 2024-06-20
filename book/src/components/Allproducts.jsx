import React, { useEffect, useState } from "react";
import "../assets/Allproducts.css"
import axios from "axios";
import Updateform from "./Updateform";
import Viewform from "./Viewform";
import Confirmation from "./Confirmation";

export default function Allproducts(){

    const [books,setbooks] = useState([]);
    const [prost,setprost] = useState(false);
    const [data,setdata] = useState(null);
    const [view,setview] = useState(null);
    const [ref,setref] = useState(true);
    const [del,setdel] = useState(null);

    if(ref)
    {
        axios.post("http://localhost:4000/store",{})
            .then((res)=>{
                console.log(res);
                setbooks(res.data);
            })
            .catch((err)=>{
                console.log("Error Getting Books");
                console.log(err);
            })
        setref(false);

    }

    function chg(e)
    {
        const value = e.target.value;
        const vals  = document.getElementsByTagName("tr");
        
        for(let i=1;i<vals.length;i++)
        {
            const comp = vals[i].children[0].innerHTML;

            if(comp.includes(value) || value=='')
            vals[i].style.display='';
            else
            vals[i].style.display='none';
            
        }
        
    }

    function waitdata(data)
    {
        setref(data);
    }

    function delfun(data)
    {
        if(data)
        {
            axios.delete("http://localhost:4000/book",{
                data :{
                    del
                }
            })
            .then((res)=>{
                console.log(res);
                setref(true);
            })
            .catch((err)=>{
                console.log("Error Deleting Book");
                console.log(err);
            })
        }
        setdel(null);
    }

    return (

        <div className="w-100 h-100">

            <div id="productscon">

                <div id="search" className="d-flex">
                    <input id="sh" onChange={chg} ></input>
                    <span id="mag" className="material-symbols-outlined">search</span>
                </div>

                <table id="protable">

                    <thead>
                        <tr>
                            <th id="proid">Product ID</th>
                            <th id="proname">Product Name</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th id="proop">Operations</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            books.map((item,i)=>{

                                return (

                                    <tr key={item._id}>
                                        <td id="proid">{item._id}</td>
                                        <td id="proname">{item.Title}</td>
                                        <td>{item.Stock}</td>
                                        <td>&#8377;{item.Price}</td>
                                        <td>&#8377;{item.Discount}</td>
                                        <td id="allcenter">
                                            <div id="together">
                                                
                                                {
                                                    /*
                                                    <span id="alliconsz" className="material-symbols-outlined bg-primary text-white">edit</span>
                                                    <span id="alliconsz" className="material-symbols-outlined bg-success text-white">visibility</span>
                                                    <span id="alliconsz" className="material-symbols-outlined bg-danger text-white">delete</span>
                                                    */
                                                }
                                                <button onClick={()=>{setdata(item)}} type="button" className="btn btn-primary"><span className="material-symbols-outlined">edit</span></button>
                                                <button onClick={()=>{setview(item)}} type="button" className="btn btn-success"><span className="material-symbols-outlined">visibility</span></button>
                                                <button onClick={()=>{setdel(item)}} type="button" className="btn btn-danger"><span className="material-symbols-outlined">delete</span></button>
                                            </div>
                                        </td>
                                    </tr>

                                )

                            })
                        }
                        
                    </tbody>

                </table>

                {
                    (data) ? <Updateform data={data} updata={(data)=>{setdata(data)}} refdata={waitdata}/> : ""
                }

                {
                    (view) ? <Viewform data={view} updata={(data)=>{setview(data)}} /> : ""
                }

                {
                    (del) ? <Confirmation data={"Confirm Deletion!!"} updata={delfun} /> : ""
                }

            </div>

        </div>

    )

}