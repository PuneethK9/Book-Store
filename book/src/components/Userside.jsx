import React, { useEffect, useState } from "react";
import "../assets/Userside.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Userside()
{
    const [ref,setref] = useState(false);
    const [user,setuser] = useState(null);
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
            setuser(res.data.Data);
        })
        .catch((err)=>{
            console.log("Error Getting User profile");
            console.log(err);
        })

    },[ref]);

    function logout()
    {
        localStorage.clear();
        setref(!ref);
    }

    return (

        <div className="h-100 w-100">

            <div id="Userside">

                <div id="Userdetcon">

                    <div id="Usernamediv">

                        <div id="accicon">
                            <span style={{fontSize:"5rem"}} className="material-symbols-outlined">account_circle</span>
                        </div>

                        <div id="accname">
                            <div>Hello,</div>
                            <div style={{fontSize:"1.5rem"}}>{(user)?user.Firstname+" "+user.Lastname:""}</div>
                        </div>

                    </div>

                    <div id="Userop">

                        
                        <Link to={"/UOrders"} style={{color:"black",textDecoration:"none",height:"20%"}}>
                            <div id="Usersame">
                                <label>My Orders</label>
                            </div>
                        </Link>

                        <Link to={"/UReviews"} style={{color:"black",textDecoration:"none",height:"20%"}}>
                            <div id="Usersame">
                                <label>My Reviews</label>
                            </div>
                        </Link>
                        
                        <Link to={"/UProfile"} style={{color:"black",textDecoration:"none",height:"20%"}}>
                            <div id="Usersame">
                                <label>My Profile</label>
                            </div>
                        </Link>

                        

                        
                        <Link to={""} style={{color:"black",textDecoration:"none",height:"20%"}}>
                            <div id="Usersame">
                                <label onClick={logout} style={{height:"100%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>Logout</label>
                            </div>
                        </Link>

                    </div>

                </div>

            </div>



        </div>

    )
}
