import { useState } from "react";
import API from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/events";
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#6c63ff",
    color: "white",
    border: "none",
  },
};

export default Login;
