import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarCheck,
  FaClock,
  FaUserMd,
} from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { getAppointmentsAPI } from "../../Services/allAPI";
import { cancelAppointmentAPI } from "../../Services/allAPI";
import doctorSarah from "../../assets/images/doctor1.jpg";
import doctorRahul from "../../assets/images/doctor2.jpg";
import doctorAnanya from "../../assets/images/doctor3.jpg";
import doctorMeera from "../../assets/images/doctor4.jpg";
import doctorArjun from "../../assets/images/doctor5.jpg";
import doctorNeha from "../../assets/images/doctor6.jpg";
import doctorVivek from "../../assets/images/doctor7.jpg";
import doctorDiya from "../../assets/images/doctor8.jpg";
import doctorAdithya from "../../assets/images/doctor9.jpg";
import doctorMeeraNair from "../../assets/images/doctor10.jpg";
import doctorKevin from "../../assets/images/doctor11.jpg";
import doctorAsha from "../../assets/images/doctor12.jpg";



function MyAppointments() {

  const navigate = useNavigate();

  //to show the image of each doctor
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

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get appointments from db.json
  useEffect(() => {

    getAppointments();

  }, []);


  const getAppointments = async () => {

    try {

      const response = await getAppointmentsAPI();

      console.log("Appointments received:", response.data);

      const storedPatient = localStorage.getItem("loggedInUser");

      if (storedPatient) {

        const loggedInPatient = JSON.parse(storedPatient);

        const patientAppointments = response.data.filter(
          (appointment) =>
            appointment.patientDetails?.email === loggedInPatient.email
        );

        console.log("Logged-in patient's appointments:",patientAppointments);

        setAppointments(patientAppointments);

      }
      else {

        setAppointments([]);

      }

    }
    catch (error) {

      console.log("Failed to fetch appointments:", error);

    }
    finally {

      setLoading(false);

    }

  };



  // cancelappointment
  const handleCancelAppointment = async (appointmentId) => {

    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");

    if (!confirmCancel) {
      return;
    }

    try {

      await cancelAppointmentAPI(appointmentId);

      alert("Appointment cancelled successfully.");

      // Refresh appointments
      getAppointments();

    } 
    catch (error) {

      console.log("Failed to cancel appointment:", error);

      alert("Failed to cancel appointment. Please try again.");

    }

  };


  // Separate appointments based on status

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "Pending");

  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "Confirmed");

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed");

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "Cancelled");


  // Statistics

  const totalAppointments = appointments.length;

  const pendingCount = pendingAppointments.length;

  const confirmedCount = confirmedAppointments.length;

  const completedCount = completedAppointments.length;

  const cancelledCount = cancelledAppointments.length;


  // Format date
  const formatDate = (date) => {

    if (!date) return "--";

    const dateObject = new Date(date);

    return dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

  };


  return (

    <div className="my-appointments-page">


      {/* Back Button */}
      <button className="appointments-back-btn" onClick={() => navigate("/patient-dashboard")}>

        <FaArrowLeft />

        <span>Back to Dashboard</span>

      </button>


      {/* Page Heading */}
      <div className="appointments-page-headings">

        <span>MEDIBRIDGE CARE</span>

        <h1>My Appointments</h1>

        <p>
          Manage your upcoming and previous consultations.
        </p>

      </div>


      {/* Appointment Statistics */}
      <div className="appointment-stats">


        {/* Total */}
        <div className="appointment-stat-card">

          <div className="appointment-stat-icon">

            <FaCalendarCheck />

          </div>

          <div>

            <span>Total Appointments</span>

            <strong>
              {totalAppointments}
            </strong>

          </div>

        </div>


        {/* Upcoming */}
        <div className="appointment-stat-card">

          <div className="appointment-stat-icon upcoming">

            <FaClock />

          </div>

          <div>

            <span>Pending</span>

            <strong>
              {pendingCount}
            </strong>

          </div>

        </div>


        {/* Confirmed */}

        <div className="appointment-stat-card">

          <div className="appointment-stat-icon confirmed">

            <FaCalendarCheck />

          </div>

          <div>

            <span>Confirmed</span>

            <strong>
              {confirmedCount}
            </strong>

          </div>

        </div>


        {/* Completed */}

        <div className="appointment-stat-card">

          <div className="appointment-stat-icon completed">

            <FaUserMd />

          </div>

          <div>

            <span>Completed</span>

            <strong>
              {completedCount}
            </strong>

          </div>

        </div>

        {/* cancel */}
        <div className="appointment-stat-card">

          <div className="appointment-stat-icon cancelled">

            <MdCancel />

          </div>

          <div>

            <span>Cancelled</span>

            <strong>
              {cancelledCount}
            </strong>

          </div>

        </div>

      </div>


      {/* Loading */}

      {loading && (

        <div className="text-center py-5">

          <h4>Loading appointments...</h4>

        </div>

      )}


      {/* Upcoming Appointments */}

      {/* Pending Appointments */}

      {!loading && (

        <section className="appointments-section">

          <div className="appointments-section-heading">

            <div>

              <h2>Pending Appointments</h2>

              <p>
                Appointments waiting for admin confirmation.
              </p>

            </div>

            <span className="appointment-count">
              {pendingAppointments.length} Appointments
            </span>

          </div>


          {pendingAppointments.length === 0 ? (

            <div className="text-center py-5">

              <FaCalendarCheck size={40} />

              <h4 className="mt-3">
                No pending appointments
              </h4>

              <p>
                New appointments will appear here until they are reviewed.
              </p>

            </div>

          ) : (

            pendingAppointments.map((appointment) => (

              <div className="appointment-card" key={appointment.id}>

                {/* Doctor */}

                <div className="appointment-doctor">

                  <div className="appointment-doctor-image">

                    <img
                      src={getDoctorImage(appointment.doctor?.id)}
                      alt={appointment.doctor?.name || "Doctor"}
                    />

                  </div>

                  <div className="appointment-doctor-info">

                    <h3>
                      {appointment.doctor?.name || "--"}
                    </h3>

                    <p>
                      {appointment.doctor?.specialization || "--"}
                    </p>

                  </div>

                </div>


                {/* Status */}

                <span className="appointment-status pending-status">

                  Pending

                </span>


                {/* Appointment Details */}

                <div className="appointment-details-row">

                  <div>

                    <span>Date</span>

                    <strong>
                      {formatDate(appointment.appointmentDate)}
                    </strong>

                  </div>


                  <div>

                    <span>Time</span>

                    <strong>
                      {appointment.appointmentTime || "--"}
                    </strong>

                  </div>


                  <div>

                    <span>Location</span>

                    <strong>
                      {appointment.doctor?.location || "--"}
                    </strong>

                  </div>


                  <div>

                    <span>Fee</span>

                    <strong>
                      ₹{appointment.consultationFee || 0}
                    </strong>

                  </div>

                </div>


                {/* Actions */}

                <div className="appointment-card-actions">

                  <button className="appointment-view-btn" onClick={() =>
                      navigate("/book-appointment-details", {
                        state: {
                          appointmentId: appointment.id,
                          patientDetails: appointment.patientDetails,
                          doctor: appointment.doctor,
                          appointmentDate: appointment.appointmentDate,
                          selectedTime: appointment.appointmentTime,
                          status: appointment.status,
                          consultationType: appointment.consultationType,
                          consultationFee: appointment.consultationFee,
                        },
                      })
                    }
                  >

                    View Details

                  </button>

                  <button className="appointment-cancel-btn" onClick={() => handleCancelAppointment(appointment.id)}>

                    Cancel Appointment

                  </button>

                </div>

              </div>

            ))

          )}

        </section>

      )}


      {/* Confirmed Appointments */}

      {!loading && (

        <section className="appointments-section">

          <div className="appointments-section-heading">

            <div>

              <h2>Confirmed Appointments</h2>

              <p>
                Appointments approved by the admin.
              </p>

            </div>

            <span className="appointment-count">
              {confirmedAppointments.length} Appointments
            </span>

          </div>

          {confirmedAppointments.length === 0 ? (

            <div className="text-center py-5">

              <FaCalendarCheck size={40} />

              <h4 className="mt-3">
                No confirmed appointments
              </h4>

              <p>
                New appointments will appear here until they are reviewed.
              </p>

            </div>

          ) : (

          confirmedAppointments.map((appointment) => (

            <div className="appointment-card" key={appointment.id}>

              <div className="appointment-doctor">

                <div className="appointment-doctor-image">

                  <img
                    src={getDoctorImage(appointment.doctor?.id)}
                    alt={appointment.doctor?.name || "Doctor"}
                  />

                </div>

                <div className="appointment-doctor-info">

                  <h3>
                    {appointment.doctor?.name || "--"}
                  </h3>

                  <p>
                    {appointment.doctor?.specialization || "--"}
                  </p>

                </div>

              </div>


              <span className="appointment-status confirmed-status">

                Confirmed

              </span>


              <div className="appointment-details-row">

                <div>

                  <span>Date</span>

                  <strong>
                    {formatDate(appointment.appointmentDate)}
                  </strong>

                </div>


                <div>

                  <span>Time</span>

                  <strong>
                    {appointment.appointmentTime || "--"}
                  </strong>

                </div>


                <div>

                  <span>Location</span>

                  <strong>
                    {appointment.doctor?.location || "--"}
                  </strong>

                </div>


                <div>

                  <span>Fee</span>

                  <strong>
                    ₹{appointment.consultationFee || 0}
                  </strong>

                </div>

              </div>


              <div className="appointment-card-actions">

                <button className="appointment-view-btn" onClick={() =>
                    navigate("/book-appointment-details", {
                      state: {
                        patientDetails: appointment.patientDetails,
                        doctor: appointment.doctor,
                        appointmentDate: appointment.appointmentDate,
                        selectedTime: appointment.appointmentTime,
                      },
                    })
                  }
                >

                  View Details

                </button>

                <button
                  className="appointment-cancel-btn"
                  onClick={() =>
                    handleCancelAppointment(appointment.id)
                  }
                >

                  Cancel Appointment

                </button>

              </div>

            </div>

          ))

        )}

        </section>

      )}


      {/* completed Appointments */}

      {!loading && (

        <section className="appointments-section previous-section">

          <div className="appointments-section-heading">

            <div>

              <h2>Completed Appointments</h2>

              <p>
                Your completed consultations.
              </p>

            </div>

            <span className="appointment-count">
              {completedAppointments.length} Appointments
            </span>

          </div>


          {completedAppointments.length === 0 ? (

            <div className="text-center py-5">

              <FaCalendarCheck size={40} />

              <h4 className="mt-3">
                No completed appointments
              </h4>

              <p>
                Completed consultations will appear here.
              </p>

            </div>

          ) : (

            completedAppointments.map((appointment) => (

              <div className="appointment-card" key={appointment.id}>

                {/* Doctor Information */}

                <div className="appointment-doctor">

                  <div className="appointment-doctor-image">

                    <img
                      src={getDoctorImage(appointment.doctor?.id)}
                      alt={appointment.doctor?.name || "Doctor"}
                    />

                  </div>

                  <div className="appointment-doctor-info">

                    <h3>
                      {appointment.doctor?.name || "--"}
                    </h3>

                    <p>
                      {appointment.doctor?.specialization || "--"}
                    </p>

                  </div>

                </div>


                {/* Status */}

                <span className="appointment-status completed-status">

                  Completed

                </span>


                {/* Appointment Information */}

                <div className="appointment-details-row">

                  <div>

                    <span>Date</span>

                    <strong>
                      {formatDate(appointment.appointmentDate)}
                    </strong>

                  </div>


                  <div>

                    <span>Time</span>

                    <strong>
                      {appointment.appointmentTime || "--"}
                    </strong>

                  </div>


                  <div>

                    <span>Location</span>

                    <strong>
                      {appointment.doctor?.location || "--"}
                    </strong>

                  </div>


                  <div>

                    <span>Fee</span>

                    <strong>
                      ₹{appointment.consultationFee || 0}
                    </strong>

                  </div>

                </div>


                {/* Actions */}

                <div className="appointment-card-actions">

                  <button className="appointment-view-btn" onClick={() =>
                      navigate("/book-appointment-details", {
                        state: {
                          patientDetails: appointment.patientDetails,
                          doctor: appointment.doctor,
                          appointmentDate: appointment.appointmentDate,
                          selectedTime: appointment.appointmentTime,
                        },
                      })
                    }
                  >

                    View Details

                  </button>

                </div>

              </div>

            ))

          )}

        </section>

      )}

      {/* Cancelled Appointments */}

      {!loading && (

        <section className="appointments-section cancelled-section">

          <div className="appointments-section-heading">

            <div>

              <h2>Cancelled Appointments</h2>

              <p>
                Appointments that have been cancelled.
              </p>

            </div>

            <span className="appointment-count">
              {cancelledAppointments.length} Appointments
            </span>

          </div>


          {cancelledAppointments.length === 0 ? (

            <div className="text-center py-5">

              <FaCalendarCheck size={40} />

              <h4 className="mt-3">
                No cancelled appointments
              </h4>

              <p>
                Cancelled appointments will appear here.
              </p>

            </div>

          ) : (

            cancelledAppointments.map((appointment) => (

              <div className="appointment-card" key={appointment.id}>

                {/* Doctor Information */}

                <div className="appointment-doctor">

                  <div className="appointment-doctor-image">

                    <img
                      src={getDoctorImage(appointment.doctor?.id)}
                      alt={appointment.doctor?.name || "Doctor"}
                    />

                  </div>

                  <div className="appointment-doctor-info">

                    <h3>
                      {appointment.doctor?.name || "--"}
                    </h3>

                    <p>
                      {appointment.doctor?.specialization || "--"}
                    </p>

                  </div>

                </div>


                {/* Status */}

                <span className="appointment-status cancelled-status">

                  Cancelled

                </span>


                {/* Appointment Information */}

                <div className="appointment-details-row">

                  <div>

                    <span>Date</span>

                    <strong>
                      {formatDate(appointment.appointmentDate)}
                    </strong>

                  </div>


                  <div>

                    <span>Time</span>

                    <strong>
                      {appointment.appointmentTime || "--"}
                    </strong>

                  </div>


                  <div>

                    <span>Location</span>

                    <strong>
                      {appointment.doctor?.location || "--"}
                    </strong>

                  </div>


                  <div>

                    <span>Fee</span>

                    <strong>
                      ₹{appointment.consultationFee || 0}
                    </strong>

                  </div>

                </div>


                {/* Actions */}

                <div className="appointment-card-actions">

                  <button className="appointment-view-btn" onClick={() =>
                      navigate("/book-appointment-details", {
                        state: {
                          patientDetails: appointment.patientDetails,
                          doctor: appointment.doctor,
                          appointmentDate: appointment.appointmentDate,
                          selectedTime: appointment.appointmentTime,
                        },
                      })
                    }
                  >

                    View Details

                  </button>

                </div>

              </div>

            ))

          )}

        </section>

      )}


    </div>

  );

}

export default MyAppointments;