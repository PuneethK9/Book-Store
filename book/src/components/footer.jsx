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

                        <div>
                            <br></br>
                            <b>Book Categories</b>
                        </div>

                        <div id="inner">

                            <div id="out">
                                <p>Action</p>
                                <p>Action</p>
                                <p>Action</p>
                                <p>Action</p>
                                <p>Action</p>
                                <p>Action</p>
                            </div>

                            <div id="out">
                                <p>Adventure</p>
                                <p>Adventure</p>
                                <p>Adventure</p>
                                <p>Adventure</p>
                                <p>Adventure</p>
                                <p>Adventure</p>
                            </div>

                        </div>

                    </div>

                    <div id="lis">
                        <b>Quick links</b>
                        <p>About Us</p>
                        <p>Contact Us</p>
                        <p>Home</p>
                        <p>Store</p>
                        <p>Cart</p>
                        <p>Favourites</p>
                    </div>

                    <div id="stre">

                        <b>Our Store</b>

                        <div id="storeimg">
                            <div id="imgsz" style={{marginBottom:10}}>
                                <img src="https://www.google.com/maps/vt/data=KsZPwzKocdMq5Ilv5DtNrYHJXSfxFVz45gUmHC5tH9v31keGF2jVmdO_c1da6bxllvPCf_oiG9PblSzLsxqzgYXpGXU7-UAuAGppR0fRDPUmNTw5RtypZsoHuNCtDg-sXut_L42LJ3424-kvasr4YHzd4bgWoR1HaAYJIi1ItqF1ZBvlJX2HOLjoeLFwde-aWAR3QFYgJL_ypseU904rS_lUG8z5NHL-3qrnujkRDA4zcWYZAfJtZWmd2SjszWsCpbRDxOkFVZQkGSmuCIno5hB39iu2Ml4"></img>
                            </div>

                            <div className="d-flex align-items-center">
                                <span id="footcon" className="material-symbols-outlined">location_on</span>
                                <span>BookHaven,Silchar,Assam</span>
                            </div>
                        </div>


                        <div className="d-flex align-items-center">
                            <span id="footcon" className="material-symbols-outlined">call</span>
                            <span>+111 387237823</span>
                        </div>



                        <div className="d-flex align-items-center">
                            <span id="footcon" className="material-symbols-outlined">mail</span>
                            <span>BookHaven@gmail.com</span>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}