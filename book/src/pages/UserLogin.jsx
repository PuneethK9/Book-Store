import React, {useState} from "react";
import "../assets/UserLogin.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function UserLogin()
{
    const navigate = useNavigate();

    const [input,setinput] = useState({
        Email:"",
        Password:""
    });

    function handlechange(eve){

        const {name,value} = eve.target;

        setinput(prev=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }

    function handleclick(eve) {
        eve.preventDefault();

        const data={
            Email:input.Email,
            Password:input.Password
        }

        axios.post("http://localhost:4000/ULogin",data)
            .then(res=>{
                console.log(res);
                localStorage.setItem("token",res.data.token);
                navigate("/store")
            })
            .catch(err=>{
                console.log(err);
                console.log("Error Sending Login Credentials");
            })
    }

    return (

        <div id="Logincon">
            <div id="Loginmain">
                <div id="Login">

                    <div>
                        <label>Email: <input onChange={handlechange} name="Email" type="text"></input></label>
                    </div>

                    <div>
                        <label>Password: <input onChange={handlechange} name="Password" type="text"></input></label>
                    </div>

                    <button id="add" onClick={handleclick} type="button">Register</button>

                </div>

            </div>

        </div>

    )
}