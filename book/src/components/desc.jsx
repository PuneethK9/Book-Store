import React from "react";
import "../assets/desc.css"

export default function Desc({data}){

    console.log(data);

    return (

        <div className="h-100 w-100">
            <div id="more">
                <div id="less">

                    <div id="potos">
                        <img id="ano" src={
                                    (data) ? data.Image : "Loading"
                                }></img>
                    </div>

                    <div id="tails">

                        <h1 id="unique">
                            <b>
                                {
                                    (data) ? data.Title : "Loading"
                                }
                            
                            </b>
                        </h1>

                        <div id="lab">

                                {
                                    (data) ? 
                                    data.Genre.map(function(item,i){
                                        return (
                                            <label id="lbs" key={i}>{item}</label>
                                        )
                                    })
                                    : 
                                    "Loading"
                                }
                        </div>

                        <div id="des">
                            <p>
                                {
                                    (data) ? data.Description : "Loading"
                                }
                            </p>
                        </div>

                        <div id="auth">
                            <h6><b>
                                {
                                    (data) ? data.Author : "Loading"
                                }
                                </b></h6>
                        </div>

                        <div id="pri">
                            <button id="pay">
                                <span style={{marginRight:10}} className="material-symbols-outlined">shopping_cart</span>
                                <b>Add to Cart</b>
                            </button>
                            <h4 id="cst"><b>&#8377;{
                                    (data) ? data.Price : "Loading"
                                }</b></h4>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}