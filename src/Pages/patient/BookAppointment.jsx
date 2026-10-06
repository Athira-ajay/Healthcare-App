import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserMd,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaArrowRight,
  FaUser,
  FaVenusMars,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaNotesMedical,
  FaClipboard,
} from "react-icons/fa";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import doctorSarah from "../../assets/images/doctor1.jpg";
import doctorRahul from "../../assets/images/doctor2.jpg";
import doctorAnanya from "../../assets/images/doctor3.jpg";
import doctorMeera from "../../assets/images/doctor4.jpg";
import doctorArjun from "../../assets/images/doctor5.jpg";
import doctorNeha from "../../assets/images/doctor6.jpg";
import doctorVivek from '../../assets/images/doctor7.jpg'
import doctorDiya from '../../assets/images/doctor8.jpg'
import doctorAdithya from '../../assets/images/doctor9.jpg'
import doctorMeeraNair from '../../assets/images/doctor10.jpg'
import doctorKevin from '../../assets/images/doctor11.jpg'
import doctorAsha from '../../assets/images/doctor12.jpg'




function BookAppointment() {

  const navigate = useNavigate();
  const location = useLocation();

  const [patientDetails, setPatientDetails] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    reason: "",
    notes: ""
  });


  const doctor = location.state?.doctor;

  const appointmentDateFromDoctor = location.state?.appointmentDate || "";

  const appointmentTimeFromDoctor = location.state?.appointmentTime || "";

  const [appointmentDate, setAppointmentDate] = useState(appointmentDateFromDoctor);

  const [selectedTime, setSelectedTime] = useState(appointmentTimeFromDoctor);

  console.log("Doctor:", doctor);
  console.log("Date received:", appointmentDateFromDoctor);
  console.log("Time received:", appointmentTimeFromDoctor);
  console.log("Selected Time:", selectedTime);


  if (!doctor) {

    return (
      <div className="doctor-not-found-page">

        <div className="doctor-not-found-card">

          <img src="https://cdni.iconscout.com/illustration/premium/thumb/doctor-in-doubt-6019949-4978172.png" alt="Doctor not available" className="doctor-not-found-image"/>

          <div className="doctor-not-found-content">

            <span className="doctor-not-found-label">
              MEDIBRIDGE CARE
            </span>

            <h2>
              Doctor information not available
            </h2>

            <p>
              We couldn't find the doctor you're looking for.
              Please return to the doctor list and try again.
            </p>

            <button className="back-doctor-btn" onClick={() => navigate("/find-doctors")}>
              <FaArrowLeft />
              <span>Back to Find Doctors</span>
            </button>

          </div>

        </div>

      </div>
    );

  }

  return (
    <div className="book-appointment-page">

      <button className="back-doctor-btn" onClick={() => navigate("/doctor-details", { state: { doctor, appointmentDate, appointmentTime: selectedTime } })}>
        <FaArrowLeft />
        <span>Back to Doctor Details</span>
      </button>


      <div className="book-page-head">

        <span className="book-page-label">
          MEDIBRIDGE CARE
        </span>

        <h1>Book an Appointment</h1>

        <p>
          Schedule your consultation with your preferred doctor.
        </p>

      </div>


      <div className="doctor-summary-card">

        <div className="doctor-summary-image">
          <img src={
            doctor.id === 1 ? doctorSarah :
            doctor.id === 2 ? doctorRahul :
            doctor.id === 3 ? doctorAnanya :
            doctor.id === 4 ? doctorMeera :
            doctor.id === 5 ? doctorArjun :
            doctor.id === 6 ? doctorNeha :
            doctor.id === 7 ? doctorVivek :
            doctor.id === 8 ? doctorDiya :
            doctor.id === 9 ? doctorAdithya :
            doctor.id === 10 ? doctorMeeraNair :
            doctor.id === 11 ? doctorKevin :
            doctorAsha
          }
            alt={doctor.name}
          />
        </div>


        <div className="doctor-summary-info">

          <p className="summary-label">
            <FaUserMd />
            <span>Selected Doctor</span>
          </p>

          <h2>{doctor.name}</h2>

          <h4>{doctor.specialization}</h4>

          <div className="doctor-summary-location">
            <FaMapMarkerAlt />
            <span>{doctor.location}</span>
          </div>

          <div className="summary-availability">
            <span className="availability-dot"></span>
            {doctor.available ? "Available Today" : "Currently Unavailable"}
          </div>

        </div>

      </div>

      <div className="appointment-info-card">

        {/* Section Heading */}
        <div className="section-heading">


          <div className="section-heading-text">

            <h2>Appointment Information</h2>

            <p>
              Review the consultation details before continuing.
            </p>

          </div>

        </div>


        {/* Information Boxes */}
        <div className="appointment-info-grid">

          {/* Consultation Type */}
          <div className="appointment-info-box">

            <div className="info-icon">
              <FaUserMd />
            </div>

            <div>

              <span>Consultation Type</span>

              <strong>
                In-Person Consultation
              </strong>

            </div>

          </div>


          {/* Consultation Fee */}
          <div className="appointment-info-box">

            <div className="info-icon">
              <FaMoneyBillWave />
            </div>

            <div>

              <span>Consultation Fee</span>

              <strong>
                ₹{doctor.fee}
              </strong>

            </div>

          </div>

        </div>

      </div>

      {/* Patient Details */}
      <div className="patient-details-card">

        <div className="patient-section-heading">

          <div className="patient-section-icon">
            <IoPersonCircle />
          </div>

          <div>
            <h2>Patient Details</h2>
            <p>Enter the details of the patient booking this appointment.</p>
          </div>

        </div>


        <div className="patient-form-grid">

          {/* Full Name */}
          <div className="patient-form-group">
            <label>Full Name <span>*</span></label>

            <div className="patient-input-wrapper">
              <FaUser />
              <input type="text" placeholder="Enter patient's full name" value={patientDetails.fullName} onChange={(e) => setPatientDetails({ ...patientDetails, fullName: e.target.value })} />
            </div>
          </div>


          {/* Age */}
          <div className="patient-form-group">
            <label>Age <span>*</span></label>

            <div className="patient-input-wrapper">
              <input type="number" placeholder="Enter age" value={patientDetails.age} onChange={(e) => setPatientDetails({ ...patientDetails, age: e.target.value })} />
            </div>
          </div>


          {/* Gender */}
          <div className="patient-form-group">
            <label>Gender <span>*</span></label>

            <div className="patient-input-wrapper">
              <FaVenusMars />

              <select value={patientDetails.gender} onChange={(e) => setPatientDetails({ ...patientDetails, gender: e.target.value })}>
                <option value="" disabled>
                  Select gender
                </option>

                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>


          {/* Phone Number */}
          <div className="patient-form-group">
            <label>Phone Number <span>*</span></label>

            <div className="patient-input-wrapper">
              <FaPhone />

              <input type="tel" placeholder="Enter phone number" value={patientDetails.phone} onChange={(e) => setPatientDetails({ ...patientDetails, phone: e.target.value })} />
            </div>
          </div>

          {/* Email Address */}
          <div className="patient-form-group">
            <label>Email Address <span>*</span></label>

            <div className="patient-input-wrapper">
              <FaEnvelope />

              <input type="email" placeholder="Enter email address" value={patientDetails.email} onChange={(e) => setPatientDetails({ ...patientDetails, email: e.target.value })} />
            </div>
          </div>


          {/* Address */}
          <div className="patient-form-group">
            <label>Address <span>*</span></label>

            <div className="patient-input-wrapper">
              <FaHome />

              <input type="text" placeholder="Enter your address" value={patientDetails.address} onChange={(e) => setPatientDetails({ ...patientDetails, address: e.target.value })} />
            </div>
          </div>


          {/* Reason for Visit */}
          <div className="patient-form-group patient-full-width">
            <label>Reason for Visit <span>*</span></label>

            <div className="patient-input-wrapper">
              <FaNotesMedical />

              <input type="text" placeholder="Briefly describe the reason for your visit" value={patientDetails.reason} onChange={(e) => setPatientDetails({ ...patientDetails, reason: e.target.value })} />
            </div>
          </div>


          {/* Additional Notes */}
          <div className="patient-form-group patient-full-width">
            <label>Additional Notes</label>

            <div className="patient-textarea-wrapper">
              <FaClipboard />

              <textarea placeholder="Add any additional information you would like the doctor to know..." rows="4" value={patientDetails.notes} onChange={(e) => setPatientDetails({ ...patientDetails, notes: e.target.value })}></textarea>
            </div>
          </div>

        </div>

      </div>

      {/* Appointment Schedule */}

      <div className="appointment-schedule-card">

        <div className="schedule-heading">

          <div className="schedule-icon">
            <FaCalendarAlt />
          </div>

          <div>
            <h2>Appointment Schedule</h2>
            <p>
              Select a convenient date and time for your consultation.
            </p>
          </div>

        </div>


        {/* Appointment Date */}

        <div className="schedule-date-section">

          <label>Appointment Date *</label>

          <div className="date-input-wrapper">

            <FaCalendarAlt />

            <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />

          </div>

        </div>


        {/* Available Time */}

        <div className="time-section">

          <div className="time-section-heading">

            <h3>Selected Time</h3>

            <span>Appointment Time</span>

          </div>


          <div className="selected-time-display">

            <FaClock />

            <div>
              <span>Selected Appointment Time</span>

              <strong>
                {selectedTime || "No time selected"}
              </strong>
            </div>

          </div>

        </div>

      </div>


      <div className="continue-booking-container">

        <button className="continue-booking-btn" onClick={() => 
          navigate("/book-appointment-details", { 
            state: { 
              patientDetails, 
              doctor, 
              appointmentDate, 
              selectedTime 
            } })}>

          <span>Continue to Appointment Details</span>
          <FaArrowRight />
        </button>

      </div>

    </div>
  );
}

export default BookAppointment;