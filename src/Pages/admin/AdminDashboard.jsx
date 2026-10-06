import React, { useEffect, useState } from "react";
import {
    FaShieldAlt,
    FaChartPie,
    FaCalendarCheck,
    FaUserMd,
    FaUsers,
    FaEnvelope,
    FaCog,
    FaSignOutAlt,
    FaChevronRight,
} from "react-icons/fa";
import {
    FaUserInjured,
    FaUserDoctor,
} from "react-icons/fa6";
import { GiConfirmed } from "react-icons/gi";
import { MdPendingActions } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import "./AdminDashboard.css";
import {
    getAppointmentsAPI,
    getUsersAPI,
    getDoctorsAPI,
    getMessagesAPI,
    updateAppointmentStatusAPI,
} from '../../Services/allAPI'
import { useNavigate } from "react-router-dom";



const AdminDashboard = () => {

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState({
        appointments: [],
        patients: [],
        doctors: [],
        messages: [],
    });

    const [activeSection, setActiveSection] = useState("dashboard");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const confirmedAppointments = dashboardData.appointments.filter(
        (appointment) => appointment.status === "Confirmed").length;

    const pendingAppointments = dashboardData.appointments.filter(
        (appointment) => appointment.status === "Pending").length;

    const completedAppointments = dashboardData.appointments.filter(
        (appointment) => appointment.status === "Completed").length;

    const cancelledAppointments = dashboardData.appointments.filter(
        (appointment) => appointment.status === "Cancelled").length;


    const recentAppointments = [...dashboardData.appointments]
        .reverse()
        .slice(0, 5);


    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError("");

                const [
                    appointmentsResponse,
                    patientsResponse,
                    doctorsResponse,
                    messagesResponse,
                ] = await Promise.all([
                    getAppointmentsAPI(),
                    getUsersAPI(),
                    getDoctorsAPI(),
                    getMessagesAPI(),
                ]);

                setDashboardData({
                    appointments: appointmentsResponse.data,
                    patients: patientsResponse.data,
                    doctors: doctorsResponse.data,
                    messages: messagesResponse.data,
                });
            }
            catch (error) {
                console.error("Error fetching dashboard data:", error);
                setError("Unable to load dashboard data.");
            }
            finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);


    const handleStatusChange = async (appointmentId, newStatus) => {

        try {

            await updateAppointmentStatusAPI(appointmentId,newStatus);

            setDashboardData((prevData) => ({...prevData,

                appointments: prevData.appointments.map((appointment) =>
                    appointment.id === appointmentId ? {...appointment,status: newStatus,} : appointment),
            }));

        }
        catch (error) {

            console.error("Error updating appointment status:",error);

            alert("Unable to update appointment status.");

        }

    };


    return (
        <div className="admin-dashboard">

            <aside className="admin-sidebar">

                {/* Logo */}
                <div className="admin-logo">
                    <div className="admin-logo-icon">
                        <FaShieldAlt />
                    </div>

                    <div>
                        <h2>MediBridge</h2>
                        <span>ADMIN PORTAL</span>
                    </div>
                </div>

                {/* Main Navigation */}
                <div className="admin-nav-section">

                    <p className="admin-nav-title">
                        MAIN MENU
                    </p>

                    <button className={`admin-nav-item ${activeSection === "dashboard" ? "active" : ""
                        }`}
                        onClick={() => setActiveSection("dashboard")}
                    >
                        <FaChartPie />
                        <span>Dashboard</span>
                    </button>

                    <button className={`admin-nav-item ${activeSection === "appointments" ? "active" : ""
                        }`}
                        onClick={() => setActiveSection("appointments")}
                    >
                        <FaCalendarCheck />
                        <span>Appointments</span>
                    </button>

                    <button className={`admin-nav-item ${activeSection === "doctors" ? "active" : ""
                        }`}
                        onClick={() => setActiveSection("doctors")}
                    >
                        <FaUserMd />
                        <span>Doctors</span>
                    </button>

                    <button className={`admin-nav-item ${activeSection === "patients" ? "active" : ""
                        }`}
                        onClick={() => setActiveSection("patients")}
                    >
                        <FaUsers />
                        <span>Patients</span>
                    </button>

                    <button className={`admin-nav-item ${activeSection === "messages" ? "active" : ""
                        }`}
                        onClick={() => setActiveSection("messages")}
                    >
                        <FaEnvelope />
                        <span>Messages</span>
                    </button>

                </div>

                {/* System */}
                <div className="admin-nav-section admin-system-section">

                    <p className="admin-nav-title">
                        SYSTEM
                    </p>

                    <button className={`admin-nav-item ${activeSection === "settings" ? "active" : ""
                        }`}
                        onClick={() => setActiveSection("settings")}
                    >
                        <FaCog />
                        <span>Settings</span>
                    </button>

                </div>

                {/* Sidebar Bottom */}
                <div className="admin-sidebar-bottom">

                    <div className="admin-profile">

                        <div className="admin-profile-icon">
                            <FaShieldAlt />
                        </div>

                        <div>
                            <strong>MediBridge Admin</strong>
                            <span>Administrator</span>
                        </div>

                    </div>

                    <button className="admin-logout-button">
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>

                </div>

            </aside>


            {/*  MAIN CONTENT  */}
            <main className="admin-main">

                {/* Topbar */}
                <header className="admin-topbar">

                    <div className="admin-breadcrumb">

                        <span>Admin Portal</span>

                        <FaChevronRight />

                        <strong>Dashboard</strong>

                    </div>


                    <div className="admin-topbar-profile">

                        <div className="admin-topbar-icon">
                            <FaShieldAlt />
                        </div>

                        <div>
                            <strong>MediBridge Admin</strong>
                            <span>Admin</span>
                        </div>

                    </div>

                </header>


                {/* Dashboard Content */}
                {/* Main Page Content */}
                <div className="admin-content">

                    {activeSection === "dashboard" && (

                        <>
                            {/* Dashboard Heading */}
                            <div className="dashboard-heading">

                                <div>
                                    <span className="dashboard-eyebrow">
                                        MEDIBRIDGE ADMINISTRATION
                                    </span>

                                    <h1>Dashboard</h1>

                                    <p>
                                        Welcome back. Here's an overview of your healthcare platform.
                                    </p>
                                </div>

                                <div className="secure-admin-badge">
                                    <span>🛡</span>
                                    Secure Admin Access
                                </div>

                            </div>


                            {/* Dashboard Overview */}
                            <section className="overview-section">

                                <div className="section-heading">
                                    <h2>Dashboard Overview</h2>

                                    <p>
                                        A quick overview of your MediBridge healthcare platform.
                                    </p>
                                </div>


                                {/* Error */}
                                {error && (
                                    <div className="dashboard-error">
                                        {error}
                                    </div>
                                )}


                                {/* Overview Cards */}
                                <div className="overview-cards">

                                    {/* Appointments */}
                                    <div className="overview-card">

                                        <div className="overview-icon">
                                            <FaCalendarCheck />
                                        </div>

                                        <div className="overview-card-content">

                                            <span>Appointments</span>

                                            <h3>
                                                {loading ? "..." : dashboardData.appointments.length}
                                            </h3>

                                            <p>Total appointments</p>

                                        </div>

                                    </div>


                                    {/* Patients */}
                                    <div className="overview-card">

                                        <div className="overview-icon">
                                            <FaUserInjured />
                                        </div>

                                        <div className="overview-card-content">

                                            <span>Patients</span>

                                            <h3>
                                                {loading ? "..." : dashboardData.patients.length}
                                            </h3>

                                            <p>Registered patients</p>

                                        </div>

                                    </div>


                                    {/* Doctors */}
                                    <div className="overview-card">

                                        <div className="overview-icon">
                                            <FaUserDoctor />
                                        </div>

                                        <div className="overview-card-content">

                                            <span>Doctors</span>

                                            <h3>
                                                {loading ? "..." : dashboardData.doctors.length}
                                            </h3>

                                            <p>Registered doctors</p>

                                        </div>

                                    </div>


                                    {/* Messages */}
                                    <div className="overview-card">

                                        <div className="overview-icon">
                                            <FaEnvelope />
                                        </div>

                                        <div className="overview-card-content">

                                            <span>Messages</span>

                                            <h3>
                                                {loading ? "..." : dashboardData.messages.length}
                                            </h3>

                                            <p>Contact messages</p>

                                        </div>

                                    </div>

                                </div>


                                {/* Appointment Status */}
                                <div className="appointment-status-section">

                                    <div className="status-section-heading">

                                        <h2>Appointment Status</h2>

                                        <p>
                                            Current appointment distribution across the platform.
                                        </p>

                                    </div>


                                    <div className="status-cards">

                                        {/* Confirmed */}
                                        <div className="status-card">

                                            <div className="status-card-icon confirmed-icon">
                                                <GiConfirmed />
                                            </div>

                                            <div className="status-card-content">

                                                <span>Confirmed</span>

                                                <h3>
                                                    {loading ? "..." : confirmedAppointments}
                                                </h3>

                                                <p>Confirmed appointments</p>

                                            </div>

                                        </div>


                                        {/* Pending */}
                                        <div className="status-card">

                                            <div className="status-card-icon pending-icon">
                                                <MdPendingActions />
                                            </div>

                                            <div className="status-card-content">

                                                <span>Pending</span>

                                                <h3>
                                                    {loading ? "..." : pendingAppointments}
                                                </h3>

                                                <p>Awaiting confirmation</p>

                                            </div>

                                        </div>


                                        {/* Completed */}
                                        <div className="status-card">

                                            <div className="status-card-icon completed-icon">
                                                <FaCalendarCheck />
                                            </div>

                                            <div className="status-card-content">

                                                <span>Completed</span>

                                                <h3>
                                                    {loading ? "..." : completedAppointments}
                                                </h3>

                                                <p>Completed appointments</p>

                                            </div>

                                        </div>


                                        {/* Cancelled */}
                                        <div className="status-card">

                                            <div className="status-card-icon cancelled-icon">
                                                <MdCancel />
                                            </div>

                                            <div className="status-card-content">

                                                <span>Cancelled</span>

                                                <h3>
                                                    {loading ? "..." : cancelledAppointments}
                                                </h3>

                                                <p>Cancelled appointments</p>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* Recent Appointments */}
                                <div className="recent-appointments-section">

                                    <div className="recent-section-heading">

                                        <div>

                                            <h2>Recent Appointments</h2>

                                            <p>
                                                Latest appointment activity across MediBridge.
                                            </p>

                                        </div>

                                        <button
                                            className="view-all-button"
                                            onClick={() =>
                                                setActiveSection("appointments")
                                            }
                                        >
                                            View All
                                        </button>

                                    </div>


                                    <div className="appointments-table-wrapper">

                                        <table className="appointments-table">

                                            <thead>

                                                <tr>
                                                    <th>Patient</th>
                                                    <th>Doctor</th>
                                                    <th>Date</th>
                                                    <th>Time</th>
                                                    <th>Consultation</th>
                                                    <th>Status</th>
                                                </tr>

                                            </thead>


                                            <tbody>

                                                {loading ? (

                                                    <tr>
                                                        <td
                                                            colSpan="6"
                                                            className="table-loading"
                                                        >
                                                            Loading appointments...
                                                        </td>
                                                    </tr>

                                                ) : recentAppointments.length === 0 ? (

                                                    <tr>
                                                        <td
                                                            colSpan="6"
                                                            className="table-empty"
                                                        >
                                                            No appointments found.
                                                        </td>
                                                    </tr>

                                                ) : (

                                                    recentAppointments.map(
                                                        (appointment) => (

                                                            <tr key={appointment.id}>

                                                                {/* Patient */}
                                                                <td>

                                                                    <div className="patient-cell">

                                                                        <div className="patient-avatar">
                                                                            <FaUserInjured />
                                                                        </div>

                                                                        <div>

                                                                            <strong>
                                                                                {appointment.patientDetails?.fullName ||
                                                                                    "Unknown Patient"}
                                                                            </strong>

                                                                            <span>
                                                                                {appointment.patientDetails?.email ||
                                                                                    "No email"}
                                                                            </span>

                                                                        </div>

                                                                    </div>

                                                                </td>


                                                                {/* Doctor */}
                                                                <td>

                                                                    <div className="doctor-cell">

                                                                        <strong>
                                                                            {appointment.doctor?.name ||
                                                                                "Unknown Doctor"}
                                                                        </strong>

                                                                        <span>
                                                                            {appointment.doctor?.specialization ||
                                                                                "Not available"}
                                                                        </span>

                                                                    </div>

                                                                </td>


                                                                {/* Date */}
                                                                <td>
                                                                    {appointment.appointmentDate || "-"}
                                                                </td>


                                                                {/* Time */}
                                                                <td>
                                                                    {appointment.appointmentTime || "-"}
                                                                </td>


                                                                {/* Consultation */}
                                                                <td>
                                                                    {appointment.consultationType || "-"}
                                                                </td>


                                                                {/* Status */}
                                                                <td>

                                                                    <span
                                                                        className={`appointment-status-badge ${appointment.status?.toLowerCase()}`}
                                                                    >
                                                                        {appointment.status || "Unknown"}
                                                                    </span>

                                                                </td>

                                                            </tr>

                                                        )
                                                    )

                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                </div>

                            </section>

                        </>
                    )}


                    {/* appointment section */}
                    {activeSection === "appointments" && (

                        <section className="appointments-section">

                            {/* Section Header */}
                            <div className="appointments-page-heading">

                                <div>

                                    <span className="dashboard-eyebrow">
                                        MEDIBRIDGE ADMINISTRATION
                                    </span>

                                    <h1>Appointments</h1>

                                    <p>
                                        Manage and monitor all patient appointments across MediBridge.
                                    </p>

                                </div>

                                <div className="appointments-count-badge">
                                    <FaCalendarCheck />
                                    <span>
                                        {loading ? "..." : dashboardData.appointments.length}
                                    </span>
                                    <small>Total</small>
                                </div>

                            </div>

                            {/* Appointment Status Summary */}

                            <div className="appointments-summary">

                                {/* Total */}
                                <div className="appointments-summary-card">

                                    <div className="summarys-icon total-icon">
                                        <FaCalendarCheck />
                                    </div>

                                    <div className="summarys-content">
                                        <span>Total Appointments</span>

                                        <h3>
                                            {loading ? "..." : dashboardData.appointments.length}
                                        </h3>

                                        <p>All appointments</p>
                                    </div>

                                </div>


                                {/* Pending */}
                                <div className="appointments-summary-card">

                                    <div className="summarys-icon pending-icon">
                                        <MdPendingActions />
                                    </div>

                                    <div className="summarys-content">
                                        <span>Pending</span>

                                        <h3>
                                            {loading ? "..." : pendingAppointments}
                                        </h3>

                                        <p>Awaiting confirmation</p>
                                    </div>

                                </div>


                                {/* Confirmed */}
                                <div className="appointments-summary-card">

                                    <div className="summarys-icon confirmed-icon">
                                        <GiConfirmed />
                                    </div>

                                    <div className="summarys-content">
                                        <span>Confirmed</span>

                                        <h3>
                                            {loading ? "..." : confirmedAppointments}
                                        </h3>

                                        <p>Upcoming appointments</p>
                                    </div>

                                </div>


                                {/* Completed */}
                                <div className="appointments-summary-card">

                                    <div className="summarys-icon completed-icon">
                                        <FaCalendarCheck />
                                    </div>

                                    <div className="summarys-content">
                                        <span>Completed</span>

                                        <h3>
                                            {loading ? "..." : completedAppointments}
                                        </h3>

                                        <p>Finished appointments</p>
                                    </div>

                                </div>


                                {/* Cancelled */}
                                <div className="appointments-summary-card">

                                    <div className="summarys-icon cancelled-icon">
                                        <MdCancel />
                                    </div>

                                    <div className="summarys-content">
                                        <span>Cancelled</span>

                                        <h3>
                                            {loading ? "..." : cancelledAppointments}
                                        </h3>

                                        <p>Cancelled appointments</p>
                                    </div>

                                </div>

                            </div>

                            
                            {/* all appointments */}
                            <div className="all-appointments-section">

                                <div className="all-appointments-heading">

                                    <div>
                                        <h2>All Appointments</h2>

                                        <p>
                                            View and manage all patient appointments across MediBridge.
                                        </p>
                                    </div>

                                </div>


                                <div className="all-appointments-table-wrapper">

                                    <table className="all-appointments-table">

                                        <thead>
                                            <tr>
                                                <th>Patient</th>
                                                <th>Doctor</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Consultation</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>


                                        <tbody>

                                            {loading ? (

                                                <tr>
                                                    <td colSpan="6" className="appointments-table-message">
                                                        Loading appointments...
                                                    </td>
                                                </tr>

                                            ) : dashboardData.appointments.length === 0 ? (

                                                <tr>
                                                    <td colSpan="6" className="appointments-table-message">
                                                        No appointments found.
                                                    </td>
                                                </tr>

                                            ) : (

                                                dashboardData.appointments.map((appointment) => (

                                                    <tr key={appointment.id}>

                                                        {/* Patient */}
                                                        <td>

                                                            <div className="appointment-patient-cell">

                                                                <div className="appointment-patient-icon">
                                                                    <FaUserInjured />
                                                                </div>

                                                                <div>
                                                                    <strong>
                                                                        {appointment.patientDetails?.fullName ||
                                                                            "Unknown Patient"}
                                                                    </strong>

                                                                    <span>
                                                                        {appointment.patientDetails?.email ||
                                                                            "No email"}
                                                                    </span>
                                                                </div>

                                                            </div>

                                                        </td>


                                                        {/* Doctor */}
                                                        <td>

                                                            <div className="appointment-doctor-cell">

                                                                <strong>
                                                                    {appointment.doctor?.name ||
                                                                        "Unknown Doctor"}
                                                                </strong>

                                                                <span>
                                                                    {appointment.doctor?.specialization ||
                                                                        "Not available"}
                                                                </span>

                                                            </div>

                                                        </td>


                                                        {/* Date */}
                                                        <td>
                                                            {appointment.appointmentDate || "-"}
                                                        </td>


                                                        {/* Time */}
                                                        <td>
                                                            {appointment.appointmentTime || "-"}
                                                        </td>


                                                        {/* Consultation */}
                                                        <td>
                                                            {appointment.consultationType || "-"}
                                                        </td>


                                                        {/* Status */}

                                                        <td>

                                                            <select value={appointment.status || ""} onChange={(e) =>
                                                                    handleStatusChange(
                                                                        appointment.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className={`admin-appointment-status-select ${appointment.status?.toLowerCase() || ""
                                                                    }`}
                                                            >

                                                                <option value="Pending">
                                                                    Pending
                                                                </option>

                                                                <option value="Confirmed">
                                                                    Confirmed
                                                                </option>

                                                                <option value="Completed">
                                                                    Completed
                                                                </option>

                                                                <option value="Cancelled">
                                                                    Cancelled
                                                                </option>

                                                            </select>

                                                        </td>

                                                    </tr>

                                                ))

                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </section>

                    )}

                    
                    {/* docotr section */}
                    {activeSection === "doctors" && (

                        <section className="doctors-section">

                            {/* Doctors Header */}
                            <div className="doctors-page-heading">

                                <div>

                                    <span className="dashboard-eyebrow">
                                        MEDIBRIDGE ADMINISTRATION
                                    </span>

                                    <h1>Doctors</h1>

                                    <p>
                                        Manage and monitor all doctors registered on MediBridge.
                                    </p>

                                </div>


                                <div className="doctors-count-badge">

                                    <FaUserMd />

                                    <div>
                                        <strong>
                                            {loading ? "..." : dashboardData.doctors.length}
                                        </strong>

                                        <span>Doctors</span>
                                    </div>

                                </div>

                            </div>


                            {/* Doctors Overview */}

                            <div className="doctors-overview">

                                <div className="doctor-overview-card">

                                    <div className="doctor-overview-icon">
                                        <FaUserMd />
                                    </div>

                                    <div>
                                        <span>Total Doctors</span>

                                        <strong>
                                            {loading ? "..." : dashboardData.doctors.length}
                                        </strong>

                                        <p>Registered doctors</p>
                                    </div>

                                </div>


                                <div className="doctor-overview-card">

                                    <div className="doctor-overview-icon available">
                                        <GiConfirmed />
                                    </div>

                                    <div>
                                        <span>Available</span>

                                        <strong>
                                            {loading
                                                ? "..."
                                                : dashboardData.doctors.filter(
                                                    (doctor) => doctor.available === true
                                                ).length}
                                        </strong>

                                        <p>Currently available</p>
                                    </div>

                                </div>


                                <div className="doctor-overview-card">

                                    <div className="doctor-overview-icon unavailable">
                                        <MdCancel />
                                    </div>

                                    <div>
                                        <span>Unavailable</span>

                                        <strong>
                                            {loading
                                                ? "..."
                                                : dashboardData.doctors.filter(
                                                    (doctor) => doctor.available === false
                                                ).length}
                                        </strong>

                                        <p>Currently unavailable</p>
                                    </div>

                                </div>

                            </div>


                            {/* Doctors List */}

                            <div className="doctors-list-section">

                                <div className="doctors-list-heading">

                                    <div>
                                        <h2>All Doctors</h2>

                                        <p>
                                            View doctor profiles, specializations and availability.
                                        </p>
                                    </div>

                                </div>


                                <div className="doctors-grid">

                                    {loading ? (

                                        <div className="doctors-message">
                                            Loading doctors...
                                        </div>

                                    ) : dashboardData.doctors.length === 0 ? (

                                        <div className="doctors-message">
                                            No doctors found.
                                        </div>

                                    ) : (

                                        dashboardData.doctors.map((doctor) => (

                                            <div
                                                className="doctor-admin-card"
                                                key={doctor.id}
                                            >

                                                {/* Doctor Icon */}
                                                <div className="doctor-admin-image">

                                                    <FaUserMd />

                                                </div>


                                                {/* Doctor Details */}
                                                <div className="doctor-admin-details">

                                                    <h3>
                                                        {doctor.name}
                                                    </h3>

                                                    <span className="doctor-specialization">
                                                        {doctor.specialization}
                                                    </span>

                                                    <p>
                                                        {doctor.location}
                                                    </p>

                                                </div>


                                                {/* Doctor Bottom */}
                                                <div className="doctor-admin-footer">

                                                    <div className="doctor-fee">

                                                        <span>Consultation</span>

                                                        <strong>
                                                            ₹{doctor.fee}
                                                        </strong>

                                                    </div>


                                                    <span className={`doctor-availability ${doctor.available ? "available" : "unavailable"}`}>

                                                        <span className="availability-dot"></span>

                                                        {doctor.available ? "Available" : "Unavailable"}

                                                    </span>

                                                </div>

                                            </div>

                                        ))

                                    )}

                                </div>

                            </div>

                        </section>

                    )}

                    
                    {/* patient section */}
                    {activeSection === "patients" && (

                        <section className="patients-section">

                            {/* Page Heading */}
                            <div className="patients-page-heading">

                                <div>

                                    <span className="dashboard-eyebrow">
                                        MEDIBRIDGE ADMINISTRATION
                                    </span>

                                    <h1>Patients</h1>

                                    <p>
                                        View and manage all registered patients across MediBridge.
                                    </p>

                                </div>

                                <div className="patients-count-badge">

                                    <FaUsers />

                                    <span>
                                        {loading ? "..." : dashboardData.patients.length}
                                    </span>

                                    <small>Total Patients</small>

                                </div>

                            </div>


                            {/* Patient Summary */}
                            <div className="patient-summary">

                                <div className="patient-summary-card">

                                    <div className="patient-summary-icon">
                                        <FaUsers />
                                    </div>

                                    <div>
                                        <span>Total Patients</span>

                                        <h3>
                                            {loading ? "..." : dashboardData.patients.length}
                                        </h3>

                                        <p>Registered patients</p>
                                    </div>

                                </div>

                            </div>


                            {/* All Patients */}
                            <div className="all-patients-section">

                                <div className="all-patients-heading">

                                    <div>

                                        <h2>Registered Patients</h2>

                                        <p>
                                            Patient information registered on the MediBridge platform.
                                        </p>

                                    </div>

                                </div>


                                <div className="all-patients-table-wrapper">

                                    <table className="all-patients-table">

                                        <thead>

                                            <tr>
                                                <th>Patient</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Age</th>
                                                <th>Gender</th>
                                                <th>Address</th>
                                            </tr>

                                        </thead>


                                        <tbody>

                                            {loading ? (

                                                <tr>
                                                    <td
                                                        colSpan="6"
                                                        className="patients-table-message"
                                                    >
                                                        Loading patients...
                                                    </td>
                                                </tr>

                                            ) : dashboardData.patients.length === 0 ? (

                                                <tr>
                                                    <td
                                                        colSpan="6"
                                                        className="patients-table-message"
                                                    >
                                                        No patients found.
                                                    </td>
                                                </tr>

                                            ) : (

                                                dashboardData.patients.map((patient) => (

                                                    <tr key={patient.id}>

                                                        {/* Patient */}
                                                        <td>

                                                            <div className="patient-admin-cell">

                                                                <div className="patient-admin-avatar">
                                                                    <FaUserInjured />
                                                                </div>

                                                                <div>

                                                                    <strong>
                                                                        {patient.name || "Unknown Patient"}
                                                                    </strong>

                                                                    <span>
                                                                        ID: #{patient.id}
                                                                    </span>

                                                                </div>

                                                            </div>

                                                        </td>


                                                        {/* Email */}
                                                        <td>
                                                            {patient.email || "Not available"}
                                                        </td>


                                                        {/* Phone */}
                                                        <td>
                                                            {patient.phone || "Not available"}
                                                        </td>


                                                        {/* Age */}
                                                        <td>
                                                            {patient.age || "-"}
                                                        </td>


                                                        {/* Gender */}
                                                        <td>
                                                            {patient.gender || "-"}
                                                        </td>


                                                        {/* Blood Group */}
                                                        <td>
                                                            {patient.address || "-"}
                                                        </td>

                                                    </tr>

                                                ))

                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </section>

                    )}

                    
                    {/* message section */}
                    {activeSection === "messages" && (

                        <section className="messages-section">

                            {/* Page Heading */}
                            <div className="messages-page-heading">

                                <div>

                                    <span className="dashboard-eyebrow">
                                        MEDIBRIDGE ADMINISTRATION
                                    </span>

                                    <h1>Messages</h1>

                                    <p>
                                        View and manage messages received from MediBridge users.
                                    </p>

                                </div>

                                <div className="messages-count-badge">

                                    <FaEnvelope />

                                    <span>
                                        {loading ? "..." : dashboardData.messages.length}
                                    </span>

                                    <small>Total Messages</small>

                                </div>

                            </div>


                            {/* Messages Table */}
                            <div className="all-messages-section">

                                <div className="all-messages-heading">

                                    <div>

                                        <h2>Contact Messages</h2>

                                        <p>
                                            Messages submitted through the MediBridge contact form.
                                        </p>

                                    </div>

                                </div>


                                <div className="all-messages-table-wrapper">

                                    <table className="all-messages-table">

                                        <thead>

                                            <tr>
                                                <th>Sender</th>
                                                <th>Subject</th>
                                                <th>Message</th>
                                                <th>Date</th>
                                            </tr>

                                        </thead>


                                        <tbody>

                                            {loading ? (

                                                <tr>
                                                    <td
                                                        colSpan="4"
                                                        className="messages-table-message"
                                                    >
                                                        Loading messages...
                                                    </td>
                                                </tr>

                                            ) : dashboardData.messages.length === 0 ? (

                                                <tr>
                                                    <td
                                                        colSpan="5"
                                                        className="messages-table-message"
                                                    >
                                                        No messages found.
                                                    </td>
                                                </tr>

                                            ) : (

                                                dashboardData.messages.map((message) => (

                                                    <tr key={message.id}>

                                                        {/* Sender */}
                                                        <td>

                                                            <div className="message-sender-cell">

                                                                <div className="message-sender-avatar">
                                                                    <FaUsers />
                                                                </div>

                                                                <div>

                                                                    <strong>
                                                                        {message.name || "Unknown"}
                                                                    </strong>

                                                                    <span>
                                                                        {message.email || "No email"}
                                                                    </span>

                                                                </div>

                                                            </div>

                                                        </td>


                                                        {/* Subject */}
                                                        <td>

                                                            <strong className="message-subject">
                                                                {message.subject || "No subject"}
                                                            </strong>

                                                        </td>


                                                        {/* Message */}
                                                        <td>

                                                            <div className="message-preview">
                                                                {message.message || "No message"}
                                                            </div>

                                                        </td>


                                                        {/* Date */}
                                                        <td>

                                                            {message.date
                                                                ? new Date(message.date).toLocaleDateString()
                                                                : "-"}

                                                        </td>

                                                    </tr>

                                                ))

                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </section>

                    )}

                    
                    {/* settings section */}
                    {activeSection === "settings" && (

                        <section className="settings-section">

                            {/* Page Heading */}
                            <div className="settings-page-heading">

                                <div>

                                    <span className="dashboard-eyebrow">
                                        MEDIBRIDGE ADMINISTRATION
                                    </span>

                                    <h1>Settings</h1>

                                    <p>
                                        Manage your MediBridge admin account and dashboard preferences.
                                    </p>

                                </div>

                            </div>


                            {/* Settings Cards */}
                            <div className="settings-grid">

                                {/* Admin Profile */}
                                <div className="settings-card">

                                    <div className="settings-card-header">

                                        <div className="settings-card-icon">
                                            <FaShieldAlt />
                                        </div>

                                        <div>
                                            <h2>Admin Profile</h2>
                                            <p>Administrator account information.</p>
                                        </div>

                                    </div>

                                    <div className="settings-info">

                                        <div className="settings-info-row">
                                            <span>Name</span>
                                            <strong>MediBridge Admin</strong>
                                        </div>

                                        <div className="settings-info-row">
                                            <span>Role</span>
                                            <strong>Administrator</strong>
                                        </div>

                                        <div className="settings-info-row">
                                            <span>Access</span>
                                            <strong>Full Dashboard Access</strong>
                                        </div>

                                    </div>

                                </div>


                                {/* Dashboard Information */}
                                <div className="settings-card">

                                    <div className="settings-card-header">

                                        <div className="settings-card-icon">
                                            <FaCog />
                                        </div>

                                        <div>
                                            <h2>Dashboard</h2>
                                            <p>Overview of your admin dashboard.</p>
                                        </div>

                                    </div>

                                    <div className="settings-info">

                                        <div className="settings-info-row">
                                            <span>Patients</span>
                                            <strong>
                                                {loading ? "..." : dashboardData.patients.length}
                                            </strong>
                                        </div>

                                        <div className="settings-info-row">
                                            <span>Doctors</span>
                                            <strong>
                                                {loading ? "..." : dashboardData.doctors.length}
                                            </strong>
                                        </div>

                                        <div className="settings-info-row">
                                            <span>Appointments</span>
                                            <strong>
                                                {loading ? "..." : dashboardData.appointments.length}
                                            </strong>
                                        </div>

                                        <div className="settings-info-row">
                                            <span>Messages</span>
                                            <strong>
                                                {loading ? "..." : dashboardData.messages.length}
                                            </strong>
                                        </div>

                                    </div>

                                </div>


                                {/* System Information */}
                                <div className="settings-card">

                                    <div className="settings-card-header">

                                        <div className="settings-card-icon">
                                            <FaChartPie />
                                        </div>

                                        <div>
                                            <h2>System Information</h2>
                                            <p>Current MediBridge system details.</p>
                                        </div>

                                    </div>

                                    <div className="settings-info">

                                        <div className="settings-info-row">
                                            <span>Platform</span>
                                            <strong>MediBridge</strong>
                                        </div>

                                        <div className="settings-info-row">
                                            <span>Dashboard</span>
                                            <strong>Admin Portal</strong>
                                        </div>

                                        <div className="settings-info-row">
                                            <span>Status</span>
                                            <strong className="system-active">
                                                Active
                                            </strong>
                                        </div>

                                    </div>

                                </div>


                                {/* Security */}
                                <div className="settings-card">

                                    <div className="settings-card-header">

                                        <div className="settings-card-icon">
                                            <FaShieldAlt />
                                        </div>

                                        <div>
                                            <h2>Security</h2>
                                            <p>Administrator security information.</p>
                                        </div>

                                    </div>

                                    <div className="settings-info">

                                        <div className="settings-info-row">
                                            <span>Account Type</span>
                                            <strong>Administrator</strong>
                                        </div>

                                        <div className="settings-info-row">
                                            <span>Authentication</span>
                                            <strong>Protected</strong>
                                        </div>

                                        <div className="settings-info-row">
                                            <span>Session</span>
                                            <strong className="system-active">
                                                Active
                                            </strong>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </section>
                    )}

                </div>

            </main>

        </div>
    );
};

export default AdminDashboard;