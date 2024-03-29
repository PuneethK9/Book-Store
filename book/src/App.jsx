import React from "react"
import Addbook from "./pages/Addbook" 
import Store from "./components/store"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Filters from "./components/filters"
import Header from "./components/header"
import Footer from "./components/footer"
import Storepage from "./pages/storepage"
import Desc from "./components/desc"

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<Addbook />} />
        <Route path="/store" element={<Storepage />} />
        <Route path="/desc" element={<Desc />}  />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
