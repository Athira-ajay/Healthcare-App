import React, { useEffect, useState } from 'react'
import { SlCalender } from "react-icons/sl";
import { FaRegHourglassHalf } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { FaHandHoldingMedical } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import WelcomeGirl from '../../assets/images/welcome.jpg'
import doctorSarah from '../../assets/images/doctor1.jpg'
import { FaUserDoctor } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import doctorRahul from '../../assets/images/doctor2.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { getAppointmentsAPI } from "../../Services/allAPI";
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


function PatientDashboard() {

  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);

  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);


  // check logged-in patient
  useEffect(() => {

    const storedPatient = localStorage.getItem("loggedInUser");

    if (storedPatient) {

      setPatient(JSON.parse(storedPatient));

    }
    else {
      navigate("/login")
    }

  }, [navigate]);


  // Get logged-in patient's appointments
  useEffect(() => {

    const getAppointments = async () => {

      try {

        const response = await getAppointmentsAPI();

        console.log("Appointments received:", response.data);

        const storedPatient = localStorage.getItem("loggedInUser");

        if (storedPatient) {

          const loggedInPatient = JSON.parse(storedPatient);

          const patientAppointments = response.data.filter(

            (appointment) => appointment.patientDetails?.email === loggedInPatient.email);

          setAppointments(patientAppointments);

        }

      }
      catch (error) {

        console.log("Failed to fetch appointments:", error);

      }
      finally {

        setLoadingAppointments(false);

      }

    };

    getAppointments();

  }, []);


  // statistics
  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "Pending").length;

  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "Confirmed").length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed").length;



  const getDoctorImage = (doctorId) => {

    switch (doctorId) {

      case 1:
        return doctorSarah;

      case 2:
        return doctorRahul;

      case 3:
        return doctorAnanya;

      case 4:
        return doctorMeera;

      case 5:
        return doctorArjun;

      case 6:
        return doctorNeha;

      case 7:
        return doctorVivek;

      case 8:
        return doctorDiya;

      case 9:
        return doctorAdithya;

      case 10:
        return doctorMeeraNair;

      case 11:
        return doctorKevin;

      case 12:
        return doctorAsha;

      default:
        return doctorSarah;

    }

  };


  const upcomingAppointments = appointments.filter((appointment) => 
    appointment.status !== "Completed").filter((appointment, index, self) =>
      index === self.findIndex((item) => item.id === appointment.id)
  );

  const formatAppointmentDate = (date) => {

    if (!date) return "--";

    const dateObject = new Date(date);

    return dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

  };


  // logout
  const handleLogout = () => {

    localStorage.removeItem("loggedInUser");

    alert("Are you sure you want to logout?")

    navigate("/login");

  };



  return (
    <div className="patient-dashboard">

      {/* Navbar */}
      <nav className="patient-navbar">

        <div className="patient-logo">
          <FaHandHoldingMedical />
          <span>MediBridge</span>
        </div>

        <div className="patient-nav-right">

          <div className="patient-user">
            <FaCircleUser />
            <span>{patient?.name}</span>
          </div>

          <button className="logout-btn" onClick={handleLogout}>Logout</button>

        </div>

      </nav>


      {/* dashboard content */}
      <main className="dashboard-content">


        {/* greeting */}
        <section className="welcome-banner">

          <div className="welcome-text">

            <span className="welcome-small">Patient Portal</span>

            <h1>Welcome, {patient?.name} !</h1>

            <p>
              Manage your appointments, find trusted doctors,
              and <br></br>stay on top of your healthcare journey.
            </p>

          </div>


          <div className="welcome-icon">
            <img src={WelcomeGirl} alt='welcome' />
          </div>

        </section>



        {/* statistics */}
        <section className="dashboard-section statistics-section">

          <div className="section-title">

            <div>
              <h2>Your Appointment Overview</h2>

              <p>
                Keep track of your appointments and stay updated on your healthcare journey.
              </p>
            </div>

          </div>


          <div className="dashboard-stats">

            <div className="stat-card">

              <div className="stat-icon total-icon">
                <SlCalender />
              </div>

              <div>
                <span>Total Appointments</span>
                <h2>{loadingAppointments ? "..." : totalAppointments}</h2>
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon pending-icon">
                <FaRegHourglassHalf />
              </div>

              <div>
                <span>Pending</span>
                <h2>{loadingAppointments ? "..." : pendingAppointments}</h2>
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon confirmed-icon">
                <FaCircleCheck />
              </div>

              <div>
                <span>Confirmed</span>
                <h2>{loadingAppointments ? "..." : confirmedAppointments}</h2>
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon completed-icon">
                <FaClipboardList />
              </div>

              <div>
                <span>Completed</span>
                <h2>{loadingAppointments ? "..." : completedAppointments}</h2>
              </div>

            </div>

          </div>

        </section>



        {/* Quick Actions */}
        <section className="dashboard-section">

          <div className="section-title">

            <div>
              <h2>Quick Actions</h2>
              <p>Manage your healthcare with ease.</p>
            </div>

          </div>


          <div className="quick-actions">


            {/* Find and Book a Doctor */}
            <Link to="/find-doctors" className="action-card">

              <div className="action-icon">
                <FaUserDoctor />
              </div>

              <div className="action-info">

                <h3>Find & Book a Doctor</h3>

                <p>
                  Explore doctors, check availability,
                  and book an appointment easily.
                </p>

              </div>

            </Link>


            {/* My Appointments */}
            <Link to="/my-appointments" className="action-card">

              <div className="action-icon">
                <FaClipboardList />
              </div>

              <div className="action-info">

                <h3>My Appointments</h3>

                <p>
                  View and manage your upcoming
                  and previous appointments.
                </p>

              </div>

            </Link>


            {/* My Profile */}
            <div className="action-card" onClick={() => navigate("/my-profile")}>

              <div className="action-icon">
                <FaCircleUser />
              </div>

              <div className="action-info">

                <h3>My Profile</h3>

                <p>
                  View and manage your personal
                  information.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* Upcoming appointments */}
        <section className="dashboard-section upcoming-section">

          <div className="section-title">

            <div>
              <h2>Upcoming Appointments</h2>

              <p>
                Your next scheduled visits.
              </p>
            </div>

          </div>


          {loadingAppointments ? (

            <div className="text-center py-5">

              <h4>Loading appointments...</h4>

            </div>

          ) : upcomingAppointments.length === 0 ? (

            <div className="text-center py-5 text-secondary">

              <FaCalendarCheck size={40} />

              <h4 className="mt-3">
                No upcoming appointments
              </h4>

              <p>
                Book an appointment with a doctor to see it here.
              </p>

            </div>

          ) : (

            upcomingAppointments.map((appointment) => (

              <div className="appointment-card" key={appointment.id}>

                {/* Doctor Information */}
                <div className="doctor-info">

                  <div className="doctor-avatar">

                    <img src={getDoctorImage(appointment.doctor?.id)} alt={appointment.doctor?.name || "Doctor"}/>

                  </div>


                  <div>

                    <h3>
                      {appointment.doctor?.name || "--"}
                    </h3>

                    <p>
                      {appointment.doctor?.specialization || "--"}
                    </p>

                  </div>

                </div>


                {/* Appointment Date */}

                <div className="appointment-detail">

                  <FaCalendarDays />

                  <div>

                    <span>Date</span>

                    <strong>
                      {formatAppointmentDate(appointment.appointmentDate)}
                    </strong>

                  </div>

                </div>


                {/* Appointment Time */}

                <div className="appointment-detail">

                  <FaClock />

                  <div>

                    <span>Time</span>

                    <strong>
                      {appointment.appointmentTime || "--"}
                    </strong>

                  </div>

                </div>


                {/* Status */}

                <div
                  className={`appointment-status ${appointment.status === "Confirmed" ? "confirmed-status" : appointment.status === "Cancelled" ? "cancelled-status" : "pending-status"}`}>

                  {appointment.status || "Pending"}

                </div>

              </div>

            ))

          )}

        </section>

      </main>

    </div>
  )
}

export default PatientDashboard