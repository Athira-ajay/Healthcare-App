import React from 'react'
import { Link } from 'react-router-dom'
import { FaHandHoldingMedical } from "react-icons/fa6";
import healthcareBg from '../../assets/images/healthcare-bg.jpg'

function Landing() {
  return (
    <div className='landing-page' style={{backgroundImage:`url(${healthcareBg})`}}>

      <div className='landing-content'>

          <FaHandHoldingMedical className='landing-icon' />

          <h1 className='landing-logo'>MediBridge</h1>

          <h2>Connecting You to Better Care</h2>

          <p>Find the right doctor and manage your appointments easily.</p>

          <Link to='/role-selection'><button className='btn'>Get Started</button></Link>

      </div>
        
    </div>
  )
}

export default Landing