import React from "react"
import Addbook from "./pages/Addbook" 
import Store from "./components/store"
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<Addbook />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
