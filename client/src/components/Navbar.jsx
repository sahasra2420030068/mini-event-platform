import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        padding: "15px 40px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3 style={{ margin: 0 }}>Mini Event Platform</h3>

      <button
        onClick={handleLogout}
        style={{
          padding: "8px 15px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
