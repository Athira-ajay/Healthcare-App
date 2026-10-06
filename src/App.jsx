import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/public/Home'
import Landing from './Pages/public/Landing'
import RoleSelection from './Pages/public/RoleSelection'
import Login from './Pages/public/Login'
import Register from './Pages/public/Register'
import PatientDashboard from './Pages/patient/PatientDashboard'
import AppointmentDetails from './Pages/patient/AppointmentDetails'
import FindDoctors from './Pages/patient/FindDoctors'
import DoctorDetails from './Pages/patient/DoctorDetails'
import BookAppointment from './Pages/patient/BookAppointment'
import BookAppointmentDetails from './Pages/patient/BookAppointmentDetails'
import AppointmentConfirmation from './Pages/patient/AppointmentConfirmation'
import MyProfile from './Pages/patient/MyProfile'
import MyAppointments from "./Pages/patient/MyAppointments";
import AdminDashboard from './Pages/admin/AdminDashboard'
import AdminLogin from './Pages/admin/AdminLogin'



function App() {

  return (
    <>
      <Routes>

        <Route path='' element={<Landing/>} />

        <Route path='/role-selection' element={<RoleSelection/>} />

        <Route path='/home' element={<Home/>} />

        <Route path='/login' element={<Login/>} />

        <Route path='/register' element={<Register/>} />

        <Route path='/patient-dashboard' element={<PatientDashboard/>} />

        <Route path="/appointment-details" element={<AppointmentDetails />} />

        <Route path="/find-doctors" element={<FindDoctors />} />

        <Route path='/doctor-details' element={<DoctorDetails />} />

        <Route path="/book-appointment" element={<BookAppointment />} />

        <Route path="/book-appointment-details" element={<BookAppointmentDetails />} />

        <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />

        <Route path="/my-profile" element={<MyProfile />} />

        <Route path="/my-appointments" element={<MyAppointments />} />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />

      </Routes>
    </>
  )
}

export default App
