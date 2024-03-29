import React, { useEffect, useState } from "react";
import "../assets/filters.css"

export default function Filters({Authordata,Genredata}){

    const [open1,setopen1] = useState(true);
    const [open2,setopen2] = useState(true);
    const [open3,setopen3] = useState(true);
    const [open4,setopen4] = useState(true);
    
    const [Author,setAuthor] = useState([]);
    const [Genre,setGenre] = useState([]);

    useEffect(function(){
        Authordata(Author);
    },[Author]);

    useEffect(function(){
        Genredata(Genre);
    },[Genre]);

    function authorchg(e){

        const value = e.target.value;
        const chk = e.target.checked;

        if(chk)
        setAuthor([...Author,value])
        else
        setAuthor(Author.filter(i=>i!==value));
    }

    function Genrechg(e){

        const value = e.target.value;
        const chk = e.target.checked;

        if(chk)
        setGenre([...Genre,value])
        else
        setGenre(Genre.filter(i=>i!==value));
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

                                <label className="d-flex align-items-center">
                                    <input onClick={Genrechg} value="Horror" id="cks" type="checkbox"></input>
                                    <span>Horror</span>
                                </label>

                                <label className="d-flex align-items-center">
                                    <input onClick={Genrechg} value="Thriller" id="cks" type="checkbox"></input>
                                    <span>Thriller</span>
                                </label>

                                <label className="d-flex align-items-center">
                                    <input onClick={Genrechg} value="Crime" id="cks" type="checkbox"></input>
                                    <span>Crime</span>
                                </label>

                                <label className="d-flex align-items-center">
                                    <input onClick={Genrechg} value="Romantic" id="cks" type="checkbox"></input>
                                    <span>Romantic</span>
                                </label>
                                
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
                                    <input name="" onClick={authorchg} value="J.K. Rowling" id="cks" type="checkbox"></input>
                                    <span>J.K. Rowling</span>
                                </label>

                                <label className="d-flex align-items-center" >
                                    <input name="" onClick={authorchg} value="Agatha Christie" id="cks" type="checkbox"></input>
                                    <span>Agatha Christie</span>
                                </label>

                                <label className="d-flex align-items-center">
                                    <input onClick={authorchg} value="James Clear" id="cks" type="checkbox"></input>
                                    <span>James Clear</span>
                                </label>

                                <label className="d-flex align-items-center">
                                    <input onClick={authorchg} value="Conan Doyle" id="cks" type="checkbox"></input>
                                    <span>Conan Doyle</span>
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


