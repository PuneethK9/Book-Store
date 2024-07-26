import React, {useState} from "react";
import "../assets/UserLogin.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Book from "../assets/Book.png"

export default function AdminLogin()
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

        axios.post("http://localhost:4000/ALogin",data)
            .then(res=>{
                console.log(res);
                //localStorage.clear();
                localStorage.setItem("token",res.data.token);
                navigate("/Ahome")
            })
            .catch(err=>{
                console.log(err);
                console.log("Error Sending Login Credentials");
            })
    }

    return (

        <div className="outer_a">
        <div className="main_a">
            <div className="flex-container_a">
                <div className="flex-left_a">
                    <div style={{height:"70%"}} className="flex-left-inside_a">
                        <img src={Book}></img>
                    </div>
                </div>
                <div className="flex-right_a">
                    <div className="flex-right-inside_a">
                        <h1>Sign in</h1>
                        <br></br>
                        <div className="icon_a">
                            <span id="upma" className="material-symbols-outlined">
                                person
                            </span>
                            <input onChange={handlechange} style={{marginTop:2}} type="text" name="Email" id="inst_a" placeholder="Your Email id" />
                        </div>
                        <br></br>
                        <div className="icon_a">
                            <span id="upma" className="material-symbols-outlined">
                                lock
                                </span>
                        <input onChange={handlechange} style={{marginTop:4}} type="password" name="Password" id="inst_a" placeholder="Password" />
                        </div>
                        <br></br>
                        <div className="icon_a" >
                            <input style={{width:20,marginRight:10,accentColor:"blueviolet"}} type="checkbox" name="Remember Me" id="remember-me_a" />
                            <label>Remember me</label>
                        </div>
                        <br></br>
                        <form action="" style={{display:"flex",alignItems:"center"}}>
                            <button onClick={handleclick} id="login_a" type="submit">Log in</button>
                            <button onClick={()=>{navigate("/URegister")}} style={{marginLeft:20,height:44}} type="button" className="btn btn-danger">Register</button>
                        </form>
                        <br></br>
                        <br></br>
                        

                    </div>

                </div>

            </div>
        </div>
    </div>

    )
}