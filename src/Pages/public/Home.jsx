import React, { useEffect, useState } from 'react'
import homeDoctor from '../../assets/images/home-doctor.jpg'
import Navbar from '../../Components/Navbar'
import { FaHeartPulse } from 'react-icons/fa6'
import doctorSarah from '../../assets/images/doctor1.jpg'
import doctorRahul from '../../assets/images/doctor2.jpg'
import doctorAnanya from '../../assets/images/doctor3.jpg'
import { Link, useNavigate } from 'react-router-dom'
import healthcareBanner from '../../assets/images/healthcare-banner.jpg'
import Carousel from 'react-bootstrap/Carousel';
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaHandHoldingMedical } from "react-icons/fa6";
import patientpriya from '../../assets/images/patient1.jpg'
import patientarjun from '../../assets/images/patient3.jpg'
import patientanjali from '../../assets/images/patient2.jpg'
import { getDoctorsAPI } from '../../Services/allAPI'
import { IoIosCloseCircle } from "react-icons/io";
import { sendContactMessageAPI } from '../../Services/allAPI';




function Home() {

  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  //modal state
  const [selectedDoctor, setSelectedDoctor] = useState(null);


  //fetching doctors
  useEffect(() => {

    const getDoctors = async () => {

      try {

        const response = await getDoctorsAPI();

        console.log("Doctors received:", response.data);

        setDoctors(response.data);

      }
      catch (error) {

        console.log("Failed to fetch doctors:", error);

      }
      finally {

        setLoadingDoctors(false);

      }

    };

    getDoctors();

  }, []);


  //doctor image function
  const getDoctorImage = (doctorId) => {

    switch (doctorId) {

      case 1:
        return doctorSarah;

      case 2:
        return doctorRahul;

      case 3:
        return doctorAnanya;

      default:
        return doctorSarah;

    }

  };


  //contact form state
  const [contactForm, setContactForm] = useState({
      name: "",
      email: "",
      subject: "",
      message: ""
  });


  const [sendingMessage, setSendingMessage] = useState(false);

  const handleContactChange = (e) => {

  const { name, value } = e.target;

  setContactForm({...contactForm,[name]: value});

};


  //contact submit
  const handleContactSubmit = async (e) => {

    //prevent page refresh
    e.preventDefault();   

    if (
      !contactForm.name ||
      !contactForm.email ||
      !contactForm.subject ||
      !contactForm.message
    ) {

      alert("Please fill the missing fields.");

      return;

    }

    try {

      setSendingMessage(true);

      const messageData = {...contactForm, date: new Date().toISOString()};

      await sendContactMessageAPI(messageData);

      alert("Your message has been sent successfully.");

      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    }
    catch (error) {

      console.log("Failed to send message:", error);

      alert("Failed to send your message. Please try again.");

    }
    finally {

      setSendingMessage(false);

    }

  };




  return (
    <div className='home-page'>

      <Navbar />

      {/* Hero */}
      <section className='home-hero'>

        <div className='container'>

          <div className='row align-items-center'>

            <div className='col-md-6'>

              <h1>Quality Healthcare, Within Your Reach</h1>

              <p>
                Find trusted doctors, book appointments, and manage your
                healthcare journey with ease.
              </p>

              <Link to='/login'><button className='hero-btn'>Find a Doctor</button></Link>

            </div>

            <div className='col-md-6'>

              <img src={homeDoctor} alt='Healthcare professional' className='home-hero-image' />

            </div>

          </div>

        </div>

      </section>

      {/* About */}
      <section className='about-us'>

        <div className='container'>

          <div className='row align-items-center'>

            {/* Left Side */}
            <div className='col-md-6'>

              <div className='about-image-box'>

                <FaHeartPulse className='about-icon' />

                <h3>Care That Connects</h3>

                <p>
                  Bringing patients and trusted healthcare professionals
                  closer through a simple digital experience.
                </p>

              </div>

            </div>


            {/* Right Side */}
            <div className='col-md-6'>

              <div className='about-content'>

                <h2>About MediBridge</h2>

                <p>
                  MediBridge is a healthcare appointment platform designed
                  to make finding doctors and managing appointments easier
                  for patients.
                </p>

                <p>
                  Our goal is to provide a simple and convenient way for
                  patients to connect with healthcare professionals and
                  manage their appointments in one place.
                </p>

                <div className='about-points'>

                  <div className='about-point'>
                    <span><IoCheckmarkCircleOutline /></span>
                    <p>Connect with trusted healthcare professionals</p>
                  </div>

                  <div className='about-point'>
                    <span><IoCheckmarkCircleOutline /></span>
                    <p>Book and manage appointments easily</p>
                  </div>

                  <div className='about-point'>
                    <span><IoCheckmarkCircleOutline /></span>
                    <p>Keep your healthcare journey organized</p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Famous Doctors */}
      <section className='famous-doctors'>

        <div className='container'>

          <div className='section-heading'>

            <h2>Our Featured Doctors</h2>

            <p>
              Meet some of our experienced healthcare professionals.
            </p>

          </div>

          <div className='row'>

            {loadingDoctors ? (

              <div className="text-center py-4">

                <p>Loading doctors...</p>

              </div>

            ) : (

              doctors.slice(0, 3).map((doctor) => (

                <div className='col-md-4' key={doctor.id}>

                  <div className='doctor-showcase-card' onClick={() => setSelectedDoctor(doctor)} style={{ cursor: 'pointer' }}>

                    <img src={getDoctorImage(doctor.id)} alt={doctor.name} className='doctor-showcase-image' />

                    <h3>{doctor.name}</h3>

                    <p>{doctor.specialization}</p>

                    <span>Consultation Fee: ₹{doctor.fee}</span>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </section>


      {/* Doctor Details Modal */}
      {selectedDoctor && (

        <div className="doctor-details-overlay">

          <div className="doctor-details-modal">

            {/* Close Button */}
            <button className="doctor-details-close" onClick={() => setSelectedDoctor(null)}>
              <IoIosCloseCircle />
            </button>


            {/* Doctor Image */}
            <img src={getDoctorImage(selectedDoctor.id)} alt={selectedDoctor.name} className="doctor-details-image"/>

            {/* Doctor Information */}

            <div className="doctor-details-content">

              <h2>{selectedDoctor.name}</h2>

              <p className="doctor-details-specialization">
                {selectedDoctor.specialization}
              </p>

              <div className="doctor-details-info">

                <p>
                  <strong>Location:</strong>
                  {" "}
                  {selectedDoctor.location}
                </p>

                <p>
                  <strong>Consultation Fee:</strong>
                  {" "}
                  ₹{selectedDoctor.fee}
                </p>

                <p>
                  <strong>Availability:</strong>
                  {" "}
                  {selectedDoctor.available ? "Available Today" : "Currently Unavailable"}
                </p>

              </div>


              {/* Book Appointment */}

              <button className="doctor-details-book-btn" onClick={() => {

                  navigate("/login", {
                      state: {
                      doctor: selectedDoctor
                    }
                  });

                  setSelectedDoctor(null);

                }}
              >
                Book Appointment
              </button>

            </div>

          </div>

        </div>

      )}

      {/* Testimonials */}
      <section className='testimonials'>

        <div className='container'>

          <div className='section-heading'>

            <h2>What Our Patients Say</h2>

            <p>
              Hear from people who have used MediBridge.
            </p>

          </div>

          <Carousel className='testimonial-carousel'>
            <Carousel.Item>

              <div className='testimonial-content'>

                <img src={patientpriya} alt='patient1' className='image' />

                <p className='testimonial-text'>
                  "MediBridge made it very easy for me to find a suitable doctor
                  and book an appointment."
                </p>
                <h4>Priya Menon</h4>
                <span>Patient</span>

              </div>

            </Carousel.Item>
            <Carousel.Item>

              <div className='testimonial-content'>

                <img src={patientarjun} alt='patient2' className='image' />

                <p className='testimonial-text'>
                  "The appointment process was simple and convenient. I could
                  manage my appointments without any difficulty."
                </p>
                <h4>Arjun Kumar</h4>
                <span>Patient</span>

              </div>

            </Carousel.Item>
            <Carousel.Item>

              <div className='testimonial-content'>

                <img src={patientanjali} alt='patient3' className='image' />

                <p className='testimonial-text'>
                  "I liked how easy it was to explore doctors and keep track of
                  my appointments in one place."
                </p>
                <h4>Anjali Nair</h4>
                <span>Patient</span>

              </div>

            </Carousel.Item>
          </Carousel>

        </div>

      </section>

      {/* banner */}
      <section className='healthcare-banner' style={{ backgroundImage: `url(${healthcareBanner})` }}>

        <div className='healthcare-banner-overlay'>

        </div>

      </section>

      {/* Contact */}
      <section className='contact-us'>

        <div className='container'>

          <div className='section-heading'>
            <h2>Contact Us</h2>

            <p>
              Have a question? We'd love to hear from you.
            </p>
          </div>


          <div className='row align-items-stretch'>

            {/* Contact Information */}
            <div className='col-md-5'>

              <div className='contact-info'>

                <h3>Get in Touch</h3>

                <p>
                  If you have any questions or need assistance,
                  feel free to reach out to us.
                </p>


                <div className='contact-item'>

                  <span><IoLocationSharp /></span>

                  <div>
                    <h5>Location</h5>
                    <p>Ernakulam, Kerala, India</p>
                  </div>

                </div>


                <div className='contact-item'>

                  <span><FaPhoneAlt /></span>

                  <div>
                    <h5>Phone</h5>
                    <p>+91 98765 43210</p>
                  </div>

                </div>


                <div className='contact-item'>

                  <span><MdEmail /></span>

                  <div>
                    <h5>Email</h5>
                    <p>support@medibridge.com</p>
                  </div>

                </div>

              </div>

            </div>


            {/* Contact Form */}
            <div className='col-md-7'>

              <form  className='contact-form' onSubmit={handleContactSubmit}>

                <div className='row'>

                  <div className='col-md-6 mb-3'>

                    <label>Name</label>

                    <input type='text' name='name' className='form-control' placeholder='Enter your name' value={contactForm.name}  onChange={handleContactChange} />

                  </div>


                  <div className='col-md-6 mb-3'>

                    <label>Email</label>

                    <input type='email' name='email' className='form-control' placeholder='Enter your email' value={contactForm.email}  onChange={handleContactChange} />

                  </div>

                </div>


                <div className='mb-3'>

                  <label>Subject</label>

                  <input type='text' name='subject' className='form-control' placeholder='Enter subject'  value={contactForm.subject}  onChange={handleContactChange} />

                </div>


                <div className='mb-3'>

                  <label>Message</label>

                  <textarea name='message' className='form-control' rows='5' placeholder='Write your message'  value={contactForm.message}  onChange={handleContactChange}></textarea>

                </div>


                <button className='contact-submit-btn' type='submit' disabled={sendingMessage}>
                   {sendingMessage ? "Sending..." : "Send Message"}
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className='footer'>

        <div className='container'>

          <div className='row'>

            {/* Brand */}
            <div className='col-md-5'>

              <div className='footer-brand'>

                <h3>
                  <FaHandHoldingMedical />
                  MediBridge
                </h3>

                <p>
                  Connecting you with trusted healthcare professionals
                  and making appointment management simple.
                </p>

              </div>

            </div>


            {/* Quick Links */}
            <div className='col-md-3'>

              <div className='footer-links'>

                <h4>Quick Links</h4>

                <a href='#'>Home</a>
                <a href='#'>About Us</a>
                <a href='#'>Contact Us</a>

              </div>

            </div>


            {/* Contact */}
            <div className='col-md-4'>

              <div className='footer-contact'>

                <h4>Contact</h4>

                <p><IoLocationSharp /> Ernakulam, Kerala, India</p>
                <p><FaPhoneAlt /> +91 98765 43210</p>
                <p><MdEmail /> support@medibridge.com</p>

              </div>

            </div>

          </div>


          <div className='footer-bottom'>

            <p>
              © 2026 MediBridge. All rights reserved.
            </p>

          </div>

        </div>

      </footer>

    </div>
  )
}

export default Home