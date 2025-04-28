import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from "./Navbar"

export default function Login() {

  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let Navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: credentials.email, password: credentials.password }))
    const response = await fetch("http://localhost:3000/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    const json = await response.json()
    console.log(json);
    if (!json.success) {
      alert("Invalid Value Credentials")
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authtoken);
      // console.log(localStorage.getItem("userEmail","authtoken" ))
      Navigate("/expense")
    }

  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
    // console.log(credentials)
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
            <input type="email" id="email" name="email" value={credentials.email} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" id="password" name='password' value={credentials.password} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          <Link to="/Signup" className="m-3 btn btn-danger">I'm a new User</Link>
        </form>
      </div>
    </>
  )
}
