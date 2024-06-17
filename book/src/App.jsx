import React, { useState } from "react"
import Addbook from "./pages/Addbook" 
import Store from "./components/store"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Filters from "./components/filters"
import Header from "./components/header"
import Footer from "./components/footer"
import Storepage from "./pages/storepage"
import Desc from "./components/desc"
import Descpage from "./pages/descpage"
import Similar from "./components/similar"
import UserLogin from "./pages/UserLogin"
import Register from "./pages/Register"
import Favs from "./components/favs"
import Favspage from "./pages/Favspage"
import Toaster from "./components/Toaster"
import Cart from "./components/Cart"
import Cartpage from "./pages/Cartpage"
import Review from "./components/Review"
import Reviewform from "./components/Reviewform"
import Star from "./components/star"

function App() {

  const [yes,setyes] = useState(false);
  const [cartst,setcartst] = useState(false);

  function fun(data)
  {
    setyes(data);
  }

  function cartdata(data)
  {
    setcartst(data);
  }
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<Addbook />} />
        <Route path="/store" element={<Storepage data={yes} updata={fun} cartdata={cartst} maincartdata={cartdata}/>} />
        <Route path="/desc/:id" element={<Descpage maindata={fun} updata={yes} nowdata={cartdata} />}  />
        <Route path="/URegister" element={<Register />} />
        <Route path="/ULogin" element={<UserLogin />} />
        <Route path="/Favs" element={<Favspage updata={fun} cartdata={cartst} maincartdata={cartdata}/>} />
        <Route path="/cart" element={<Cartpage data={yes} nicedata={fun} />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
