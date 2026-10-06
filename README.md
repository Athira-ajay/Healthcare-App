# 🏥 MediBridge Care

**MediBridge Care** is a modern healthcare appointment management web application designed to make doctor discovery, appointment booking, and patient management simple and convenient.

The application provides separate experiences for **patients** and **administrators**, allowing patients to manage their appointments and profiles while administrators can monitor and manage doctors, patients, appointments, and contact messages from a centralized dashboard.

🔗 **Live Demo:** [MediBridge Care](https://healthcare-app-taupe.vercel.app/)

🔗 **GitHub Repository:** [Healthcare-App](https://github.com/Athira-ajay/Healthcare-App)

---

## ✨ Features

### 👤 Patient Features

- Patient registration and login
- Patient profile management
- Browse available doctors
- View doctor information and consultation details
- Book doctor appointments
- View upcoming appointments
- View confirmed and completed appointments
- Cancel appointments
- View appointment status
- View appointment date, time, location, and consultation fee
- Contact the healthcare service through a contact form

### 🧑‍💼 Admin Features

- Admin login
- Admin dashboard
- View total appointments
- View pending, confirmed, completed, and cancelled appointments
- Manage appointment status
- View all registered patients
- View available doctors
- View unavailable doctors
- View patient contact messages
- Monitor recent appointments
- View system and admin information

### 📅 Appointment Management

The appointment system allows patients to:

1. Select a doctor
2. View doctor details
3. Choose an appointment date and time
4. Submit an appointment request
5. Track the appointment status
6. Cancel an appointment when required

Appointments can have different statuses:

- **Pending**
- **Confirmed**
- **Completed**
- **Cancelled**

---

## 🛠️ Technologies Used

### Frontend

- **React.js** – Building the user interface
- **JavaScript (ES6+)** – Application logic
- **HTML5** – Page structure
- **CSS3** – Styling and responsive layouts
- **React Router** – Navigation between pages
- **React Icons** – Icons throughout the application
- **Axios** – Making API requests

### Backend / API

- **REST API architecture**
- **JSON Server** – Used for storing and managing application data during development
- API service layer for centralized HTTP requests

### Deployment

- **Vercel** – Frontend deployment
- **GitHub** – Source code and version control

---

## 🏗️ Application Architecture

The project follows a component-based React architecture.

```text
User
 │
 ▼
React Components
 │
 ├── Patient Pages
 │   ├── Login
 │   ├── Register
 │   ├── Home
 │   ├── Doctors
 │   ├── Book Appointment
 │   ├── My Appointments
 │   └── My Profile
 │
 └── Admin Pages
     ├── Admin Login
     ├── Dashboard
     ├── Appointments
     ├── Doctors
     ├── Patients
     ├── Messages
     └── Settings
 │
 ▼
allAPI.js
 │
 ▼
api-services.js
 │
 ▼
REST API / JSON Server
```

The API functions are separated into `allAPI.js`, keeping API-related operations separate from the React components.

---

## 🔌 API Operations

The application uses different HTTP methods depending on the operation.

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/users` | Register a new patient |
| GET | `/users?email=...` | Check whether an email exists |
| GET | `/users?email=...&password=...` | Patient login |
| GET | `/admins?email=...&password=...` | Admin login |
| GET | `/doctors` | Get all doctors |
| GET | `/users` | Get all patients |
| GET | `/messages` | Get contact messages |
| POST | `/appointments` | Create an appointment |
| GET | `/appointments` | Get all appointments |
| GET | `/users/:id` | Get a patient's profile |
| PUT | `/users/:id` | Update a patient's profile |
| PATCH | `/appointments/:id` | Update appointment status |
| POST | `/messages` | Send a contact message |

---

## 🔄 Appointment Status Management

Instead of deleting an appointment when a patient cancels it, the application updates the appointment's status to **Cancelled**.

For example:

```javascript
cancelAppointmentAPI(id)
```

internally updates the appointment using:

```javascript
PATCH /appointments/:id
```

with:

```javascript
{
  status: "Cancelled"
}
```

This allows appointment records to remain available for administrative tracking and appointment history.

---

## 📂 Project Structure

A simplified structure of the project is:

```text
Healthcare-App/
│
├── public/
│
├── src/
│   │
│   ├── API/
│   │   └── api-services.js
│   │
│   ├── components/
│   │
│   ├── pages/
│   │   ├── Patient/
│   │   └── Admin/
│   │
│   ├── assets/
│   │
│   ├── allAPI.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
│
├── package.json
├── package-lock.json
└── README.md
```

> The exact folder structure may vary depending on the current version of the project.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/Athira-ajay/Healthcare-App.git
```

Navigate into the project:

```bash
cd Healthcare-App
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

---

## 🌐 Live Application

You can access the deployed application here:

👉 **https://healthcare-app-taupe.vercel.app/**

---

## 👥 User Roles

### Patient

Patients can:

- Create an account
- Log in
- Browse doctors
- Book appointments
- View appointment details
- Cancel appointments
- Manage their profile

### Admin

Administrators can:

- Log in to the admin dashboard
- Monitor appointments
- Change appointment statuses
- View patients
- View doctors
- Monitor contact messages
- View dashboard statistics

---

## 📊 Admin Dashboard

The admin dashboard provides an overview of the healthcare system.

It displays statistics such as:

- Total appointments
- Pending appointments
- Confirmed appointments
- Completed appointments
- Cancelled appointments
- Total patients
- Total doctors
- Total messages

The dashboard also provides a recent appointments section for quickly monitoring appointment activity.

---

## 🎨 User Interface

The application focuses on providing a clean and simple healthcare-oriented interface.

Key UI considerations include:

- Clean navigation
- Dashboard-based layouts
- Appointment status indicators
- Doctor profile cards
- Patient profile management
- Responsive layouts
- Reusable React components
- Icon-based visual elements

---

## 🔐 Authentication

The application provides separate login flows for:

- Patients
- Administrators

Logged-in patient information is maintained using browser `localStorage`, allowing the application to identify the currently logged-in patient across relevant pages.

---

## 🎯 Project Objectives

The main objectives of MediBridge Care are to:

- Simplify doctor appointment booking
- Provide patients with easy access to healthcare services
- Allow patients to manage their appointments
- Provide administrators with a centralized management dashboard
- Practice React component development
- Implement REST API communication
- Understand CRUD operations
- Implement client-side routing
- Build responsive user interfaces

---

## 📚 Concepts Demonstrated

This project demonstrates practical knowledge of:

- React Components
- React Hooks
- `useState`
- `useEffect`
- React Router
- Conditional Rendering
- Event Handling
- Form Handling
- API Integration
- Axios
- REST APIs
- HTTP Methods
- CRUD Operations
- JavaScript Array Methods
- `localStorage`
- Responsive CSS
- Dashboard Design
- Git & GitHub
- Vercel Deployment

---

## 🔮 Future Improvements

Possible future improvements include:

- Secure backend authentication
- Password hashing
- Role-based authentication and authorization
- Doctor-side dashboard
- Email notifications for appointments
- Appointment reminders
- Online consultation functionality
- Real-time notifications
- Database integration with a production database
- Improved validation and error handling
- Medical record management

---

## 👩‍💻 Author

### Athira Ajay

GitHub: [@Athira-ajay](https://github.com/Athira-ajay)

