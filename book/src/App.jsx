import React from "react"
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

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<Addbook />} />
        <Route path="/store" element={<Storepage />} />
        <Route path="/desc/:id" element={<Descpage />}  />
        <Route path="/URegister" element={<Register />} />
        <Route path="/ULogin" element={<UserLogin />} />
        <Route path="/Favs" element={<Favspage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
