import React from "react"
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import { SendMoney } from "./pages/SendMoney"
import Update from "./pages/Update"

function App() {

  return (
   <div>
    <Router>
      <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/send" element={<SendMoney />} />
      <Route path="/update/:id" element={<Update />} />
      </Routes>
    </Router>
   </div>
  

    
  )
}

export default App
