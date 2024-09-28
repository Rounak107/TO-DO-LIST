import axios from 'axios';
import React,{useState} from 'react';
import {NavLink,useNavigate} from "react-router-dom";
import { useCookies} from "react-cookie"


function Login({BASE_URL}) {
  const navigateTo = useNavigate();
      const [email,setEmail] = useState("");
      const [password, setPassword] =useState("");

     
      const submitLogin = async (e) => {
        e.preventDefault();
      
        try {
          const data = {
            email,
            password
          };
      
          // Make a POST request to the backend for login
          const resp = await axios.post(
            `${BASE_URL}/api/u/login`,
            data,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              },
              withCredentials: true, // Ensures cookies are included if your backend requires it
            }
          );
      
          // Check for successful response and proceed
          if (resp.data.success) {
            // Save token in session storage
            sessionStorage.setItem("token", resp.data.token);
      
            // Navigate to dashboard
            navigateTo("/dashboard");
      
            console.log("Token:", resp.data.token);
            window.alert("Login Successful!");
          }
      
          // Handle possible incorrect credentials
          if (resp.status === 400 || resp.status === 401) {
            alert("Invalid Credentials!");
          }
      
        } catch (error) {
          console.log("Error occurred during login:", error);
      
          // Error handling for invalid credentials or server issues
          if (error.response && (error.response.status === 400 || error.response.status === 401)) {
            alert("Invalid Credentials!");
          } else {
            alert("Failed to connect to the server!");
          }
        }
      };


  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center font-bold text-2xl">Log in</div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={submitLogin} className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    href="/signup"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Don't have Account, Sign Up
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login