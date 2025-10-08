import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import "./App.css";
import { FaUserCircle } from "react-icons/fa";

// Issues Page Component
function IssuesPage() {
  const [showForm, setShowForm] = useState(false);
  const [complaint, setComplaint] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("Pending");
    setShowForm(false);
  }

  return (
    <div className="issues-block" style={{
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 6px 24px rgba(0,0,0,0.10)",
      maxWidth: "700px",
      margin: "40px auto",
      padding: "48px"
    }}>
      <h2 style={{ color: "#6a47f2" }}>Issues</h2>
      {!showForm && !status && (
        <>
          <p style={{ fontSize: 18, marginTop: 25 }}>You didn't raise an issue yet.</p>
          <button className="modal-btn" onClick={() => setShowForm(true)} style={{marginTop:32}}>Click here to raise a complaint</button>
        </>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <textarea 
            style={{
              width: "100%",
              height: 100,
              borderRadius: 8,
              padding: 12,
              border: "1px solid #ccc",
              fontSize: 16,
              marginBottom: 24
            }}
            placeholder="Describe your issue..."
            value={complaint}
            onChange={e => setComplaint(e.target.value)}
            required
          />
          <button className="modal-btn" type="submit">Submit</button>
        </form>
      )}
      {status && (
        <div style={{ marginTop: 24, color: "#6a47f2", fontWeight: "bold", fontSize: 18 }}>
          Status: {status}
        </div>
      )}
    </div>
  );
}

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  function handleProfileClick() { setShowModal(true); }
  function handleSignUpClick() { setShowModal(true); }
  function handleSignUp(userData) { if (userData) setUser(userData); setShowModal(false); }

  return (
    <Router>
      <div className="App">
        <header>
          <div className="logo"><h1>CitizenConnect</h1></div>
          <nav>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/issues">Issues</Link></li>
              <li>Representatives</li>
              <li>Updates</li>
              {!user ? (
                <li><button className="signup-btn" onClick={handleSignUpClick}>Sign Up</button></li>
              ) : (
                <li style={{ cursor: "pointer" }} onClick={handleProfileClick}>
                  <FaUserCircle size={28} />
                </li>
              )}
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/issues" element={<IssuesPage />} />
          </Routes>
        </main>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              {!user ? (
                <SignUpForm onSignUp={handleSignUp} />
              ) : (
                <div>
                  <h3 className="modal-title">Basic Info</h3>
                  <p><span className="modal-label">Name:</span> <span className="modal-value">{user.name}</span></p>
                  <p><span className="modal-label">Email:</span> <span className="modal-value">{user.email}</span></p>
                  <p><span className="modal-label">Role:</span> <span className="modal-value">{user.role}</span></p>
                  <button className="modal-btn" onClick={() => setShowModal(false)}>Close</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

function SignUpForm({ onSignUp }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Citizen");

  function handleSubmit(e) {
    e.preventDefault();
    onSignUp({ name, email, role });
  }
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="modal-title">Sign Up</h3>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" required />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="Citizen">Citizen</option>
        <option value="Politician">Politician</option>
      </select>
      <br/><br/>
      <button className="modal-btn" type="submit">OK</button>
      <button className="modal-btn" type="button" onClick={() => onSignUp(null)} style={{marginLeft:8}}>Cancel</button>
    </form>
  );
}

export default App;
