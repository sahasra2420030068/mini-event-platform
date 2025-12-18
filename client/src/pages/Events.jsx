import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    const res = await API.get("/events");
    if (Array.isArray(res.data)) setEvents(res.data);
    else if (Array.isArray(res.data.events)) setEvents(res.data.events);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRSVP = async (id) => {
    try {
      await API.post(`/events/${id}/rsvp`);
      alert("RSVP successful");
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || "RSVP failed");
    }
  };

  const handleLeave = async (id) => {
    try {
      await API.post(`/events/${id}/leave`);
      alert("RSVP removed");
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Leave failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: 40 }}>
      {/* HEADER */}
      <div style={headerStyle}>
        <h1>🎉 Events</h1>
        <div>
          <button onClick={() => navigate("/create")} style={createBtn}>
            + Create Event
          </button>
          <button onClick={logout} style={logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      {/* EVENTS */}
      {events.map((e) => (
        <div key={e._id} style={card}>
          {e.image && (
            <img
              src={`http://localhost:5001${e.image}`}
              alt={e.title}
              style={img}
            />
          )}

          <h3>{e.title}</h3>
          <p>{e.description}</p>
          <p>📍 {e.location}</p>
          <p>
            👥 {e.attendees?.length || 0} / {e.capacity}
          </p>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => handleRSVP(e._id)} style={rsvpBtn}>
              RSVP
            </button>
            <button onClick={() => handleLeave(e._id)} style={leaveBtn}>
              Leave
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

/* -------- STYLES -------- */

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 30,
};

const card = {
  maxWidth: 600,
  border: "1px solid #ddd",
  padding: 20,
  borderRadius: 10,
  marginBottom: 20,
  background: "#fff",
};

const img = {
  width: "100%",
  height: 200,
  objectFit: "cover",
  borderRadius: 8,
  marginBottom: 10,
};

const rsvpBtn = {
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  padding: "8px 16px",
  borderRadius: 6,
};

const leaveBtn = {
  background: "#e74c3c",
  color: "#fff",
  border: "none",
  padding: "8px 16px",
  borderRadius: 6,
};

const createBtn = {
  background: "#0984e3",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: 6,
  marginRight: 10,
};

const logoutBtn = {
  background: "#2d3436",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: 6,
};

export default Events;
