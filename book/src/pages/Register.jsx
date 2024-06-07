import React, { useState } from "react";
import "../assets/UserLogin.css";
import axios from "axios";

export default function Register(){

    const [input,setinput] = useState({
        Firstname:"",
        Lastname:"",
        Gender:"",
        Email:"",
        Phonenumber:"",
        Address:"",
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

    function handleclick(eve)
    {
        eve.preventDefault();

        const data={
            Firstname:input.Firstname,
            Lastname:input.Lastname,
            Gender:input.Gender,
            Email:input.Email,
            Phonenumber:input.Phonenumber,
            Address:input.Address,
            Password:input.Password
        }

        axios.post("http://localhost:4000/URegister",data)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log("Error Registering User");
            })
    }

    return (
        <div id="Logincon">
            <div id="Loginmain">
                <div id="Login">

                    <div>
                        <label>Firstname: <input onChange={handlechange} name="Firstname" type="text"></input></label>
                    </div>

                    <div>
                        <label>Lastname: <input onChange={handlechange} name="Lastname" type="text"></input></label>
                    </div>

                    <div>
                        <label>Gender: <input onChange={handlechange} name="Gender" type="text"></input></label>
                    </div>

                    <div>
                        <label>Email: <input onChange={handlechange} name="Email" type="text"></input></label>
                    </div>

                    <div>
                        <label>Phonenumber: <input onChange={handlechange} name="Phonenumber" type="text"></input></label>
                    </div>

                    <div>
                        <label>Address: <input onChange={handlechange} name="Address" type="text"></input></label>
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