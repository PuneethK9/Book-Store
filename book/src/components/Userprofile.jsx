import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Userprofile()
{
    const [input,setinput] = useState(null);

    const [editst,seteditst] = useState(false);
    const [truest,settruest] = useState(false);
    const [ref,setref] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{

        axios.get("http://localhost:4000/profile",{
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
            setinput(res.data.Data);
        })

    },[ref]);

    function handlechange(eve)
    {
        const {name,value} = eve.target;
        //console.log(eve.target);

        setinput(prev=>{
            return {
                ...prev,
                [name]:value
            }
        })
        settruest(true);
    }

    function handleclk()
    {
        axios.put("http://localhost:4000/profile",{input},{
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
            seteditst(!editst);
            settruest(false);
            setref(!ref);
        })
        .catch((err)=>{
            console.log("Error Updating User data");
            console.log(err);
        })
    }

    return (

        <div className="h-100 w-100">

            <div id="procard" style={{padding:30}} className="h-100 w-100">

                <div style={{margin:10}}>
                    <label>Firstname:</label>
                    <input onChange={handlechange} disabled={!editst} style={{margin:10}} value={(input)?input.Firstname:""} name="Firstname"></input>
                </div>

                <div style={{margin:10}}>
                    <label>Lastname:</label>
                    <input onChange={handlechange} name="Lastname" disabled={!editst} style={{margin:10}} value={(input)?input.Lastname:""}></input>
                </div>

                <div style={{margin:10,display:"flex",alignItems:"center"}}>
                    <label>Gender:</label>

                    <div style={{display:"flex"}}>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <input disabled={!editst} onChange={handlechange} value={"Male"} checked={((input)?input.Gender=="Male":"")} style={{width:20,height:18,margin:10,accentColor:"blueviolet"}}  type="radio" name="Gender"></input><label>Male</label>
                        </div>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <input disabled={!editst} onChange={handlechange} value={"Female"} checked={((input)?input.Gender=="Female":"")} style={{width:20,height:18,margin:10,accentColor:"blueviolet"}}  type="radio" name="Gender"></input><label>Female</label>
                        </div>
                    </div>

                </div>

                <div style={{margin:10}}>
                    <label>Email:</label>
                    <input onChange={handlechange} name="Email" disabled={!editst} type="email" style={{margin:10}} value={(input)?input.Email:""}></input>
                </div>

                <div style={{margin:10}}>
                    <label>Phonenumber:</label>
                    <input onChange={handlechange} name="Phonenumber" disabled={!editst} type="number" style={{margin:10}} value={(input)?input.Phonenumber:""}></input>
                </div>

                <div style={{margin:10}}>
                    <label>Address:</label>
                    <textarea onChange={handlechange} name="Address" disabled={!editst} style={{margintop:10}} value={(input)?input.Address:""}></textarea>
                </div>

                <div>
                    {   (!truest) ?
                        <button onClick={()=>{seteditst(!editst)}} type="button" className="btn btn-primary">Edit</button>
                        :
                        <button onClick={handleclk} type="button" className="btn btn-success">Update</button>
                    }
                </div>

            </div>

            

        </div>

    )
}