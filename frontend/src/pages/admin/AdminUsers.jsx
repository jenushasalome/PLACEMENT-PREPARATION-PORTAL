import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/AdminUsers.css";

function AdminUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data);
    } catch (error) {
      console.error("Get users error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        navigate("/admin/login");
        return;
      }

      setError(
        error.response?.data?.message ||
          "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((previousUsers) =>
        previousUsers.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.error("Delete user error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete user."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="admin-users-page">

      {/* Sidebar */}
      <aside className="admin-users-sidebar">

        <div className="admin-users-logo">
          <i className="fa-solid fa-user-shield"></i>
          <span>Admin Panel</span>
        </div>

        <nav className="admin-users-menu">

          <button
            onClick={() => navigate("/admin/dashboard")}
          >
            <i className="fa-solid fa-chart-line"></i>
            Dashboard
          </button>

          <button className="active">
            <i className="fa-solid fa-users"></i>
            Users
          </button>

          <button>
            <i className="fa-solid fa-brain"></i>
            Aptitude Questions
          </button>

          <button>
            <i className="fa-solid fa-code"></i>
            Coding Questions
          </button>

          <button>
            <i className="fa-solid fa-file-lines"></i>
            Tests
          </button>

          <button>
            <i className="fa-solid fa-bell"></i>
            Reminders
          </button>

        </nav>

        <button
          className="admin-users-logout"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="admin-users-main">

        <div className="admin-users-header">

          <div>
            <h1>Registered Users</h1>
            <p>
              View and manage students registered in the portal.
            </p>
          </div>

          <button
            className="refresh-users-btn"
            onClick={loadUsers}
          >
            <i className="fa-solid fa-rotate"></i>
            Refresh
          </button>

        </div>

        {/* User Count */}
        <div className="users-summary-card">

          <div className="users-summary-icon">
            <i className="fa-solid fa-users"></i>
          </div>

          <div>
            <h2>{users.length}</h2>
            <p>Registered Users</p>
          </div>

        </div>

        {/* Error */}
        {error && (
          <div className="admin-users-error">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="admin-users-loading">
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>Loading users...</p>
          </div>
        ) : (
          <div className="admin-users-table-container">

            {users.length === 0 ? (
              <div className="no-users">
                <i className="fa-solid fa-users"></i>
                <h3>No registered users</h3>
                <p>
                  There are currently no students registered.
                </p>
              </div>
            ) : (
              <table className="admin-users-table">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Tests Taken</th>
                    <th>Coding Solved</th>
                    <th>Joined Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>

                      <td>{index + 1}</td>

                      <td>
                        <div className="user-name-cell">
                          <div className="user-avatar">
                            {user.name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>

                          <span>{user.name}</span>
                        </div>
                      </td>

                      <td>{user.email}</td>

                      <td>{user.testsTaken || 0}</td>

                      <td>{user.codingSolved || 0}</td>

                      <td>
                        {user.createdAt
                          ? new Date(
                              user.createdAt
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td>
                        <button
                          className="delete-user-btn"
                          onClick={() =>
                            handleDelete(
                              user._id,
                              user.name
                            )
                          }
                        >
                          <i className="fa-solid fa-trash"></i>
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            )}

          </div>
        )}

      </main>

    </div>
  );
}

export default AdminUsers;