import React from "react";
import "../assets/header.css";

export default function Header(){
    return (

        

        <div className="h-100 w-100">
            <div id="con">
                <div id="mans">

                    <div id="logo">
                        <span id="szs" className="material-symbols-outlined">book_4</span>
                        <h2><b>BookHaven</b></h2>
                    </div>

                    <div id="lks">
                        <div id="hv"><label id="link">Home</label></div>
                        <div id="hv"><label id="link">Store</label></div>
                        <div id="hv"><label id="link"><span id="icons" className="material-symbols-outlined">favorite</span></label></div>
                        <div id="hv"><label id="link"><span id="icons" className="material-symbols-outlined">shopping_cart</span></label></div>
                        <div id="hv">
                            <label id="link">
                                <span id="icons" className="material-symbols-outlined">account_circle</span>
                                <span id="us">Goku</span>
                            </label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}