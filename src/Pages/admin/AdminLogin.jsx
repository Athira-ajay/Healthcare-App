import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaShieldAlt,
    FaEnvelope,
    FaLock,
    FaSignInAlt,
} from "react-icons/fa";
import { adminLoginAPI } from "../../Services/allAPI";



function AdminLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //login
    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await adminLoginAPI({
                email,
                password,
            });

            console.log("Admin login response:", response.data);

            alert("Admin Logged in Successfully");

            if (response.data.length === 0) {

                alert("Invalid admin email or password.");
                return;

            }

            const admin = response.data[0];

            // Make sure this account is actually an admin
            if (admin.role !== "admin") {

                alert("Unauthorized access.");
                return;

            }

            // Store logged-in admin
            localStorage.setItem("loggedInAdmin", JSON.stringify(admin));

            // Go to admin dashboard
            navigate("/admin-dashboard");

        }
        catch (error) {

            console.log("Admin login failed:", error);

            alert("Unable to login. Please try again.");

        }

    };



    return (

        <div className="admin-login-page">

            <div className="admin-login-container">

                {/* Left Section */}
                <div className="admin-login-info">

                    <div className="admin-brand">

                        <FaShieldAlt />

                        <span>
                            MediBridge
                        </span>

                    </div>


                    <div className="admin-info-content">

                        <span className="admin-label">
                            MEDIBRIDGE ADMINISTRATION
                        </span>


                        <h1>
                            Secure access to
                            <br />
                            MediBridge.
                        </h1>


                        <p>
                            Manage doctors, patients, appointments,
                            and healthcare operations from one secure
                            administration portal.
                        </p>


                        <div className="admin-security-note">

                            <FaShieldAlt />

                            <div>

                                <strong>
                                    Authorized Access Only
                                </strong>

                                <span>
                                    This portal is restricted to MediBridge
                                    administrators.
                                </span>

                            </div>

                        </div>

                    </div>

                </div>



                {/* Right Login Section */}
                <div className="admin-login-card">

                    <div className="admin-login-heading">

                        <h2>
                            Admin Login
                        </h2>

                        <p>
                            Sign in to access the administration portal.
                        </p>

                    </div>


                    <form onSubmit={handleLogin}>

                        {/* Email */}
                        <div className="admin-form-group">

                            <label>
                                Admin Email
                            </label>


                            <div className="admin-input-wrapper">

                                <FaEnvelope />

                                <input type="email" placeholder="Enter admin email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                            </div>

                        </div>


                        {/* Password */}
                        <div className="admin-form-group">

                            <label>
                                Password
                            </label>


                            <div className="admin-input-wrapper">

                                <FaLock />

                                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                            </div>

                        </div>


                        {/* Login Button */}
                        <button type="submit" className="admin-login-btn">

                            <FaSignInAlt />

                            <span>
                                Sign In to Admin Portal
                            </span>

                        </button>


                    </form>



                    {/* Security Footer */}
                    <div className="admin-login-footer">

                        <FaLock />

                        <span>
                            Your administrator credentials are protected.
                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminLogin;