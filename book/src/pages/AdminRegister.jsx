import React, { useState } from "react";
import "../assets/UserLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toaster from "../components/Toaster";

export default function AdminRegister(){

    const navigate = useNavigate();

    const [firstst,setfirstst] = useState(false);
    const [emailst,setemailst] = useState(false);
    const [passst,setpassst] = useState(false);

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

        if(data.Firstname=="")
        {
            setfirstst(true);

            setTimeout(()=>{
                setfirstst(false);
            },3000);

            return;
        }

        if(data.Email=="")
        {
            setemailst(true);

            setTimeout(()=>{
                setemailst(false);
            },3000);

            return;
        }

        if(data.Password=="")
        {
            setpassst(true);

            setTimeout(()=>{
                setpassst(false);
            },3000);

            return;
        }

        axios.post("http://localhost:4000/ARegister",data)
            .then(res=>{
                console.log(res);
                localStorage.setItem("token",res.data.token);
                navigate("/Ahome")
            })
            .catch(err=>{
                console.log("Error Registering User");
            })
    }

    return (

        <div class="outer_a">
        <div class="main_a" style={{height:570,width:800}}>
            <div class="flex-container_a">
                <div class="flex-left_a">
                    <div style={{height:"60%"}} class="flex-left-inside_a">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLfgFJWbAVMoKKGw40jMvpdPW3leryDi7TVQ&s"></img>
                    </div>
                </div>
                <div class="flex-right_a">
                    <div class="flex-right-inside_a" style={{padding:"5% 10%"}}>
                        <h1>Sign up</h1>
                        <div class="icon_a" style={{marginBottom:5}}>
                            <span id="upma" class="material-symbols-outlined">
                                person
                            </span>
                            <input style={{marginTop:3,width:300}}  type="text" onChange={handlechange} name="Firstname" id="inst_a" placeholder="Your First name" />
                        </div>
                        <div class="icon_a" style={{marginBottom:5}}>
                            <span id="upma" class="material-symbols-outlined">
                                person
                            </span>
                            <input style={{marginTop:3,width:300}} type="text" onChange={handlechange} name="Lastname" id="inst_a" placeholder="Your Last name" />
                        </div>
                        <div class="icon_a" style={{marginBottom:5}}>
                            <span id="upma" class="material-symbols-outlined">
                                wc
                                </span>
                            <input style={{marginTop:3,width:300}} type="text" onChange={handlechange} name="Gender" id="inst_a" placeholder="Gender" />
                        </div>
                        <div class="icon_a" style={{marginBottom:5}}>
                            <span id="upma" class="material-symbols-outlined">
                                mail
                                </span>
                            <input style={{marginTop:3,width:300}} type="text" onChange={handlechange} name="Email" id="inst_a" placeholder="Email" />
                        </div>
                        <div class="icon_a" style={{marginBottom:5}}>
                            <span id="upma" class="material-symbols-outlined">
                                call
                                </span>
                            <input style={{marginTop:3,width:300}} type="text" onChange={handlechange} name="Phonenumber" id="inst_a" placeholder="Your Contact Number" />
                        </div>
                        <div class="icon_a" style={{marginBottom:5}}>
                            <span id="upma" class="material-symbols-outlined">
                                home
                                </span>
                            <input style={{marginTop:3,width:300}} type="text" onChange={handlechange} name="Address" id="inst_a" placeholder="Your Address" />
                        </div>
                        <div class="icon_a" style={{marginBottom:5}}>
                            <span id="upma" class="material-symbols-outlined">
                                lock
                                </span>
                            <input style={{marginTop:3,width:300}} type="password" onChange={handlechange} name="Password" id="inst_a" placeholder="Password" />
                        </div>

                        <div class="icon_a" style={{marginBottom:15}}>
                            <span id="upma" class="material-symbols-outlined">
                                lock
                                </span>
                            <input style={{marginTop:3,width:300}} type="password" id="inst_a" placeholder="Repeat Your Password" />
                        </div>

                        <div style={{display:"flex",marginBottom:5,alignItems:"center"}}>
                            <input  style={{width:20,marginRight:10,accentColor:"blueviolet"}} type="checkbox" name="agree" id="box_a" />
                            <label id="agree_a">I agree to Terms of service</label>
                        </div>

                        <form action="">
                            <button onClick={handleclick} type="button" style={{backgroundColor:"blueviolet"}} className="btn text-white">Register</button>
                            <button onClick={()=>{navigate("/ALogin")}} type="button" style={{marginLeft:20}} className="btn text-white bg-danger">Log In</button>
                        </form>
                    </div>

                </div>

            </div>
        </div>

        <div>
            {
                (firstst)?<Toaster data={"Enter Firstname"} />:""
            }
            {
                (emailst)?<Toaster data={"Enter Email"} />:""
            }
            {
                (passst)?<Toaster data={"Enter Password"} />:""
            }
        </div>

    </div>
        
    )


}