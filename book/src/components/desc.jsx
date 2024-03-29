import React from "react";
import "../assets/desc.css"

export default function Desc(){
    return (

        <div className="h-100 w-100">
            <div id="more">
                <div id="less">

                    <div id="potos">
                        <img src="https://m.media-amazon.com/images/I/51AG6tWCoVL.jpg"></img>
                    </div>

                    <div id="tails">

                        <h1 id="unique"><b>Atomic Habits</b></h1>

                        <div id="lab">
                            <label id="lbs">Productivity</label>
                            <label id="lbs">Management</label>
                            <label id="lbs">Sharpening</label>
                        </div>

                        <div id="des">
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas possimus, consequuntur tempore necessitatibus nihil at ad iusto repellendus sequi laudantium saepe hic eos commodi architecto labore nam excepturi. Placeat, voluptate!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sit quo vel aut sint veritatis consequatur rerum! Distinctio, in possimus eos aliquam officiis nulla eveniet adipisci, maxime dolorem, doloribus ab.
                            </p>
                        </div>

                        <div id="auth">
                            <h6><b>James Clear</b></h6>
                        </div>

                        <div id="pri">
                            <button id="pay">
                                <span style={{marginRight:10}} className="material-symbols-outlined">shopping_cart</span>
                                <b>Add to Cart</b>
                            </button>
                            <h5 id="cst"><b>&#8377;449</b></h5>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}