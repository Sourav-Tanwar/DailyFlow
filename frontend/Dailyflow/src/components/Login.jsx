import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import Navbar from "../components/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const dispatch = useDispatch();
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let Navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser(credentials));
    if (loginUser.fulfilled.match(resultAction)) {
      Navigate("/");
    } else {
      alert(resultAction.payload || "Login failed");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(JSON.stringify({ email: credentials.email, password: credentials.password }))
  //   const response = await fetch("http://localhost:3000/api/login", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ email: credentials.email, password: credentials.password })

  //   });
  //   const json = await response.json()
  //   console.log(json);
  //   if (!json.success) {
  //     alert("Invalid Value Credentials")
  //   }
  //   if (json.success) {
  //     localStorage.setItem("userEmail", credentials.email);
  //     localStorage.setItem("authToken", json.authtoken);
  //     Navigate("/expense")
  //   }
  // }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
    // console.log(credentials)
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              autoComplete="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5="
              placeholder="example@xyz.com"
              autoFocus
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                autoComplete="current-password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? "Logging in..." : "Submit"}
          </button>
          <Link to="/Signup" className="m-3 btn btn-danger">
            I'm a new User
          </Link>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </>
  );
}
