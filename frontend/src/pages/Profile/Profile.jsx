import {
  useEffect,
  useState,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfile,
  updateProfile,
  uploadImage,
} from "../../services/profileService";
import Sidebar from "../../components/Sidebar";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    profileImage: "",
    about: "",

    academic: {
      college: "",
      degree: "",
      branch: "",
      year: "",
      cgpa: "",
    },

    skills: [],
    selectedCompanies: [],
  });

  const [skillInput, setSkillInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");


const fileInputRef = useRef();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile(user.id);
      setProfile(res.data);

if (
  res.data.about ||
  res.data.academic.college ||
  res.data.skills.length > 0
) {
  setEditMode(false);
}
    } catch (err) {
      console.log(err);
    }
  };
   const handleImageUpload = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  try {

    const res = await uploadImage(file);

    setProfile({

      ...profile,

      profileImage: res.data.imageUrl,

    });

  }

  catch (err) {

    console.log(err);

    alert("Image upload failed");

  }

};
  

  const saveProfile = async () => {
    try {
      await updateProfile(user.id, profile);
     

      alert("Profile Updated Successfully!");
      setEditMode(false);

    } catch (err) {
      console.log(err);
      alert("Failed to update profile");
    }
  };
  const enableEdit = () => {
  setEditMode(true);
};

  

  const addSkill = () => {
    if (
      skillInput.trim() &&
      !profile.skills.includes(skillInput)
    ) {
      setProfile({
        ...profile,
        skills: [...profile.skills, skillInput],
      });

      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skill),
    });
  };

 

  const addCompany = () => {
    if (
      companyInput.trim() &&
      !profile.selectedCompanies.includes(companyInput)
    ) {
      setProfile({
        ...profile,
        selectedCompanies: [
          ...profile.selectedCompanies,
          companyInput,
        ],
      });

      setCompanyInput("");
    }
  };

  const removeCompany = (company) => {
    setProfile({
      ...profile,
      selectedCompanies:
        profile.selectedCompanies.filter(
          (c) => c !== company
        ),
    });
  };

  

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
  <div className="dashboard-container">

    <Sidebar
      collapsed={collapsed}
      setCollapsed={setCollapsed}
    />

    <div className="profile-content">

      <div className="profile-page">

      <h1>My Profile</h1>

      {/* Profile Image */}

    <div className="profile-header-card">

  <div className="profile-image-wrapper">

    <img
      src={
        profile.profileImage ||
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      }
      alt="Profile"
      className="profile-image"
    />

    {editMode && (

      <button
        className="camera-btn"
        onClick={() =>
          fileInputRef.current.click()
        }
      >
        <i className="fa-solid fa-camera"></i>
      </button>

    )}

  </div>

  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    style={{ display: "none" }}
    onChange={handleImageUpload}
  />

  <h2>{user?.name}</h2>

  <p className="profile-degree">
    {profile.academic.degree || "Student"}
  </p>

</div>
      {/* About */}

      <div className="profile-card">

        <h2>About Me</h2>

        {editMode ? (
  <textarea
    rows="5"
    value={profile.about}
    onChange={(e) =>
      setProfile({
        ...profile,
        about: e.target.value,
      })
    }
    placeholder="Tell something about yourself..."
  />
) : (
  <p className="about-text">
    {profile.about || "No information added."}
  </p>
)}

      </div>

      {/* Academic */}

      <div className="profile-card">

        <h2>Academic Details</h2>

        {editMode ? (
  <input
    placeholder="College"
    value={profile.academic.college}
    onChange={(e) =>
      setProfile({
        ...profile,
        academic: {
          ...profile.academic,
          college: e.target.value,
        },
      })
    }
  />
) : (
  <div className="detail-row">
    <span className="detail-label">College</span>
    <span className="detail-value">
      {profile.academic.college}
    </span>
  </div>
)}

        {editMode ? (
  <input
    placeholder="Degree"
    value={profile.academic.degree}
    onChange={(e) =>
      setProfile({
        ...profile,
        academic: {
          ...profile.academic,
          degree: e.target.value,
        },
      })
    }
  />
) : (
  <div className="detail-row">
    <span className="detail-label">Degree</span>
    <span className="detail-value">
      {profile.academic.degree}
    </span>
  </div>
)}

       {editMode ? (
  <input
    placeholder="Branch"
    value={profile.academic.branch}
    onChange={(e) =>
      setProfile({
        ...profile,
        academic: {
          ...profile.academic,
          branch: e.target.value,
        },
      })
    }
  />
) : (
  <div className="detail-row">
    <span className="detail-label">Branch</span>
    <span className="detail-value">
      {profile.academic.branch}
    </span>
  </div>
)}

        {editMode ? (
  <input
    placeholder="Year"
    value={profile.academic.year}
    onChange={(e) =>
      setProfile({
        ...profile,
        academic: {
          ...profile.academic,
          year: e.target.value,
        },
      })
    }
  />
) : (
  <div className="detail-row">
    <span className="detail-label">Year</span>
    <span className="detail-value">
      {profile.academic.year}
    </span>
  </div>
)}


      </div>

      {/* Skills */}

      <div className="profile-card">

        <h2>Skills</h2>

      {editMode && (
  <div className="add-row">

    <input
      placeholder="Add Skill"
      value={skillInput}
      onChange={(e) =>
        setSkillInput(e.target.value)
      }
    />

    <button onClick={addSkill}>
      Add
    </button>

  </div>
)}

        <div className="tags">

          {profile.skills.map((skill) => (

            <span
              key={skill}
              className="tag"
            >
              {skill}

              {editMode && (
  <button
    onClick={() =>
      removeSkill(skill)
    }
  >
    ×
  </button>
)}

            </span>

          ))}

        </div>

      </div>

      {/* Companies */}

      <div className="profile-card">

        <h2>Selected Companies</h2>

        {editMode && (
  <div className="add-row">

          <input
            placeholder="Add Company"
            value={companyInput}
            
            onChange={(e) =>
              setCompanyInput(e.target.value)
            }
          />

          <button
  onClick={addCompany}
  
>
  Add
</button>

       </div>
)}

        <div className="tags">

          {profile.selectedCompanies.map(
            (company) => (

              <span
                key={company}
                className="tag"
              >
                {company}

                {editMode && (
  <button
    onClick={() =>
      removeCompany(company)
    }
  >
    ×
  </button>
)}

              </span>

            )
          )}

        </div>

      </div>

      {/* Buttons */}

      <div className="profile-buttons">

  {editMode ? (

    <>
      <button
        className="save-btn"
        onClick={saveProfile}
      >
        Save Profile
      </button>

      <button
        className="cancel-btn"
        onClick={()=>{
          loadProfile();
          setEditMode(false);
        }}
      >
        Cancel
      </button>

    </>

  ) : (

    <button
      className="edit-btn"
      onClick={enableEdit}
    >
      Edit Profile
    </button>

  )}

  <button
    className="logout-btn"
    onClick={logout}
  >
    Logout
  </button>

</div>

         </div>

    </div>

  </div>
);
}