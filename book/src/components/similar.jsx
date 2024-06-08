import React from "react";
import "../assets/similar.css";
import { Link } from "react-router-dom";

export default function Similar({data}){
    return (
        <div className="h-100 w-100">
            <div id="mess">
                <div id="mc">
                    <h4 style={{margin:10,marginBottom:25}} ><b>Similar Books</b></h4>
                    <div id="col">

                        {
                            (data) ?

                            data.map(function(item,i){

                                return (

                                    <div id="boook" key={i}>
                                        <div id="ps">
                                            <Link to={`/desc/${item._id}`}><img id="here" src={item.Image}></img></Link>
                                        </div>

                                        <div id="look">
                                            <b id="supr" style={{color:"black"}}>{item.Title}</b>

                                            <div id="data" className="d-flex justify-content-start">

                                                {
                                                    item.Genre.map(function(j,i){
                                                        return (
                                                            (i+1===item.Genre.length) ? <p id="txt" key={i}>{j}</p> : <p id="txt" key={i}>{j},</p>
                                                        )
                                                    })
                                                }

                                            </div>
                                            
                                        </div>
                                    </div>
                                )
                            })
                            :
                            "Loading"
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}