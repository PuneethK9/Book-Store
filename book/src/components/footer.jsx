import React from "react"
import "../assets/footer.css"
import ins from "../assets/instagram.png"
import face from "../assets/facebook.png"
import x from "../assets/twitter.png"
import you from "../assets/youtube.png"
import lin from "../assets/linkedin.png"



export default function Footer(){

    return (

        <div className="h-100 w-100">
            <div id="con">
                <div id="mains">

                    <div id="bomma">

                        <div id="logo">
                            <span id="szs" className="material-symbols-outlined">book_4</span>
                            <h2><b>BookHaven</b></h2>
                        </div>
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus laboriosam dicta minus eos iure cupiditate quod consequatur nemo numquam quisquam ipsam, delectus eaque aut quam sequi accusantium alias libero ratione!
                        </div>
                        <div>
                            <h5><b>Follow Us</b></h5>
                        </div>

                        <div id="social">

                            <div id="media" className="insta">
                                <img id="png"  src={ins}></img>
                            </div>

                            <div id="media" className="face">
                                <img id="png" src={face}></img>
                            </div>

                            <div id="media" className="x">
                                <img id="png" src={x}></img>
                            </div>

                            <div id="media" className="insta">
                                <img id="png" src={you}></img>
                            </div>

                            <div id="media" className="face">
                                <img id="png" src={lin}></img>
                            </div>

                        </div>

                    </div>

                    <div id="cats" > 

                    </div>

                    <div id="lis">

                    </div>

                    <div id="stre">

                    </div>

                </div>
            </div>
        </div>
    )
}