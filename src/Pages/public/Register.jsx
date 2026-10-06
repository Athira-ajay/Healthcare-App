import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHandHoldingMedical } from 'react-icons/fa6'
import { checkEmailAPI, registerAPI } from '../../Services/allAPI'




function Register() {

    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


  // register submit function
  const handleRegister = async(e) => {

    e.preventDefault();

     // Check whether password and confirm password match
    if (userDetails.password !== userDetails.confirmPassword) {

        alert("Passwords do not match");

        return;
    }

    try {
      

        // Check whether email already exists
        const emailResponse = await checkEmailAPI(userDetails.email);

        if (emailResponse.data.length > 0) {

            alert("Email already registered. Please use another email.");
            return;

        }


        //Register new user
        const response = await registerAPI(userDetails);

        console.log("Registration successful:", response.data);

        alert("Registration successful!");

        navigate("/login");

    } 
    catch (error) {

        console.log("Registration failed:", error);

        alert("Registration Failed")

    }
};







  return (
    <div className='register-page'>

      <div className='register-container'>

        {/* Left Section */}

        <div className='register-info'>

          <FaHandHoldingMedical className='register-icon' />

          <h2>Join MediBridge</h2>

          <p className='text-center'>Start your healthcare journey with us.
            Create an account to find trusted doctors
            and manage your appointments easily.</p>

        </div>


        {/* Right Section */}

        <div className='register-form-section'>

          <h2 className='text-center'>Create Account</h2>

          <p className='register-subtitle text-center'>
            Register to access your MediBridge account
          </p>


          <form onSubmit={handleRegister}>

            <div className='form-group'>

              <label>Full Name</label>

              <input type='text' placeholder='Enter your Name' value={userDetails.name} onChange={(e) => setUserDetails({...userDetails,name: e.target.value})} />

            </div>


            <div className='form-group'>

              <label>Email Address</label>

              <input type='email' placeholder='Enter your email' value={userDetails.email} onChange={(e) => setUserDetails({...userDetails,email: e.target.value})}/>

            </div>


            <div className='form-group'>

              <label>Password</label>

              <input type='password' placeholder='Enter your password' value={userDetails.password} onChange={(e) => setUserDetails({...userDetails,password: e.target.value})}/>

            </div>


            <div className='form-group'>

              <label>Confirm Password</label>

              <input type='password' placeholder='Confirm your password' value={userDetails.confirmPassword} onChange={(e) => setUserDetails({...userDetails,confirmPassword: e.target.value})}/>

            </div>


            <button type='submit' className='register-btn'>Register</button>

          </form>


          <p className='login-link'>

            Already have an account?

            <Link to='/login'> Login</Link>

          </p>

        </div>

      </div>

    </div>
  )
}

export default Register