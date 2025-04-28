import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar'
import ExpenseTracker from './components/ExpenseTracker'
import Login from './components/Login'
import Signup from './components/Signup'

// import './App.css'

function App() {

  return (
    <>
    <Router>
      <Routes>
      {/* <div><Navbar/></div> */}
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/signup" element={<Signup/>}/>
      <Route exact path="/Expense" element={<ExpenseTracker />}/>
      
      {/* <ExpenseTracker /> */}
      </Routes>
      </Router>
    </>
  )
}

export default App
