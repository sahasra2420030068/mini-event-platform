import { useEffect, useState } from "react";
import API from "../services/api";

const Events = () => {
  const [events, setEvents] = useState([]);

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
      alert("Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // RSVP
  const handleRSVP = async (id) => {
    try {
      await API.post(`/events/${id}/rsvp`);
      alert("RSVP successful");
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || "RSVP failed");
    }
  };

  // Leave RSVP
  const handleLeaveRSVP = async (id) => {
    try {
      await API.post(`/events/${id}/leave`);
      alert("RSVP removed");
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Leave RSVP failed");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1>🎉 Events</h1>
        <div>
          <button
            onClick={() => (window.location.href = "/create")}
            style={styles.createBtn}
          >
            + Create Event
          </button>
          <button onClick={logout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      {/* EVENTS LIST */}
      <div style={styles.grid}>
        {events.map((event) => (
          <div key={event._id} style={styles.card}>
            {/* EVENT IMAGE */}
            {event.image && (
              <img
                src={`http://localhost:5001${event.image}`}
                alt={event.title}
                style={styles.image}
              />
            )}

            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>📍 {event.location}</p>
            <p>
              👥 {event.attendees} / {event.capacity}
            </p>

            <div style={styles.btnGroup}>
              <button
                onClick={() => handleRSVP(event._id)}
                style={styles.rsvpBtn}
              >
                RSVP
              </button>

              <button
                onClick={() => handleLeaveRSVP(event._id)}
                style={styles.leaveBtn}
              >
                Leave
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------- STYLES ---------- */

const styles = {
  page: {
    padding: "30px",
    background: "#f4f6f8",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  card: {
    width: "300px",
    background: "#fff",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  btnGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  rsvpBtn: {
    padding: "8px 14px",
    background: "#6c63ff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  leaveBtn: {
    padding: "8px 14px",
    background: "#ff5c5c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  createBtn: {
    padding: "8px 14px",
    background: "#00b894",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    marginRight: "10px",
    cursor: "pointer",
  },
  logoutBtn: {
    padding: "8px 14px",
    background: "#d63031",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Events;
