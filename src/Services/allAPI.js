import apiService from "../API/api-services";


// Register a new patient
export const registerAPI = async (userData) => {
  return await apiService("POST", "/users", userData);
};

// Check whether email already exists
export const checkEmailAPI = async (email) => {
    return await apiService("GET",`/users?email=${email}`);
};

// Login API
export const loginAPI = async (loginData) => {
    return await apiService("GET",`/users?email=${loginData.email}&password=${loginData.password}`);
};

// Admin Login API
export const adminLoginAPI = async (loginData) => {
  return await apiService("GET",`/admins?email=${loginData.email}&password=${loginData.password}`);
};

// Get all doctors
export const getDoctorsAPI = async () => {
  return await apiService("GET", "/doctors", {});
};

// Get all patients
export const getUsersAPI = async () => {
  return await apiService("GET", "/users", {});
};


// Get all contact messages
export const getMessagesAPI = async () => {
  return await apiService("GET", "/messages", {});
};

// Create a new appointment
export const createAppointmentAPI = async (appointmentData) => {
  return await apiService("POST", "/appointments", appointmentData);
};

// Get all appointments
export const getAppointmentsAPI = async () => {
  return await apiService("GET", "/appointments", {});
};

// Get patient profile
export const getProfileAPI = async (id) => {
  return await apiService("GET", `/users/${id}`, {});
};

// Update patient profile
export const updateProfileAPI = async (id, userData) => {
  return await apiService("PUT", `/users/${id}`, userData);
};

// Update appointment status
export const updateAppointmentStatusAPI = async (id, status) => {
    return await apiService("PATCH",`/appointments/${id}`,
        {
            status: status
        }
    );

};

// Cancel appointment
export const cancelAppointmentAPI = async (id) => {
  return await updateAppointmentStatusAPI(id, "Cancelled");
};

// Send contact message
export const sendContactMessageAPI = async (messageData) => {
  return await apiService("POST", "/messages", messageData);
};