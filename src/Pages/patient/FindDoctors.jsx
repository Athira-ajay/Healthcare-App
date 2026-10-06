import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaArrowLeft,
  FaSearch,
  FaStethoscope,
  FaMapMarkerAlt,
  FaCalendarCheck,
  FaUserMd,
  FaMoneyBillWave
} from 'react-icons/fa'

import doctorSarah from '../../assets/images/doctor1.jpg'
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

import { getDoctorsAPI } from '../../Services/allAPI'


function FindDoctors() {

  const navigate = useNavigate()

  const [doctors, setDoctors] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([])

  const [specialization, setSpecialization] = useState("")
  const [locationFilter, setLocationFilter] = useState("")

  // Modal state
  const [selectedDoctor, setSelectedDoctor] = useState(null)


  // Doctor images
  const getDoctorImage = (doctorId) => {

    switch (doctorId) {

      case 1:
        return doctorSarah

      case 2:
        return doctorRahul

      case 3:
        return doctorAnanya

      case 4:
        return doctorMeera

      case 5:
        return doctorArjun

      case 6:
        return doctorNeha

      case 7:
        return doctorVivek

      case 8:
        return doctorDiya

      case 9:
        return doctorAdithya

      case 10:
        return doctorMeeraNair

      case 11:
        return doctorKevin

      case 12:
        return doctorAsha

      default:
        return doctorSarah

    }
  }


  // Get doctors from db.json
  useEffect(() => {

    getDoctors()

  }, [])


  const getDoctors = async () => {

    try {

      const response = await getDoctorsAPI()

      console.log("Doctors received:", response.data)

      setDoctors(response.data)
      setFilteredDoctors(response.data)

    }
    catch (error) {

      console.log("Failed to fetch doctors:", error)

    }

  }


  // Search doctors
  const handleSearch = () => {

    const filtered = doctors.filter((doctor) => {

      const specializationMatch = specialization === "" || doctor.specialization === specialization

      const locationMatch = locationFilter === "" || doctor.location.includes(locationFilter)

      return (specializationMatch && locationMatch)

    })

    setFilteredDoctors(filtered)

  }


  // Clear search
  const handleClear = () => {

    setSpecialization("")
    setLocationFilter("")

    setFilteredDoctors(doctors)

  }


  // Open doctor modal
  const openDoctorModal = (doctor) => {

    setSelectedDoctor(doctor)

  }


  // Close doctor modal
  const closeDoctorModal = () => {

    setSelectedDoctor(null)

  }


  // Close modal using Escape key
  useEffect(() => {

    const handleEscape = (event) => {

      if (event.key === "Escape") {
        closeDoctorModal()
      }

    }

    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }

  }, [])


  return (

    <div className="find-doctors-page">

      <div className="container py-5">


        {/* Back Button */}
        <Link to="/patient-dashboard" className="find-doctors-back">

          <FaArrowLeft />
          Back to Dashboard

        </Link>


        {/* Page Heading */}
        <div className="find-doctors-heading">

          <span className="page-label">
            MEDIBRIDGE CARE
          </span>

          <h1>Find a Doctor</h1>

          <p>
            Find trusted healthcare professionals and choose
            the right doctor for your needs.
          </p>

        </div>


        {/* Search Section */}
        <div className="doctor-search-box">

          <div className="search-heading">

            <div className="search-icon">

              <FaStethoscope />

            </div>

            <div>

              <h2>
                Find the Right Doctor
              </h2>

              <p>
                Search by doctor name, specialization, or location.
              </p>

            </div>

          </div>


          {/* Search Form */}
          <div className="doctor-search-form">


            {/* Specialization */}
            <div className="search-field">

              <label>Specialization</label>

              <div className="input-wrapper">

                <FaStethoscope />

                <select value={specialization} onChange={(e) => setSpecialization(e.target.value)}>

                  <option value="">All Specializations</option>

                  <option>Cardiologist</option>
                  <option>Dermatologist</option>
                  <option>Pediatrician</option>
                  <option>Neurologist</option>
                  <option>Orthopedic</option>
                  <option>Gynecologist</option>
                  <option>General Physician</option>
                  <option>ENT Specialist</option>
                  <option>Psychiatrist</option>
                  <option>Ophthalmologist</option>

                </select>

              </div>

            </div>


            {/* Location */}
            <div className="search-field">

              <label>Location</label>

              <div className="input-wrapper">

                <FaMapMarkerAlt />

                <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>

                  <option value="">All Locations</option>

                  <option>Ernakulam</option>

                  <option>Thiruvananthapuram</option>

                  <option>Kozhikode</option>

                </select>

              </div>

            </div>


            {/* Search Button */}
            <button className="doctor-search-button" onClick={handleSearch}>

              <FaSearch />

              Search

            </button>

          {/* Clear Button */}
          <button className="clear-search-btn" onClick={handleClear}>
            Clear Filters
          </button>

        </div>

        </div>


        {/* Availability Info */}
        <div className="availability-info">

          <div className="availability-icon">

            <FaCalendarCheck />

          </div>

          <div>

            <h3>
              Looking for an available doctor?
            </h3>

            <p>
              Explore our healthcare professionals and find
              appointments that suit your schedule.
            </p>

          </div>

        </div>


        {/* Doctors Heading */}
        <div className="doctors-list-heading">

          <div>

            <h2>
              Our Doctors
            </h2>

            <p>
              Browse our trusted healthcare professionals.
            </p>

          </div>

          <span className="doctor-count">

            {filteredDoctors.length} Doctors

          </span>

        </div>


        {/* Doctor Cards */}
        <div className="doctor-list">

          {filteredDoctors.length > 0 ? (

            filteredDoctors.map((doctor) => (

              <div className={`doctor-card ${!doctor.available ? "doctor-card-unavailable" : ""}`} key={doctor.id}>


                {/* Doctor Image */}
                <div className="doctor-image">

                  <img src={getDoctorImage(doctor.id)} alt={doctor.name}/>

                </div>


                {/* Doctor Information */}
                <div className="doctor-info">

                  <h3>
                    {doctor.name}
                  </h3>


                  <p className="doctor-specialization">

                    <FaUserMd />

                    {doctor.specialization}

                  </p>


                  {/* Availability */}
                  <div className={doctor.available ? "doctor-availability" : "doctor-availability unavailable"}>

                    <span></span>

                    {doctor.available ? "Available Today" : "Currently Unavailable"}

                  </div>


                  {/* View Profile */}
                  <button className="view-profile-btn" onClick={() => openDoctorModal(doctor)}>

                    View Profile

                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="no-doctors">

              <FaUserMd />

              <h3>
                No doctors found
              </h3>

              <p>
                Try changing your search or filter options.
              </p>

              <button onClick={handleClear}>
                Clear Filters
              </button>

            </div>

          )}

        </div>

      </div>

      {selectedDoctor && (

        <div className="doctor-view-overlay" onClick={closeDoctorModal}>

          <div className="doctor-view" onClick={(e) => e.stopPropagation()}>


            {/* Modal Header */}
            <div className="doctor-view-header">

              <div className="doctor-view-image">

                <img src={getDoctorImage(selectedDoctor.id)} alt={selectedDoctor.name}/>

              </div>

              <div>

                <h2>
                  {selectedDoctor.name}
                </h2>

                <p>
                  <FaUserMd />

                  {selectedDoctor.specialization}

                </p>

              </div>

            </div>


            {/* Availability */}
            <div className={selectedDoctor.available ? "modal-availability available" : "modal-availability unavailable"}>

              <span></span>

              {selectedDoctor.available ? "Available Today" : "Currently Unavailable"}

            </div>


            {/* Doctor Details */}
            <div className="doctor-view-details">

              {/* Location */}
              <div className="modal-view-detail-card">

                <div className="modal-view-detail-icon">

                  <FaMapMarkerAlt />

                </div>

                <div>

                  <span>
                    Location
                  </span>

                  <strong>
                    {selectedDoctor.location}
                  </strong>

                </div>

              </div>


              {/* Fee */}
              <div className="modal-view-detail-card">

                <div className="modal-view-detail-icon">

                  <FaMoneyBillWave />

                </div>

                <div>

                  <span>
                    Consultation Fee
                  </span>

                  <strong>
                    ₹{selectedDoctor.fee}
                  </strong>

                </div>

              </div>


              {/* Availability */}
              <div className="modal-view-detail-card">

                <div className="modal-view-detail-icon">

                  <FaCalendarCheck />

                </div>

                <div>

                  <span>
                    Appointment Status
                  </span>

                  <strong>

                    {selectedDoctor.available ? "Appointments Available" : "Appointments Unavailable"}

                  </strong>

                </div>

              </div>

            </div>


            {/* Modal Description */}
            <div className="doctor-view-description">

              <h3>
                About the Doctor
              </h3>

              <p>

                {selectedDoctor.name} is a healthcare professional specializing in{" "} {selectedDoctor.specialization}.
                Consultations are available at{" "} {selectedDoctor.location}.

              </p>

            </div>


            {/* Modal Actions */}
            <div className="doctor-view-actions">

              <button className="view-secondary-btn" onClick={closeDoctorModal}>

                Close

              </button>


              {selectedDoctor.available && (

                <button className="view-book-btn" onClick={() => {

                    closeDoctorModal()

                    navigate("/doctor-details",
                      {
                        state: {
                        doctor: selectedDoctor
                        }
                      }
                    )

                  }}
                >

                  <FaCalendarCheck />

                  Book Appointment

                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </div>

  )

}

export default FindDoctors