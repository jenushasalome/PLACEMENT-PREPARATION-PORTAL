import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getDashboard } from "../../services/dashboardService";
import "../../assets/css/Dashboard.css";
import { getProfile } from "../../services/profileService";
function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const [stats, setStats] = useState({
  testsTaken: 0,
  averageScore: 0,
  codingSolved: 0,
  

  upcomingTests: [],
  upcomingInterviews: [],
});
const [profileImage, setProfileImage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  if (user?.id) {
    loadDashboard();
    loadProfileImage();
  }
}, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard(user.id);
      setStats(data);
    } catch (error) {
      console.log("Dashboard Error:", error);
    }
  };
  const loadProfileImage = async () => {
  try {
    const res = await getProfile(user.id);

    setProfileImage(res.data.profileImage);

  } catch (error) {
    console.log("Profile Image Error:", error);
  }
};

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <div className="dashboard-content">

          {/* Dashboard Header */}

          <div className="dashboard-header">
            <div>
              <h1>Dashboard</h1>
              <p>
                Welcome back, {user?.name} 👋
              </p>
            </div>

            <div className="header-right">
              <div className="date-box">
                {today}
              </div>

             <div className="profile-icon">

  {profileImage ? (

    <img
      src={profileImage}
      alt="Profile"
      className="dashboard-profile-image"
    />

  ) : (

    <i className="fa-solid fa-user"></i>

  )}

</div>
            </div>
          </div>

          {/* Statistics */}

          <div className="stats-container">

            <div className="stat-card">
              <div className="card-icon purple">
                <i className="fa-solid fa-file-lines"></i>
              </div>

              <div>
                <h4>Tests Taken</h4>
                <h2>{stats.testsTaken}</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="card-icon green">
                <i className="fa-solid fa-circle-check"></i>
              </div>

              <div>
                <h4>Average Score</h4>
                <h2>{stats.averageScore}%</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="card-icon orange">
                <i className="fa-solid fa-code"></i>
              </div>

              <div>
                <h4>Coding Solved</h4>
                <h2>{stats.codingSolved}</h2>
              </div>
            </div>

           

          </div>

          {}

          <div className="bottom-container">

  {/* Upcoming Tests */}

  <div className="test-card-container">

    <div className="test-header">
      <h2>Upcoming Tests</h2>
      
    </div>

   {stats.upcomingTests.length > 0 ? (

  stats.upcomingTests.map((test) => (

    <div
      key={test._id}
      className="test-item"
    >

      <i className="fa-solid fa-file-lines"></i>

      <div>

        <h4>{test.title}</h4>

        <p>
          {new Date(test.date).toLocaleDateString()}
          {" • "}
          {test.time}
        </p>

      </div>

    </div>

  ))

) : (

  <p>No upcoming tests.</p>

)}

  </div>

  {/* Upcoming Company Interviews */}

  <div className="test-card-container">

    <div className="test-header">
      <h2>Upcoming Company Interviews</h2>
      
    </div>

    {stats.upcomingInterviews.length > 0 ? (

  stats.upcomingInterviews.map((interview) => (

    <div
      key={interview._id}
      className="test-item"
    >

      <i className="fa-solid fa-building"></i>

      <div>

        <h4>
          {interview.companyName}
        </h4>

        <p>

          {interview.role}

          <br />

          {new Date(interview.date).toLocaleDateString()}
          {" • "}
          {interview.time}

        </p>

      </div>

    </div>

  ))

) : (

  <p>No upcoming interviews.</p>

)}

  </div>

</div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;