import React, { useState } from "react";
import "../assets/Reviewfrom.css"
import Star from "./star"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Reviewform({data,updata})
{
    const [rate,setrate] = useState(0);
    const [des,setdes] = useState("");
    const navigate = useNavigate();

    function handleclick()
    {
        if(data)
        {

            axios.post("http://localhost:4000/rev",{Rating:rate,Bookid:data,Description:des},{
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
                updata(false);
            })
            .catch((err)=>{
                console.log("Error Adding Review");
                console.log(err);
            })

        }

    }

    function fun(eve)
    {
        const {name,value} = eve.target;
        setdes(value);
    }

    function gooddata(data)
    {
        setrate(data);
    }

    return (
        <div className="h-100 w-100" id="revformpos">

            <div id="revformcon">

                <div id="revform">

                    <div id="heading">
                        <h4><b>{ (data)?data.Title:"Loading" }</b></h4>
                    </div>

                    <div id="revstar">
                        <Star data={3} goodst={true} godata={gooddata}/>
                    </div>

                    <div id="revformdata">
                        <textarea id="revmaindata" placeholder="Your Opinion.." name="Description" onChange={fun} >

                        </textarea>
                    </div>

                    <div id="revformbtn">
                        <button id="revsbt" onClick={handleclick} type="button">Submit</button>
                        <button id="revcnl" onClick={()=>{updata(false)}} type="button">Cancel</button>
                    </div>

                </div>

            </div>

        </div>
    )
}