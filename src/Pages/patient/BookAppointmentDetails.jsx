import React from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserMd,
  FaCalendarAlt,
  FaUser,
  FaMoneyBillWave,
} from "react-icons/fa";
import { createAppointmentAPI } from "../../Services/allAPI";



function AppointmentDetails() {

  const navigate = useNavigate();

  const location = useLocation();

  const {patientDetails,doctor,appointmentDate,selectedTime} = location.state || {};


  const handleConfirmAppointment = async () => {

  const appointmentData = {
    patientDetails,
    doctor,
    appointmentDate,
    appointmentTime: selectedTime,
    consultationType: "In-Person Consultation",
    consultationFee: doctor?.fee,
    status: "Pending",
    appointmentReference: `MB-${Date.now()}`
  };


  try {

    const response = await createAppointmentAPI(appointmentData);

    console.log("Appointment saved:", response.data);

    navigate("/appointment-confirmation", {
        state: {
        appointment: response.data
      }
    });

  }
  catch (error) {

    console.log("Failed to save appointment:", error);

    alert("Failed to confirm appointment. Please try again.");

  }

};






  return (
    <div className="appointment-details-page">

      {/* Back Button */}
      <button className="back-doctor-btn" onClick={() => navigate("/book-appointment")}>
        <FaArrowLeft />
        <span>Back to Book Appointment</span>
      </button>


      {/* Page Heading */}
      <div className="appointment-details-head">

        <span>MEDIBRIDGE CARE</span>

        <h1>Appointment Details</h1>

        <p>
          Review your appointment information before confirming your booking.
        </p>

      </div>


      {/* Doctor Information */}
      <div className="appointment-summary-card">

        <div className="summary-card-heading">

          <div className="summary-icon">
            <FaUserMd />
          </div>

          <div>
            <h2>Doctor Information</h2>
            <p>Details of your selected doctor.</p>
          </div>

        </div>


        <div className="summary-content">

          <div>
            <span>Doctor</span>
            <strong>{doctor?.name || "--"}</strong>
          </div>

          <div>
            <span>Specialization</span>
            <strong>{doctor?.specialization || "--"}</strong>
          </div>

          <div>
            <span>Location</span>
            <strong>{doctor?.location || "--"}</strong>
          </div>

        </div>

      </div>


      {/* Consultation Information */}
      <div className="appointment-summary-card">

        <div className="summary-card-heading">

          <div className="summary-icon">
            <FaMoneyBillWave />
          </div>

          <div>
            <h2>Consultation Information</h2>
            <p>Information about your consultation.</p>
          </div>

        </div>


        <div className="summary-content">

          <div>
            <span>Consultation Type</span>
            <strong>In-Person Consultation</strong>
          </div>

          <div>
            <span>Consultation Fee</span>
            <strong>₹{doctor?.fee || "--"}</strong>
          </div>

        </div>

      </div>


      {/* Patient Information */}
      <div className="appointment-summary-card">

        <div className="summary-card-heading">

          <div className="summary-icon">
            <FaUser />
          </div>

          <div>
            <h2>Patient Information</h2>
            <p>Patient details for this appointment.</p>
          </div>

        </div>


        <div className="summary-content">

          <div>
            <span>Full Name</span>
            <strong>{patientDetails?.fullName || "--"}</strong>
          </div>

          <div>
            <span>Age</span>
            <strong>{patientDetails?.age || "--"}</strong>
          </div>

          <div>
            <span>Gender</span>
            <strong>{patientDetails?.gender || "--"}</strong>
          </div>

          <div>
            <span>Phone Number</span>
            <strong>{patientDetails?.phone || "--"}</strong>
          </div>

          <div>
            <span>Email Address</span>
            <strong>{patientDetails?.email || "--"}</strong>
          </div>

          <div>
            <span>Address</span>
            <strong>{patientDetails?.address || "--"}</strong>
          </div>

        </div>

      </div>


      {/* Appointment Schedule */}
      <div className="appointment-summary-card">

        <div className="summary-card-heading">

          <div className="summary-icon">
            <FaCalendarAlt />
          </div>

          <div>
            <h2>Appointment Schedule</h2>
            <p>Your selected consultation date and time.</p>
          </div>

        </div>


        <div className="summary-content">

          <div>
            <span>Appointment Date</span>
            <strong>{appointmentDate || "--"}</strong>
          </div>

          <div>
            <span>Appointment Time</span>
            <strong>{selectedTime || "--"}</strong>
          </div>

        </div>

      </div>


      {/* Confirm Button */}
      <div className="appointment-confirm-container">

        <button className="confirm-appointment-btn" onClick={handleConfirmAppointment}>
          Confirm Appointment
        </button>

      </div>

    </div>
  );
}

export default AppointmentDetails;