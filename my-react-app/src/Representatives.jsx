import React from "react";

const representatives = [
  { name: "N. Chandrababu Naidu", party: "Telugu Desam Party (TDP)", role: "Chief Minister of Andhra Pradesh (2024–present)", profileUrl: "https://en.wikipedia.org/wiki/N._Chandrababu_Naidu" },
  { name: "Y. S. Jagan Mohan Reddy", party: "YSR Congress Party", role: "Former Chief Minister (2019–2024)", profileUrl: "https://en.wikipedia.org/wiki/Y._S._Jaganmohan_Reddy" },
  { name: "Vangalapudi Anitha", party: "TDP", role: "Minister of Home Affairs & Disaster Management", profileUrl: "https://en.wikipedia.org/wiki/Vangalapudi_Anitha" },
  { name: "T. G. Bharath", party: "TDP", role: "Minister of Industries & Commerce", profileUrl: "https://en.wikipedia.org/wiki/T._G._Bharath" },
  { name: "Ashok Bendalam", party: "TDP", role: "MLA from Ichchapuram", profileUrl: "https://en.wikipedia.org/wiki/Ashok_Bendalam" },
  { name: "Botsa Satyanarayana", party: "YSRCP", role: "Senior politician", profileUrl: "https://en.wikipedia.org/wiki/Botsa_Satyanarayana" }
];

export default function Representatives() {
  return (
    <section style={{ maxWidth: 1200, margin: "40px auto", padding: "0 16px" }}>
      <h2 style={{ color: "#6a47f2", fontWeight: 700, fontSize: 32, textAlign: "center" }}>Andhra Pradesh Politicians & Their Roles</h2>

      <div className="reps-grid" role="list">
        {representatives.map((rep, idx) => (
          <article className="rep-card" key={idx} role="listitem" aria-labelledby={`rep-${idx}`}>
            <div>
              <div id={`rep-${idx}`} className="rep-name">{rep.name}</div>
              <div className="rep-party" style={{marginTop:8}}>{rep.party}</div>
              <div style={{marginTop:10,color:"#666"}}>{rep.role}</div>
            </div>

            <div style={{marginTop:14}}>
              <a className="btn-primary" href={rep.profileUrl} target="_blank" rel="noreferrer">View profile</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
