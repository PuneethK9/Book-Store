import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/Addbook.css"
import {Link, useNavigate} from "react-router-dom"
import { useState } from "react";
import axios from "axios"
import Adminheader from "../components/Adminheader";

export default function Addbook()
{
    const [input,setinput] = useState({
        Title:"",
        Author:"",
        Genre:[],
        Price:"",
        Stock:"",
        Image:"",
        Description:"",
        Publisher:""
    });

    const [nice,setnice] = useState("");
    const [val,setval] = useState(false);
    const [err,seterr] = useState();
    const navigate = useNavigate();


    function handleImageChange(event){
        const {name,value} = event.target;

        setinput(prev=>{
            return{
                ...prev,
                [name]:value
            }
        })

        setnice(value)
        setval({val:true})
    }

    function handleChange(event){
        const {name,value}=event.target;

        setinput(prev=>{
            return {
                ...prev,
                [name]:name === "Genre" ? value.split(',').map(genre => genre.trim()) : value
            }
        })
    }

    function handleClick(event){
        event.preventDefault();

        const data={
            Title:input.Title,
            Author:input.Author,
            Genre:input.Genre,
            Price:input.Price,
            Stock:input.Stock,
            Image:input.Image,
            Description:input.Description,
            Publisher:input.Publisher
        }

        console.log(err);

        axios.post('http://localhost:4000/add',data,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        .then(function(res){
            console.log(res);

            if(res.data.status==909)
            {
                localStorage.clear();
                return navigate("/ALogin")
            }

            if(res.data.status==501 || res.data.status==502)
            return;

            seterr(
                <div class="alert alert-success d-flex align-items-center" role="alert" id="toast">
                    <div>
                        <b>New Book Added</b>
                    </div>
                </div>
            )

            setTimeout(function(){
                seterr(null)
            },2000);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (

        <div className="h-100 w-100" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>

            <div id="dets" className="d-flex" style={{height:560}}>
                <div id="photo" className="h-100">
                    <div className="h-50 w-100 d-flex flex-column align-items-center">
                        <h4><b>Add New Product</b></h4>
                        <div id="pho" className="bg-white">

                            {
                                (val) ?
                                <img src={nice} alt="image here" className="h-100 w-100 bg-white"></img>
                                : ""
                            }

                        </div>
                    </div>
                    <div className="h-50 w-100 d-flex flex-column justify-content-space-evenly">
                        <div className="h-50 d-flex flex-column justify-content-center">
                            <label><b>Image Url</b></label>
                            <input onChange={handleImageChange} name="Image" type="text"></input>
                        </div>
                        <div className="h-50 d-flex flex-column justify-content-center">
                            <label><b>Stock</b></label>
                            <input onChange={handleChange} name="Stock" type="Number"></input>
                        </div>
                    </div>
                </div>

                <div id="ins" className="h-100">

                    <div>
                        <label><b>Book Title</b></label><br></br>
                        <input onChange={handleChange} name="Title" className="w-100" type="text"></input>
                    </div>

                    <div>
                        <label><b>Genre</b></label><br></br>
                        <input onChange={handleChange} name="Genre" className="w-100" type="text"></input>
                    </div>

                    <div>
                        <label><b>Author</b></label><br></br>
                        <input onChange={handleChange} name="Author" className="w-100" type="text"></input>
                    </div>

                    <div>
                        <label><b>Publisher</b></label><br></br>
                        <input onChange={handleChange} name="Publisher" className="w-100" type="text"></input>
                    </div>

                    <div>
                        <label><b>Price</b></label><br></br>
                        <input onChange={handleChange} name="Price" className="w-100" type="Number"></input>
                    </div>

                    <div>
                        <label><b>Description</b></label><br></br>
                        <textarea onChange={handleChange} name="Description"></textarea>
                    </div>

                    <div>
                        <button id="add" onClick={handleClick} type="button" className="w-100 btn text-white"><b>ADD</b></button>
                    </div>
                </div>
            </div>

            <div>
                {
                    (err) ? err : ""
                }
            </div>
        </div>
    )
}