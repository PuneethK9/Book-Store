import React, { useEffect, useState } from "react";
import Header from "../components/header"
import Footer from "../components/footer"
import "../assets/Favspage.css"
import Favs from "../components/favs";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Favspage()
{    
    return (

        <div className="h-100 w-100">

            <div id="header">
                <Header />
            </div>

            <div id="confavs">

                <Favs />

            </div>

            <div id="footer">
                <Footer />
            </div>

        </div>

    )
}