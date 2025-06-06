import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar'
import ExpenseTracker from './components/ExpenseTracker'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard';
import HomePage from "./components/HomePage";
import { useSelector } from 'react-redux';

// import './App.css'

function App() {
  // const isLoggedIn = !!localStorage.getItem("authToken");
  const isLoggedIn = useSelector((state) => !!state.auth.token);

  return (
    <>
    <Router>
      
      <Routes>
      <Route path="/" element={isLoggedIn ? <Dashboard /> : <HomePage />} />
      {/* <Route exact path='/' element={<Dashboard/>}/> */}
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/signup" element={<Signup/>}/>
      <Route exact path="/Expense" element={<ExpenseTracker />}/>


      </Routes>
      </Router>
    </>
  )
}

export default App
