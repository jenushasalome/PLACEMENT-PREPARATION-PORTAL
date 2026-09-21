import { useEffect, useState } from "react";
import "../assets/css/Navbar.css";
import axios from "axios";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const userId = user?._id || user?.id;

  const loadNotifications = async () => {
    try {
      if (!userId) return;

      const res = await axios.get(
        `http://localhost:5000/api/notifications/${userId}`
      );

      setNotifications(res.data);
    } catch (error) {
      console.log("Notification error:", error);
    }
  };

  useEffect(() => {
    loadNotifications();

    // Check for new notifications every 10 seconds
    const interval = setInterval(() => {
      loadNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, [userId]);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/notifications/${id}/read`
      );

      loadNotifications();
    } catch (error) {
      console.log("Mark as read error:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/notifications/${userId}/read-all`
      );

      loadNotifications();
    } catch (error) {
      console.log("Mark all as read error:", error);
    }
  };

  return (
    <nav className="navbar">

      {/* LEFT */}
      <div className="nav-left">

        <i className="fa-solid fa-graduation-cap logo-icon"></i>

        <div className="logo-text">
          <h2>PrepPortal</h2>
        </div>

      </div>


      {/* RIGHT */}
      <div className="nav-right">

        {/* NOTIFICATION */}
        <div className="notification-wrapper">

          <button
            className="notification-btn"
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
          >
            <i className="fa-solid fa-bell"></i>

            {unreadCount > 0 && (
              <span className="notification-badge">
                {unreadCount}
              </span>
            )}
          </button>


          {/* DROPDOWN */}
          {showNotifications && (
            <div className="notification-dropdown">

              <div className="notification-header">

                <h3>Notifications</h3>

                {unreadCount > 0 && (
                  <button
                    className="mark-all-btn"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </button>
                )}

              </div>


              {notifications.length === 0 ? (

                <div className="no-notifications">

                  <i className="fa-regular fa-bell"></i>

                  <p>No notifications</p>

                </div>

              ) : (

                <div className="notification-list">

                  {notifications.map((notification) => (

                    <div
                      key={notification._id}
                      className={`notification-item ${
                        !notification.isRead
                          ? "unread"
                          : ""
                      }`}
                      onClick={() => {
                        if (!notification.isRead) {
                          markAsRead(notification._id);
                        }
                      }}
                    >

                      <div className="notification-icon">

                        {notification.type === "test" ? (
                          <i className="fa-solid fa-file-pen"></i>
                        ) : (
                          <i className="fa-solid fa-building"></i>
                        )}

                      </div>


                      <div className="notification-content">

                        <h4>
                          {notification.title}
                        </h4>

                        <p>
                          {notification.message}
                        </p>

                        <small>
                          {new Date(
                            notification.createdAt
                          ).toLocaleString()}
                        </small>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>
          )}

        </div>


        {/* USER NAME */}
        <span>
          Welcome, {user?.name || "Student"}
        </span>

      </div>

    </nav>
  );
}

export default Navbar;