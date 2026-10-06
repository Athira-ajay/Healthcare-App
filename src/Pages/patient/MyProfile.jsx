import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaUser,
  FaEdit,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaSave,
  FaCheckCircle,
} from "react-icons/fa";

import {
  getProfileAPI,
  updateProfileAPI,
} from "../../Services/allAPI";

import profileBg from "../../assets/images/profilebg.jpg";


function MyProfile() {

  const navigate = useNavigate();

  // Profile data
  const [profile, setProfile] = useState(null);

  // Edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Loading
  const [loading, setLoading] = useState(true);

  // Saving
  const [saving, setSaving] = useState(false);

  // Get logged-in patient's profile
  useEffect(() => {

    const getProfile = async () => {

      try {

        const storedPatient = localStorage.getItem("loggedInUser");

        if (!storedPatient) {

          navigate("/login");

          return;

        }

        const loggedInPatient = JSON.parse(storedPatient);

        const response = await getProfileAPI(loggedInPatient.id);

        console.log("Profile received:",response.data);

        setProfile(response.data);

      }
      catch (error) {

        console.log("Failed to fetch profile:",error);

      }
      finally {

        setLoading(false);

      }

    };


    getProfile();

  }, [navigate]);



  // Handle input changes
  const handleChange = (e) => {

    const { name, value } = e.target;

    setProfile((previousProfile) => ({...previousProfile,[name]: value,}));

  };

  // Save profile
  const handleSave = async () => {

    try {

      setSaving(true);

      const updatedProfile = {...profile,};

      const response = await updateProfileAPI(
          profile.id,
          updatedProfile
        );

      console.log("Profile updated:",response.data);


      // Update localStorage
      const storedPatient = localStorage.getItem("loggedInUser");

      if (storedPatient) {

        const loggedInPatient = JSON.parse(storedPatient);

        const updatedLoggedInPatient = {...loggedInPatient,...response.data,};

        localStorage.setItem("loggedInUser",JSON.stringify(updatedLoggedInPatient));

      }

      setProfile(response.data);

      setIsEditing(false);

      alert("Profile updated successfully!");

    }
    catch (error) {

      console.log("Failed to update profile:",error);

      alert("Failed to update profile. Please try again.");

    }
    finally {

      setSaving(false);

    }

  };

  // Loading screen
  if (loading) {

    return (

      <div className="my-profile-page">

        <div className="profile-loading">

          <h4>
            Loading profile...
          </h4>

        </div>

      </div>

    );

  }

  // Profile not found
  if (!profile) {

    return (

      <div className="my-profile-page">

        <div className="profile-not-found">

          <FaUser />

          <h4>
            Profile not found
          </h4>

          <button className="profile-back-btn" onClick={() =>
              navigate("/patient-dashboard")
            }
          >

            <FaArrowLeft />

            <span>
              Back to Dashboard
            </span>

          </button>

        </div>

      </div>

    );

  }



  return (

    <div className="my-profile-page">


      {/* Back Button */}
      <button className="profile-back-btn" onClick={() =>
          navigate("/patient-dashboard")
        }
      >

        <FaArrowLeft />

        <span>
          Back to Dashboard
        </span>

      </button>



      {/* Page Heading */}
      <div className="profile-page-heading">

        <span>
          MEDIBRIDGE CARE
        </span>

        <h1>
          My Profile
        </h1>

        <p>
          Manage your personal information and account details.
        </p>

      </div>



      {/* Main Profile Card */}
      <div className="professional-profile-card">


        {/* LEFT SIDE */}
        <div className="profile-visual-side"
          style={{backgroundImage: `url(${profileBg})`,}}>

          <div className="profile-visual-overlay">

            <span>
              MEDIBRIDGE CARE
            </span>


            <h2>
              Your Profile,
              <br />
              Your Journey.
            </h2>


            <p>
              Keep your personal information
              updated for a better healthcare
              experience.
            </p>

          </div>

        </div>



        {/* RIGHT SIDE */}
        <div className="profile-details-side">


          {/* Profile Header */}
          <div className="professional-profile-header">


            <div className="professional-avatar">

              <FaUser />

            </div>


            <div className="professional-profile-info">

              <span>
                Patient Profile
              </span>

              <h2>
                {profile.name || "--"}
              </h2>

              <p>
                <FaEnvelope />
                {profile.email || "--"}
              </p>

            </div>


            {/* Edit Button */}
            {!isEditing && (

              <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>

                <FaEdit />

                Edit Profile

              </button>

            )}

          </div>



          {/* Personal Information */}
          <div className="personal-profile-section">

            <div className="profile-section-title">

              <div className="profile-section-icon">

                <FaUser />

              </div>

              <div>

                <h3>
                  Personal Information
                </h3>

                <p>
                  Your basic personal details
                </p>

              </div>

            </div>



            {/* Profile Fields */}
            <div className="professional-profile-grid">


              {/* Full Name */}
              <div className="professional-profile-field">

                <label>
                  Full Name
                </label>


                {isEditing ? (

                  <input type="text" name="name" value={profile.name || ""} onChange={handleChange}/>

                ) : (

                  <strong>
                    {profile.name || "--"}
                  </strong>

                )}

              </div>



              {/* Age */}
              <div className="professional-profile-field">

                <label>
                  Age
                </label>


                {isEditing ? (

                  <input type="number"  name="age" value={profile.age || ""} onChange={handleChange}/>

                ) : (

                  <strong>
                    {profile.age || "--"}
                  </strong>

                )}

              </div>



              {/* Gender */}
              <div className="professional-profile-field">

                <label>
                  Gender
                </label>


                {isEditing ? (

                  <select
                    name="gender" value={profile.gender || ""} onChange={handleChange}>

                    <option value="">
                      Select Gender
                    </option>

                    <option value="female">
                      Female
                    </option>

                    <option value="male">
                      Male
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                ) : (

                  <strong>

                    {profile.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : "--"}

                  </strong>

                )}

              </div>



              {/* Phone */}
              <div className="professional-profile-field">

                <label>
                  Phone Number
                </label>


                {isEditing ? (

                  <input type="text" name="phone" value={profile.phone || ""} onChange={handleChange}/>

                ) : (

                  <strong>

                    <FaPhone />

                    {profile.phone || "--"}

                  </strong>

                )}

              </div>


              {/* Email */}
              <div className="professional-profile-field">

                <label>
                  Email Address
                </label>


                <strong>

                  <FaEnvelope />

                  {profile.email || "--"}

                </strong>


                {isEditing && (

                  <small>
                    Email address cannot be changed.
                  </small>

                )}

              </div>


              {/* Address */}
              <div className="professional-profile-field">

                <label>
                  Address
                </label>


                {isEditing ? (

                  <input type="text" name="address" value={profile.address || ""} onChange={handleChange}/>

                ) : (

                  <strong>

                    <FaHome />

                    {profile.address || "--"}

                  </strong>

                )}

              </div>

            </div>

          </div>



          {/* Profile Actions */}
          {isEditing && (

            <div className="profile-edit-actions">

              <button className="cancel-profile-btn"  onClick={() => setIsEditing(false)} disabled={saving}>
                Cancel
              </button>

              <button className="save-profile-btn" onClick={handleSave} disabled={saving}>

                {saving ? (

                  <>
                    <FaCheckCircle />
                    Saving...
                  </>

                ) : (

                  <>
                    <FaSave />
                    Save Changes
                  </>

                )}

              </button>

            </div>

          )}


        </div>

      </div>


    </div>

  );

}


export default MyProfile;