import React, { useEffect, useState } from "react";
import "../assets/star.css";

export default function Star({data,paras,godata,goodst})
{
    const [sz,setsz] = useState(data);
    const [clk,setclk] = useState(0);
    const [finalst,setfinalst] = useState(goodst);

    useEffect(()=>{
        setfinalst(goodst);
    },[goodst]);

    useEffect(()=>{

        //console.log(finalst+"###");

        if(finalst)
        {
            //console.log(1);
            godata(clk);
        }

    },[clk]);

    return (
        <div className="w-100 h-100">

            <div id="starcon">

            {
                (((paras)?paras:clk)>=1) ?
                <span style={{fontSize:sz+"rem",color:"blueviolet"}} onClick={()=>{setclk(1);}}  id="staricon" className="fa-solid fa-star"></span>
                :
                <span style={{fontSize:sz+"rem",color:"#e6e6e6"}} onClick={()=>{setclk(1);}}  id="staricon" className="fa-solid fa-star"></span>
            }

            {
                (((paras)?paras:clk)>=2) ?
                <span style={{fontSize:sz+"rem",color:"blueviolet"}} onClick={()=>{setclk(2);}}  id="staricon" className="fa-solid fa-star"></span>
                :
                <span style={{fontSize:sz+"rem",color:"#e6e6e6"}} onClick={()=>{setclk(2);}}  id="staricon" className="fa-solid fa-star"></span>

            }

            {
                (((paras)?paras:clk)>=3) ?
                <span style={{fontSize:sz+"rem",color:"blueviolet"}} onClick={()=>{setclk(3);}}  id="staricon" className="fa-solid fa-star"></span>
                :
                <span style={{fontSize:sz+"rem",color:"#e6e6e6"}} onClick={()=>{setclk(3);}}  id="staricon" className="fa-solid fa-star"></span>

            }

            {
                (((paras)?paras:clk)>=4) ?
                <span style={{fontSize:sz+"rem",color:"blueviolet"}} onClick={()=>{setclk(4);}}  id="staricon" className="fa-solid fa-star"></span>
                :
                <span style={{fontSize:sz+"rem",color:"#e6e6e6"}} onClick={()=>{setclk(4);}}  id="staricon" className="fa-solid fa-star"></span>

            }

            {
                (((paras)?paras:clk)>=5) ?
                <span style={{fontSize:sz+"rem",color:"blueviolet"}} onClick={()=>{setclk(5);}}  id="staricon" className="fa-solid fa-star"></span>
                :
                <span style={{fontSize:sz+"rem",color:"#e6e6e6"}} onClick={()=>{setclk(5);}}  id="staricon" className="fa-solid fa-star"></span>

            }

            </div>
        </div>
    )
}