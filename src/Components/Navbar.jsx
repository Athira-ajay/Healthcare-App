import React from 'react'
import { Link } from 'react-router-dom'
import { FaHandHoldingMedical } from 'react-icons/fa6'

function Navbar() {
  return (
    <>

        <nav className='navbar'>

              <Link to='/home' className='navbar-brand'><FaHandHoldingMedical /> MediBridge</Link>

              <div className='navbar-links'>

                  <Link to='/login' className='navbar-login'>Login</Link>

                  <Link to='/register' className='navbar-register'>Register</Link>

              </div>

        </nav>

    </>
  )
}

export default Navbar