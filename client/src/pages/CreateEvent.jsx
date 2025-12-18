import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (image) data.append("image", image);

    await API.post("/events", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigate("/events");
  };

  return (
    <form onSubmit={submitHandler}>
      <input placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Location" onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <input type="number" placeholder="Capacity" onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button>Create Event</button>
    </form>
  );
};

export default CreateEvent;
