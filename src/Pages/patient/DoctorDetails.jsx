import React, { useState } from 'react'
import { FaArrowLeft, FaUserMd, FaMapMarkerAlt } from 'react-icons/fa'
import { FiBriefcase } from 'react-icons/fi'
import { useNavigate, useLocation } from 'react-router-dom'
import doctorSarah from '../../assets/images/doctor1.jpg'
import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import doctorRahul from '../../assets/images/doctor2.jpg'
import doctorAnanya from '../../assets/images/doctor3.jpg'
import doctorMeera from '../../assets/images/doctor4.jpg'
import doctorArjun from '../../assets/images/doctor5.jpg'
import doctorNeha from '../../assets/images/doctor6.jpg'
import doctorVivek from '../../assets/images/doctor7.jpg'
import doctorDiya from '../../assets/images/doctor8.jpg'
import doctorAdithya from '../../assets/images/doctor9.jpg'
import doctorMeeraNair from '../../assets/images/doctor10.jpg'
import doctorKevin from '../../assets/images/doctor11.jpg'
import doctorAsha from '../../assets/images/doctor12.jpg'




function DoctorDetails() {

    const navigate = useNavigate()

    const location = useLocation();

    const doctor = location.state?.doctor;

    const [appointmentDate, setAppointmentDate] = useState(location.state?.appointmentDate || "");

    const [appointmentTime, setAppointmentTime] = useState(location.state?.appointmentTime || "");


    if (!doctor) {

        return (
            <div className="doctor-not-found-page">

                <div className="doctor-not-found-card">

                    <img src="https://png.pngtree.com/png-clipart/20210912/original/pngtree-doctor-vector-flat-png-image_6748769.jpg" alt="Doctor not available" className="doctor-not-found-image"/>

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
        <div className="doctor-details-page">

            {/* Back Button */}
            <button className="back-doctors-btn" onClick={() => navigate('/find-doctors')}>
                <FaArrowLeft />
                Back to Find Doctors
            </button>


            {/* Page Heading */}
            <div className="doctor-details-heading">

                <span>MEDIBRIDGE CARE</span>

                <h1>Doctor Details</h1>

                <p>
                    Learn more about your doctor and their healthcare expertise.
                </p>

            </div>


            {/* Doctor Profile Card */}
            <div className="doctor-profile-card">

                {/* Doctor Image */}
                <div className="doctor-profile-image">

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


                {/* Doctor Information */}
                <div className="doctor-profile-info">

                    <h2>{doctor.name}</h2>

                    <p className="doctor-profile-specialization">
                        <FaUserMd />
                        {doctor.specialization}
                    </p>


                    {/* Doctor Meta Information */}
                    <div className="doctor-profile-meta">

                        <div className="doctor-meta-item">
                            <FiBriefcase />
                            <div>
                                <span>Experience</span>
                                <strong>10+ Years</strong>
                            </div>
                        </div>


                        <div className="doctor-meta-item">
                            <FaMapMarkerAlt />
                            <div>
                                <span>Location</span>
                                <strong>{doctor.location}</strong>
                            </div>
                        </div>

                    </div>


                    {/* Availability */}
                    <div className="doctor-profile-availability">
                        <span></span>
                        {doctor.available ? "Available Today" : "Currently Unavailable"}
                    </div>

                </div>

            </div>


            {/* About Doctor */}
            <div className="doctor-about-section">

                <div className="section-heading">
                    <h2>About {doctor.name}</h2>
                    <p>Get to know your doctor and their area of expertise.</p>
                </div>

                <p className="doctor-about-text text-center mx-auto">
                    {doctor.name} is a healthcare professional specializing in
                    {` ${doctor.specialization}`}. The doctor is available for
                    consultations in {doctor.location}.
                </p>

            </div>


            {/* Consultation Information */}
            <div className="consultation-section">

                <div className="section-heading">
                    <h2>Consultation Information</h2>
                    <p>Important information about your consultation.</p>
                </div>

                <div className="consultation-grid">

                    <div className="consultation-item">
                        <span>Consultation Type</span>
                        <strong>In-Person Consultation</strong>
                    </div>

                    <div className="consultation-item">
                        <span>Consultation Fee</span>
                        <strong>₹{doctor.fee}</strong>
                    </div>

                    <div className="consultation-item">
                        <span>Duration</span>
                        <strong>30 Minutes</strong>
                    </div>

                </div>

            </div>

            {/* Book Appointment Section */}
            <div className="book-appointment-section">

                <div className="book-appointment-header">
                    <h2>Book an Appointment</h2>
                    <p>
                        Schedule your consultation with {doctor.name} at a convenient time.
                    </p>
                </div>

                <div className="booking-form">

                    {/* Date */}
                    <div className="booking-field">
                        <label>Appointment Date</label>

                        <div className="booking-input">
                            <FaCalendarAlt />
                            <input type="date" value={appointmentDate || ""} onChange={(e) => setAppointmentDate(e.target.value)} />
                        </div>
                    </div>

                    {/* Time */}
                    <div className="booking-field">
                        <label>Preferred Time</label>

                        <div className="booking-input">
                            <FaClock />
                            <select value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} >
                                <option value="" disabled>
                                    Select Time
                                </option>
                                <option>10:00 AM</option>
                                <option>10:30 AM</option>
                                <option>11:00 AM</option>
                                <option>11:30 AM</option>
                                <option>12:00 PM</option>
                                <option>12:30 PM</option>

                                <option>02:00 PM</option>
                                <option>02:30 PM</option>
                                <option>03:00 PM</option>
                                <option>03:30 PM</option>
                                <option>04:00 PM</option>
                                <option>04:30 PM</option>

                                <option>05:00 PM</option>
                                <option>05:30 PM</option>
                                <option>06:00 PM</option>
                                <option>06:30 PM</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div className="booking-action">
                    <button className="book-appointment-btn" onClick={() => {

                        if (!appointmentDate) {
                            alert("Please select an appointment date");
                            return;
                        }

                        if (!appointmentTime) {
                            alert("Please select an appointment time");
                            return;
                        }

                        navigate("/book-appointment",
                            {
                                state: {
                                    doctor: doctor,
                                    appointmentDate: appointmentDate,
                                    appointmentTime: appointmentTime
                                }
                            })
                    }}
                    >
                        <FaCalendarCheck />
                        Book Appointment
                    </button>
                </div>

            </div>

        </div>
    )
}

export default DoctorDetails