import React, { useState } from "react";
import "../assets/Updateform.css"
import axios from "axios";
import Confirmation from "./Confirmation";

export default function Updateform({data,updata,refdata})
{
    /*
    const data={
        Title:"Harry",
        Author:"Potter",
        Genre:["Horror","Thriller"],
        Price:100,
        Stock:4,
        Image:"https://m.media-amazon.com/images/I/51E7NvVLO9L._SY445_SX342_.jpg",
        Description:"Good Book",
        Publisher:"Me"
    }
    */

    const [input,setinput] = useState({
        _id:(data)?data._id:"",
        Title:(data)?data.Title:"",
        Author:(data)?data.Author:"",
        Genre:(data)?data.Genre:[],
        Discount:(data)?data.Discount:0,
        Stock:(data)?data.Stock:0,
        Image:(data)?data.Image:"",
        Description:(data)?data.Description:"",
        Publisher:(data)?data.Publisher:""
    });

    const [confirm,setconfirm] = useState(false);

    function handleChange(event){
        const {name,value}=event.target;

        if(name=="Discount" && data)
        {
            if(value>(data.Price))
            {
                setinput(prev=>{
                    return {
                        ...prev,
                        Discount:data.Price
                    }
                })
                return;
            }
        }

        setinput(prev=>{
            return {
                ...prev,
                [name]:name === "Genre" ? value.split(',').map(genre => genre.trim()) : value
            }
        })
    }

    function gooddata(data)
    {
        if(data)
        {
            axios.put("http://localhost:4000/book",{input})
                .then((res)=>{
                    console.log(res);
                    refdata(true);
                    updata(false);
                })
                .catch((err)=>{
                    console.log("Error Updating Data")
                    console.log(err);
                })
        }
        setconfirm(false);
    }

    return (
        
        <div id="constant" className="h-100 w-100 d-flex justify-content-center align-items-center">

            <div id="bigdiv" className="bg-primary">

                <div id="productid">

                    <div>
                        <h5><b>Product ID : {(data)?data._id:"###"}</b></h5>
                    </div>
                    <div>
                        {/*
                        <span style={{height:30,width:30,textAlign:"center"}} className="material-symbols-outlined bg-danger">close</span>
                        */}
                        <button onClick={()=>{updata(null)}} style={{height:35}} type="button" className="btn btn-danger"><span className="material-symbols-outlined">close</span></button>
                    </div>

                </div>

                <div id="dets" className="d-flex bg-white" style={{borderRadius:10}}>
                    <div id="photo" className="h-100">
                        <div className="h-50 w-100 d-flex flex-column align-items-center">
                            <h4><b></b></h4>
                            <div id="pho" className="bg-white h-100">

                                {
                                    (input.Image) ?
                                    <img src={input.Image} alt="image here" className="h-100 w-100 bg-white"></img>
                                    : ""
                                }

                            </div>
                        </div>
                        <div className="h-50 w-100 d-flex flex-column justify-content-space-evenly">
                            <div className="h-50 d-flex flex-column justify-content-center">
                                <label><b>Image Url</b></label>
                                <input name="Image" onChange={handleChange} value={input.Image} type="text"></input>
                            </div>
                            <div className="h-50 d-flex flex-column justify-content-center">
                                <label><b>Stock</b></label>
                                <input onChange={handleChange} value={input.Stock} name="Stock" type="Number"></input>
                            </div>
                        </div>
                    </div>

                    <div id="ins" className="h-100">

                        <div>
                            <label><b>Book Title</b></label><br></br>
                            <input onChange={handleChange} value={input.Title} name="Title" className="w-100" type="text"></input>
                        </div>

                        <div>
                            <label><b>Genre</b></label><br></br>
                            <input onChange={handleChange} value={input.Genre} name="Genre" className="w-100" type="text"></input>
                        </div>

                        <div>
                            <label><b>Author</b></label><br></br>
                            <input onChange={handleChange} value={input.Author} name="Author" className="w-100" type="text"></input>
                        </div>

                        <div>
                            <label><b>Publisher</b></label><br></br>
                            <input onChange={handleChange} value={input.Publisher} name="Publisher" className="w-100" type="text"></input>
                        </div>

                        <div>
                            <label><b>Discount</b></label><br></br>
                            <input onChange={handleChange} value={input.Discount} name="Discount" min={0} max={(data)?data.Price:0} className="w-100" type="Number"></input>
                        </div>

                        <div>
                            <label><b>Description</b></label><br></br>
                            <textarea onChange={handleChange} value={input.Description} name="Description"></textarea>
                        </div>

                        <div>
                            <button onClick={()=>{setconfirm(true)}} type="button" className="w-100 btn btn-primary"><b>Update</b></button>
                        </div>
                    </div>
                </div>

                <div>
                    {
                        (false) ? err : ""
                    }
                </div>

                {
                    (confirm) ? <Confirmation data={"Confirm Changes"} updata={gooddata} /> : ""
                }

            </div>
        </div>

    )
}