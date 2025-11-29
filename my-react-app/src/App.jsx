// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Representatives from "./Representatives";
import Updates from "./Updates";
import Issues from "./Issues";
import NewsPage from "./pages/NewsPage";
import NewsTicker from "./components/NewsTicker";
import "./App.css";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

/*
  Full App.jsx: header + routing + modal + news ticker integrated
  - Adds route for /news/:id using NewsPage
  - Renders <NewsTicker /> at bottom of .app-root
*/

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleProfileClick() { setShowModal(true); }
  function handleSignUpClick() { setShowModal(true); }
  function handleSignUp(userData) { if (userData) setUser(userData); setShowModal(false); }
  function closeModal() { setShowModal(false); }
  function toggleMenu() { setMenuOpen(v => !v); }

  return (
    <Router>
      <div className="app-root">
        <header className="site-header">
          <div className="header-inner">
            <div className="logo">
              <Link to="/" onClick={() => setMenuOpen(false)} aria-label="CitizenConnect home">
                <span className="logo-mark">🟣</span>
                <span className="logo-text">CitizenConnect</span>
              </Link>
            </div>

            <nav className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
              <ul>
                <li><Link to="/" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
                <li><Link to="/issues" onClick={() => setMenuOpen(false)}>Issues</Link></li>
                <li><Link to="/representatives" onClick={() => setMenuOpen(false)}>Representatives</Link></li>
                <li><Link to="/updates" onClick={() => setMenuOpen(false)}>Updates</Link></li>
              </ul>
            </nav>

            <div className="header-actions">
              {!user ? (
                <button className="signup-btn" onClick={handleSignUpClick}>Sign Up</button>
              ) : (
                <button className="icon-btn" onClick={handleProfileClick} aria-label="Open profile">
                  <FaUserCircle size={26} />
                </button>
              )}

              <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </header>

        <main className="site-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/representatives" element={<Representatives />} />
            <Route path="/updates" element={<Updates />} />
            {/* News detail route */}
            <Route path="/news/:id" element={<NewsPage />} />
          </Routes>
        </main>

        {showModal && (
          <div className="modal-overlay" role="dialog" aria-modal="true" onClick={closeModal}>
            <div className="modal-panel" onClick={e => e.stopPropagation()}>
              {!user ? (
                <SignUpForm onSignUp={handleSignUp} onCancel={() => setShowModal(false)} />
              ) : (
                <ProfileView user={user} onClose={() => setShowModal(false)} />
              )}
            </div>
          </div>
        )}

        {/* persistent news ticker at bottom of page */}
        <NewsTicker />
      </div>
    </Router>
  );
};

/* SignUp form component */
function SignUpForm({ onSignUp, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Citizen");

  function submit(e) {
    e.preventDefault();
    onSignUp({ name, email, role });
  }

  return (
    <form className="modal-form" onSubmit={submit}>
      <h3 className="modal-title">Sign Up</h3>

      <label className="field">
        <span className="field-label">Name</span>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required />
      </label>

      <label className="field">
        <span className="field-label">Email</span>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" type="email" required />
      </label>

      <label className="field">
        <span className="field-label">Role</span>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option>Citizen</option>
          <option>Politician</option>
          <option>Reporter</option>
        </select>
      </label>

      <div className="modal-actions">
        <button type="submit" className="btn-primary">Create account</button>
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

/* Profile view when user is signed up */
function ProfileView({ user, onClose }) {
  return (
    <div className="profile-view">
      <h3 className="modal-title">Profile</h3>
    <p><strong>Name:</strong> {user.name}</p>
    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>Role:</strong> {user.role}</p>
    <div style={{ marginTop: 16 }}>
      <button className="btn-primary" onClick={onClose}>Close</button>
    </div>
  </div>
  );
}

export default App;
