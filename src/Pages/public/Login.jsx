import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHandHoldingMedical } from 'react-icons/fa6'
import { loginAPI } from '../../Services/allAPI';


function Login() {


  // Store the values entered by the patient
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
        email: "",
        password: ""
  });

  
  
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

        const response = await loginAPI(loginData);

        console.log("Login response:", response.data);

        //check wheather the user exists
        if (response.data.length > 0) {

          const loggedInUser = response.data[0];

          console.log("Logged-in patient:", loggedInUser);

          localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

          alert("Login successful!");

          navigate("/patient-dashboard");

        } else {

            alert("Invalid email or password");

        }

    } 
    catch (error) {

        console.log("Login failed:", error);

        alert("Login failed. Please try again.");

    }
};



  return (
    <div className='auth-page'>

      <div className='auth-container'>

        {/* Left Section */}

        <div className='auth-info'>

          <FaHandHoldingMedical className='auth-icon' />

          <h1>MediBridge</h1>

          <h3>Welcome Back</h3>

          <p className='text-center'>Your healthcare journey continues here.<br></br>Sign in to manage your appointments and connect with trusted doctors.</p>

        </div>


        {/* Right Section */}

        <div className='auth-form-section'>

          <h2 className='text-center'>Login</h2>

          <p className='auth-subtitle text-center'>
            Sign in to your MediBridge account
          </p>


          <form onSubmit={handleLogin}>

            <div className='form-group'>

              <label>Email Address</label>

              <input type='email' placeholder='Enter your email' value={loginData.email} onChange={(e) => setLoginData({...loginData,email: e.target.value})} />

            </div>


            <div className='form-group'>

              <label>Password</label>

              <input type='password' placeholder='Enter your password' value={loginData.password} onChange={(e) => setLoginData({...loginData,password: e.target.value})}/>

            </div>


            <button type='submit' className='auth-button'>Login</button>

          </form>


          <p className='auth-switch'>

            Don't have an account?

            <Link to='/register'> Register</Link>

          </p>

        </div>

      </div>

    </div>
  )
}

export default Login