import React, { useState } from "react";

export default function Issues() {
  const [showForm, setShowForm] = useState(false);
  const [complaint, setComplaint] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("Pending");
    setShowForm(false);
    setComplaint("");
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <div className="card">
        <h2 style={{ color: "#6a47f2" }}>Issues</h2>

        {!showForm && !status && (
          <>
            <p style={{ fontSize: 18, marginTop: 18, color: "#6a47f2" }}>You didn't raise an issue yet.</p>
            <div style={{ marginTop: 24 }}>
              <button className="btn-primary" onClick={() => setShowForm(true)}>Raise a complaint</button>
            </div>
          </>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
            <textarea
              style={{
                width: "100%",
                height: 120,
                borderRadius: 8,
                padding: 12,
                border: "1px solid #ddd",
                fontSize: 16,
                marginBottom: 12
              }}
              placeholder="Describe your issue..."
              value={complaint}
              onChange={e => setComplaint(e.target.value)}
              required
            />
            <div>
              <button className="btn-primary" type="submit">Submit</button>
              <button type="button" className="btn-ghost" style={{marginLeft:12}} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        )}

        {status && (
          <div style={{ marginTop: 20, color: "#6a47f2", fontWeight: 700 }}>
            Status: {status}
          </div>
        )}
      </div>
    </div>
  );
}
