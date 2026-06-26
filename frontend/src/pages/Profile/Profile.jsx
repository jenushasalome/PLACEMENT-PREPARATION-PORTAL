import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../assets/css/Profile.css";

function Profile() {
  const [collapsed, setCollapsed] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <div className="profile-content">

          <h1>My Profile</h1>

          {/* Profile Card */}
          <div className="profile-card">

            <div className="profile-top">

              <div className="profile-image">
                <i className="fa-solid fa-user"></i>
              </div>

              <div className="profile-info">
                <h2>{user?.name}</h2>
                <p>{user?.email}</p>

                <button className="edit-btn">
                  <i className="fa-solid fa-pen"></i>
                  Edit Profile
                </button>
              </div>

            </div>

          </div>

          {/* Personal Information */}

          <div className="profile-section">

            <h2>Personal Information</h2>

            <div className="profile-grid">

              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                />
              </div>

              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                />
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="input-group">
                <label>Gender</label>

                <select>
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

              </div>

              <div className="input-group">
                <label>Date of Birth</label>

                <input type="date" />
              </div>

            </div>

          </div>

          {/* Academic Details */}

          <div className="profile-section">

            <h2>Academic Details</h2>

            <div className="profile-grid">

              <div className="input-group">
                <label>College</label>
                <input
                  type="text"
                  placeholder="Enter college name"
                />
              </div>

              <div className="input-group">
                <label>Degree</label>
                <input
                  type="text"
                  placeholder="MCA"
                />
              </div>

              <div className="input-group">
                <label>Department</label>
                <input
                  type="text"
                  placeholder="Computer Applications"
                />
              </div>

              <div className="input-group">
                <label>CGPA</label>
                <input
                  type="text"
                  placeholder="Enter CGPA"
                />
              </div>

            </div>

          </div>

          {/* Skills */}

          <div className="profile-section">

            <h2>Skills</h2>

            <textarea
              placeholder="HTML, CSS, JavaScript, React, Node.js..."
              rows="5"
            ></textarea>

          </div>

          {/* Resume */}

          <div className="profile-section">

            <h2>Resume</h2>

            <input
              type="file"
              accept=".pdf"
            />

          </div>

          <button className="save-btn">
            Save Changes
          </button>

        </div>
      </div>
    </>
  );
}

export default Profile;