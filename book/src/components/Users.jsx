import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Users()
{
    const [users,setusers] = useState([]);
    const [del,setdel] = useState(null);
    const [ref,setref] = useState(true);

    useEffect(()=>{

        axios.get("http://localhost:4000/users")
            .then((res)=>{
                //console.log(res);
                setusers(res.data.data);
            })
            .catch((err)=>{
                console.log("Error Getting Users");
                console.log(err);
            })

    },[ref]);

    useEffect(()=>{

        if(del)
        {
            axios.put("http://localhost:4000/Ustatus",{del})
                .then((res)=>{
                    console.log(res);
                    setref(!ref);
                    setdel(null);
                })
                .catch((err)=>{
                    console.log("Error Blocking User");
                    console.log(err);
                })
        }

    },[del]);

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
                        <th id="proid">User ID</th>
                        <th id="proname">Email</th>
                        <th>Gender</th>
                        <th>Firstname</th>
                        <th>Access</th>
                        <th id="proop">Operations</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        users.map((item,i)=>{

                            return (

                                <tr key={item._id}>
                                    <td id="proid">{item._id}</td>
                                    <td id="proname">{item.Email}</td>
                                    <td>{item.Gender}</td>
                                    <td>{item.Firstname}</td>
                                    <td>{(item.Status)?"True":"False"}</td>
                                    <td>
                                        {
                                    
                                            (item.Status) ?
                                            <button type="button" onClick={()=>{setdel(item._id)}}  className="btn btn-danger w-50">Block</button>
                                            :
                                            <button type="button" onClick={()=>{setdel(item._id)}}  className="btn btn-success w-50">Unblock</button>

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