import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaCalendarAlt, FaClock, FaUserMd } from 'react-icons/fa'
import doctorSarah from '../../assets/images/doctor1.jpg'
import { FaCheckCircle, FaNotesMedical } from 'react-icons/fa'
import { useLocation, useNavigate } from "react-router-dom";


function AppointmentDetails() {

  const location = useLocation();

  const appointmentStatus = location.state?.status || "Pending";

  return (
    <div className="appointment-details-page">

      <div className="container py-5">

        {/* Back Button */}
        <Link to="/patient-dashboard" className="back-button">
          <FaArrowLeft /> Back to Dashboard
        </Link>


        {/* Page Heading */}
        <div className="details-heading">

          <h1>Appointment Details</h1>

          <p>
            View the details of your scheduled appointment.
          </p>

        </div>


        {/* Appointment Card */}
        <div className="appointment-details-card">


          {/* Doctor Section */}
          <div className="doctor-details">

            <img src={doctorSarah} alt="Dr. Sarah Thomas"/>

            <div>

              <h2>Dr. Sarah Thomas</h2>

              <p>
                Cardiologist
              </p>

            </div>

          </div>


          <hr />


          {/* Appointment Information */}
          <div className="appointment-info">


            {/* Date */}
            <div className="info-item">

              <FaCalendarAlt />

              <div>

                <span>Date</span>

                <strong>28 September 2026</strong>

              </div>

            </div>


            {/* Time */}
            <div className="info-item">

              <FaClock />

              <div>

                <span>Time</span>

                <strong>10:30 AM</strong>

              </div>

            </div>


            {/* Appointment Type */}
            <div className="info-item">

              <FaUserMd />

              <div>

                <span>Appointment Type</span>

                <strong>In-Person Consultation</strong>

              </div>

            </div>


          </div>


          {/* Appointment Status */}
          <div className="appointment-status-section">

            <div className="status-title">

              <span>Appointment Status</span>

              <div className={`appointment-status-badge ${appointmentStatus.toLowerCase()}`}>
                <FaCheckCircle />

                {appointmentStatus}

              </div>

            </div>

          </div>


          {/* Reason for Visit */}
          <div className="reason-section">

            <div className="reason-heading">

              <FaNotesMedical />

              <h3>Reason for Visit</h3>

            </div>

            <p>
              Regular cardiac consultation and follow-up.
              Discuss recent health updates and continue the
              recommended treatment plan.
            </p>

          </div>


        </div>

      </div>

    </div>
  )
}

export default AppointmentDetails