import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    FaArrowLeft,
    FaCheckCircle,
    FaUserMd,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaMapMarkerAlt,
    FaDownload,
    FaClipboardList,
    FaUser,
} from "react-icons/fa";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";



function AppointmentConfirmation() {

    const navigate = useNavigate();
    const location = useLocation();

    const appointment = location.state?.appointment;

    const doctor = appointment?.doctor;
    const patientDetails = appointment?.patientDetails;


    //part of the page which want to convert into an image/PDF
    const confirmationRef = useRef();

    //pdf generation function
    const downloadAppointment = async () => {

    const confirmationContent = confirmationRef.current;

    if (!confirmationContent) {
        return;
    }

    try {

        const canvas = await html2canvas(confirmationContent, {
            scale: 2,

            //CORS means Cross-Origin Resource Sharing.This can be important if your confirmation page contains images coming from another source.
            useCORS: true,
            backgroundColor: "#eaf8fa"
        });

        //converts canvas to image 
        const imageData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // MediBridge background color
        pdf.setFillColor(234, 248, 250);
        //draws a rectangle covering the entire PDF page.
        pdf.rect(0, 0, pdfWidth, pdfHeight, "F");

        const imageWidth = pdfWidth;

        const imageHeight = (canvas.height * imageWidth) / canvas.width;

        // Center the content vertically
        //calculates how much empty space exists above and below the image.
        const verticalMargin = (pdfHeight - imageHeight) / 2;

        pdf.addImage(
            imageData,
            "PNG",
            0,
            verticalMargin,
            imageWidth,
            imageHeight
        );

        pdf.save(`MediBridge_${patientDetails?.fullName || "Patient"}_${appointment?.appointmentReference || "Confirmation"}.pdf`);

    }
    catch (error) {

        console.error("Failed to generate appointment PDF:",error);

        alert("Unable to download appointment confirmation.");

    }

};



    return (
        <div className="confirmation-page">

            {/* Back Button */}
            <button className="confirmation-back-btn" onClick={() => navigate("/patient-dashboard")}>
                <FaArrowLeft />
                <span>Back to Dashboard</span>
            </button>

            <div ref={confirmationRef}>

                {/* Page Heading */}
                <div className="confirmation-page-head">

                    <span>MEDIBRIDGE CARE</span>

                    <h1>Appointment Confirmed</h1>

                    <p>
                        Your appointment has been successfully scheduled.
                    </p>

                </div>


                {/* Success Card */}
                <div className="confirmation-success-card">

                    <div className="success-icon">
                        <FaCheckCircle />
                    </div>

                    <h2>Booking Confirmed!</h2>

                    <p>
                        Your consultation has been successfully booked with
                        <strong> {doctor?.name || "--"} </strong>.
                    </p>

                    <div className="appointment-reference">
                        <span>Appointment Reference</span>
                        <strong>{appointment?.appointmentReference || "--"}</strong>
                    </div>

                </div>


                {/* Doctor Information */}
                <div className="confirmation-info-card">

                    <div className="confirmation-section-heading">

                        <div className="confirmation-section-icon">
                            <FaUserMd />
                        </div>

                        <div>
                            <h2>Doctor Information</h2>
                            <p>Details of your selected doctor.</p>
                        </div>

                    </div>


                    <div className="confirmation-info-grid">

                        <div className="confirmation-info-box">
                            <span>Doctor</span>
                            <strong>{doctor?.name || "--"}</strong>
                        </div>

                        <div className="confirmation-info-box">
                            <span>Specialization</span>
                            <strong>{doctor?.specialization || "--"}</strong>
                        </div>

                        <div className="confirmation-info-box">
                            <span>Location</span>
                            <strong>
                                <FaMapMarkerAlt />
                                {doctor?.location || "--"}
                            </strong>
                        </div>

                    </div>

                </div>

                {/* Patient Information */}
                <div className="confirmation-section-card">

                    <div className="confirmation-section-heading">

                        <div className="confirmation-section-icon">
                            <FaUser />
                        </div>

                        <div>
                            <h2>Patient Information</h2>
                            <p>Patient details for this appointment.</p>
                        </div>

                    </div>


                    <div className="confirmation-info-grid">

                        {/* Full Name */}
                        <div className="confirmation-info-box">

                            <span>Full Name</span>

                            <strong>
                                {patientDetails?.fullName || "--"}
                            </strong>

                        </div>


                        {/* Age */}
                        <div className="confirmation-info-box">

                            <span>Age</span>

                            <strong>
                                {patientDetails?.age || "--"}
                            </strong>

                        </div>


                        {/* Gender */}
                        <div className="confirmation-info-box">

                            <span>Gender</span>

                            <strong>
                                {patientDetails?.gender || "--"}
                            </strong>

                        </div>


                        {/* Phone Number */}
                        <div className="confirmation-info-box">

                            <span>Phone Number</span>

                            <strong>
                                {patientDetails?.phone || "--"}
                            </strong>

                        </div>


                        {/* Email Address */}
                        <div className="confirmation-info-box">

                            <span>Email Address</span>

                            <strong>
                                {patientDetails?.email || "--"}
                            </strong>

                        </div>


                        {/* Address */}
                        <div className="confirmation-info-box">

                            <span>Address</span>

                            <strong>
                                {patientDetails?.address || "--"}
                            </strong>

                        </div>


                        {/* Reason for Visit */}
                        <div className="confirmation-info-box confirmation-full-width">

                            <span>Reason for Visit</span>

                            <strong>
                                {patientDetails?.reason || "--"}
                            </strong>

                        </div>


                        {/* Additional Notes */}
                        <div className="confirmation-info-box confirmation-full-width">

                            <span>Additional Notes</span>

                            <strong>
                                {patientDetails?.notes || "--"}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* Appointment Information */}
                <div className="confirmation-info-card">

                    <div className="confirmation-section-heading">

                        <div className="confirmation-section-icon">
                            <FaCalendarAlt />
                        </div>

                        <div>
                            <h2>Appointment Information</h2>
                            <p>Your scheduled consultation details.</p>
                        </div>

                    </div>


                    <div className="confirmation-info-grid">

                        <div className="confirmation-info-box">
                            <span>Appointment Date</span>
                            <strong>{appointment?.appointmentDate || "--"}</strong>
                        </div>

                        <div className="confirmation-info-box">
                            <span>Appointment Time</span>
                            <strong>{appointment?.appointmentTime || "--"}</strong>
                        </div>

                        <div className="confirmation-info-box">
                            <span>Consultation Type</span>
                            <strong>{appointment?.consultationType || "--"}</strong>
                        </div>

                        <div className="confirmation-info-box">
                            <span>Consultation Fee</span>
                            <strong>
                                <FaMoneyBillWave />
                                ₹{appointment?.consultationFee || "--"}
                            </strong>
                        </div>

                    </div>

                </div>
            </div>


            {/* Action Buttons */}
            <div className="confirmation-actions">

                <button
                    className="download-appointment-btn"
                    onClick={downloadAppointment}>

                    <FaDownload />
                    <span>Download Appointment</span>
                </button>

                <button className="view-appointments-btn" onClick={() => navigate("/my-appointments")}>
                    <FaClipboardList />
                    <span>View My Appointments</span>
                </button>

            </div>

        </div>
    );
}

export default AppointmentConfirmation;