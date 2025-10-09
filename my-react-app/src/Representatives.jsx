import React from "react";

// Sample data for politicians and roles
const representatives = [
  {
    name: "N. Chandrababu Naidu",
    party: "Telugu Desam Party (TDP)",
    role: "Chief Minister of Andhra Pradesh (2024–present)",
    profileUrl: "https://www.bankbazaar.com/voter-id/chief-ministers-of-andhra-pradesh.html"
  },
  {
    name: "Y. S. Jagan Mohan Reddy",
    party: "YSR Congress Party",
    role: "Former Chief Minister (2019–2024); leader of YSRCP",
    profileUrl: "https://www.ysrcongress.com/en/key-leaders"
  },
  {
    name: "Vangalapudi Anitha",
    party: "TDP",
    role: "Minister of Home Affairs & Disaster Management in AP; MLA from Payakaraopet",
    profileUrl: "https://en.wikipedia.org/wiki/Vangalapudi_Anitha"
  },
  {
    name: "T. G. Bharath",
    party: "TDP",
    role: "Minister of Industries & Commerce, Food Processing; MLA for Kurnool",
    profileUrl: "https://en.wikipedia.org/wiki/T._G._Bharath"
  },
  {
    name: "Ashok Bendalam",
    party: "TDP",
    role: "Member of Andhra Pradesh Legislative Assembly from Ichchapuram",
    profileUrl: "https://en.wikipedia.org/wiki/Ashok_Bendalam"
  },
  {
    name: "Botsa Satyanarayana",
    party: "YSRCP (formerly Congress)",
    role: "Senior politician, Minister for Municipal Administration & Urban Development (in past)",
    profileUrl: "https://en.wikipedia.org/wiki/Botsa_Satyanarayana"
  },
  {
    name: "Velagapalli Varaprasad Rao",
    party: "BJP (previously YSRCP)",
    role: "Former Member of Parliament (Tirupati)",
    profileUrl: "https://en.wikipedia.org/wiki/Velagapalli_Varaprasad_Rao"
  },
  {
    name: "Vitapu Balasubrahmanyam",
    party: "Progressive Democratic Front",
    role: "Member, Andhra Pradesh Legislative Council; former pro tem Chairman of the Council",
    profileUrl: "https://en.wikipedia.org/wiki/Vitapu_Balasubrahmanyam"
  }
];

const cardStyle = {
  background: "#fff",
  borderRadius: 16,
  boxShadow: "0 4px 10px rgba(0,0,0,0.09)",
  padding: "32px 20px",
  marginBottom: "28px",
  minWidth: 280,
  maxWidth: 410,
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

export default function Representatives() {
  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", width: "100%" }}>
      <h2 style={{ color: "#6a47f2", fontWeight: 700, fontSize: 40, marginBottom: 32 }}>
        Andhra Pradesh Politicians & Their Roles
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "32px" }}>
        {representatives.map((rep, idx) => (
          <div key={idx} style={cardStyle}>
            <div style={{ fontSize: 22, fontWeight: 600, color: "#6a47f2" }}>{rep.name}</div>
            <div style={{ fontSize: 16, color: "#9579f0" }}>{rep.party}</div>
            <div style={{ fontSize: 16, marginBottom: 8 }}>{rep.role}</div>
            <a
              href={rep.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: 12,
                background: "#6a47f2",
                color: "#fff",
                fontWeight: "bold",
                border: "none",
                borderRadius: 8,
                padding: "10px 28px",
                fontSize: 15,
                textDecoration: "none",
                display: "inline-block",
                textAlign: "center",
                boxShadow: "0 2px 7px rgba(0,0,0,0.06)"
              }}
            >
              Click to View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
