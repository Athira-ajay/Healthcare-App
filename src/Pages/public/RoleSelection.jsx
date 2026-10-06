import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserShield, FaArrowRight } from "react-icons/fa";


function RoleSelection() {

  const navigate = useNavigate();

  return (
    <div className="role-selection-page">

      <div className="role-selection-container">

        {/* Heading */}

        <div className="role-selection-heading">

          <span>MEDIBRIDGE CARE</span>

          <h1>Welcome to MediBridge</h1>

          <p>
            Choose how you would like to continue..
          </p>

        </div>


        {/* Role Cards */}

        <div className="role-cards">


          {/* Patient */}

          <div className="role-card patient-role-card" onClick={() => navigate("/home")}>

            <div className="role-icon">

              <FaUser />

            </div>


            <div className="role-content">

              <h2>Patient</h2>

              <p>
                Find doctors, book appointments, and
                manage your healthcare easily.
              </p>

            </div>


            <button className="role-continue-btn">

              Continue as Patient

              <FaArrowRight />

            </button>

          </div>



          {/* Admin */}

          <div className="role-card admin-role-card" onClick={() => navigate("/admin-login")}>

            <div className="role-icon">

              <FaUserShield />

            </div>


            <div className="role-content">

              <h2>Admin</h2>

              <p>
                Manage doctors, appointments, patients,
                and the MediBridge system.
              </p>

            </div>


            <button className="role-continue-btn">

              Continue as Admin

              <FaArrowRight />

            </button>

          </div>


        </div>

      </div>

    </div>
  );
}

export default RoleSelection;