import React from "react";
import "../assets/storepage.css"
import Header from "../components/header.jsx"
import Store from "../components/store.jsx"
import Filters from "../components/filters.jsx"
import Footer from "../components/footer.jsx"


export default function Storepage(){

    return (

        <div>

            <div className="h-100 w-100">

                <div id="header">
                    <Header/>
                </div>

                <div id="mai">

                    <div id="fillcol">
                        <Filters/>
                    </div>


                    <div id="books">
                        <Store/>
                    </div>

                </div>

                <div id="footer">
                    <Footer/>
                </div>
                
            </div>

        </div>
    )

}