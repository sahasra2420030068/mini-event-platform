import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    capacity: "",
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (image) data.append("image", image);

    try {
      await API.post("/events", data);
      alert("Event created successfully");
      navigate("/");
    } catch {
      alert("Event creation failed");
    }
  };

  return (
    <div style={page}>
      <form onSubmit={handleSubmit} style={card}>
        <h2>Create Event</h2>

        <input name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />
        <input name="capacity" type="number" placeholder="Capacity" onChange={handleChange} required />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

/* -------- STYLES -------- */

const page = {
  display: "flex",
  justifyContent: "center",
  marginTop: 60,
};

const card = {
  width: 400,
  padding: 30,
  borderRadius: 12,
  background: "#fff",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

export default CreateEvent;
