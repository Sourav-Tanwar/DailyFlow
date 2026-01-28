import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signupUser } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar'
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const dispatch = useDispatch();
  const [newUser, setnewUser] = useState({ name: "", email: "", password: "", confirmPass: "" })
  let Navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(signupUser(newUser));

    if (signupUser.fulfilled.match(resultAction)) {
      Navigate("/")
    }
    else {
      alert(resultAction.payload || "Login failed");
    }
  }

  function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { label: "Weak", color: "red" };
    if (strength === 3) return { label: "Medium", color: "orange" };
    if (strength >= 4) return { label: "Strong", color: "green" };
    return { label: "", color: "" };
  }


  function isValidEmail(email) {
    // Simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(JSON.stringify({ name: newUser.name, email: newUser.email, password: newUser.password, confirmPass: newUser.confirmPass }))
  //   if (password === confirmPass) {
  //     const response = await fetch("http://localhost:3000/api/createUser", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ name: newUser.name, email: newUser.email, password: newUser.password })

  //     });
  //     const json = await response.json()
  //     console.log(json);
  //     if (!json.success) {
  //       alert("Invalid Value newUser")
  //     }
  //     if (json.success) {
  //       localStorage.setItem("userEmail", newUser.email);
  //       localStorage.setItem("authToken", json.authtoken);
  //       // console.log(localStorage.getItem("userEmail","authtoken" ))
  //       Navigate("/expense")
  //     }
  //   } else {
  //     alert("Password did not match")
  //   }
  // }


  const onChange = (event) => {
    setnewUser({ ...newUser, [event.target.name]: event.target.value })
    // console.log(newUser)
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
            <input type="text" id="name" name="name" value={newUser.name} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Email address</label>
            <input type="email" id="email" name="email" value={newUser.email} onChange={onChange} autoComplete="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="example@xyz.com" required />
            {newUser.email && !isValidEmail(newUser.email) && (
              <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name='password'
                value={newUser.password}
                onChange={onChange}
                autoComplete="new-password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {newUser.password && (
              <div className="mt-1">
                <span style={{ color: getPasswordStrength(newUser.password).color }}>
                  Password Strength: {getPasswordStrength(newUser.password).label}
                </span>
              </div>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="confirmPass" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900" >Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPass"
                name='confirmPass'
                value={newUser.confirmPass}
                onChange={onChange}
                autoComplete="new-password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {newUser.confirmPass && newUser.password !== newUser.confirmPass && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
          </div>
          <button type="submit" disabled={loading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? "Signing in..." : "Submit"}</button>
          <Link to="/login" className="m-3 btn btn-danger">Already signed up.</Link>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </>
  )
}
