import React, { useState } from "react";
import "../assets/filters.css"

export default function Filters(){

    const [open1,setopen1] = useState(true);
    const [open2,setopen2] = useState(true);
    const [open3,setopen3] = useState(true);
    const [open4,setopen4] = useState(true);
    
    const [Author,setAuthor] = useState([]);


    function authorchg(e){

        const value = e.target.value;
        const chk = e.target.checked;

        if(chk)
        setAuthor([...Author,value])
        else
        setAuthor(Author.filter(i=>i!==value));

    }

    function clk1(){
        setopen1(!open1);
    }
    function clk2(){
        setopen2(!open2);
    }
    function clk3(){
        setopen3(!open3);
    }
    function clk4(){
        setopen4(!open4);
    }

    return (
        <div className="h-100 w-100">
            <div id="con">
                <div id="fill">
                    <div id="txts"><h4><b>Filter Option</b></h4></div>

                    <div id="hold">

                        <div id="acc">
                            <button onClick={clk1} id="accbtn" type="button" className="w-100">
                                <b>Genre</b>
                                <span id="sz" className="material-symbols-outlined">
                                    {
                                        (open1) ? "expand_less" :" expand_more"
                                    }
                                </span>
                            </button>

                            <div id="content" style={{display:(open1)? 'block':'none'}}>
                                <p>wastefellow</p>
                            </div>
                        </div>

                        <div id="acc">
                            <button onClick={clk2} id="accbtn" type="button" className="w-100">
                                <b>Author</b>
                                <span id="sz" className="material-symbols-outlined">
                                    {
                                        (open2) ? "expand_less" :" expand_more"
                                    }
                                </span>
                            </button>

                            <div id="content" style={{display:(open2)? 'block':'none'}}>


                                <label className="d-flex align-items-center" >
                                    <input name="Goku" onClick={authorchg} value="Goku" id="cks" type="checkbox"></input>
                                    <span>Goku</span>
                                </label>

                                <label className="d-flex align-items-center" >
                                    <input name="Vegeta" onClick={authorchg} value="Vegeta" id="cks" type="checkbox"></input>
                                    <span>Vegeta</span>
                                </label>

                                <label className="d-flex align-items-center">
                                    <input onClick={authorchg} value="Gohan" id="cks" type="checkbox"></input>
                                    <span>Gohan</span>
                                </label>

                                <label className="d-flex align-items-center">
                                    <input onClick={authorchg} value="Broly" id="cks" type="checkbox"></input>
                                    <span>Broly</span>
                                </label>

                            </div>
                        </div>

                        <div id="acc">
                            <button onClick={clk3} id="accbtn" type="button" className="w-100">
                                <b>Publisher</b>
                                <span id="sz" className="material-symbols-outlined">
                                    {
                                        (open3) ? "expand_less" :" expand_more"
                                    }
                                </span>
                            </button>

                            <div id="content" style={{display:(open3)? 'block':'none'}}>
                                <p>wastefellow</p>
                            </div>
                        </div>

                        <div id="acc">
                            <button onClick={clk4} id="accbtn" type="button" className="w-100">
                                <b>Price</b>
                                <span id="sz" className="material-symbols-outlined">
                                    {
                                        (open4) ? "expand_less" :" expand_more"
                                    }
                                </span>
                            </button>

                            <div id="content" style={{display:(open4)? 'block':'none'}}>
                                <p>wastefellow</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )

}


