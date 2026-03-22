import { useState, useEffect } from "react";
const socialLinks = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    label: "Website", value: "https://bootdey.com",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
    label: "Github", value: "bootdey",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
      </svg>
    ),
    label: "Twitter", value: "@bootdey",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    label: "Instagram", value: "bootdey",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
    label: "Facebook", value: "bootdey",
  },
];

const projectStats = [
  { label: "Web Design", value: 80 },
  { label: "Website Markup", value: 72 },
  { label: "One Page", value: 89 },
  { label: "Mobile Template", value: 55 },
  { label: "Backend API", value: 66 },
];


function ProgressBar({ value }) {
  return (
    <div style={{ background: "#e9ecef", borderRadius: 4, height: 6, width: "100%", marginTop: 4 }}>
      <div
        style={{
          width: `${value}%`,
          background: "#4a90d9",
          height: "100%",
          borderRadius: 4,
          transition: "width 0.6s ease",
        }}
      />
    </div>
  );
}

function ProjectStatusCard() {
  return (
    <div style={styles.card}>
      <div style={{ marginBottom: 16 }}>
        <span style={{ color: "#4a90d9", fontStyle: "italic", fontSize: 13, marginRight: 6 }}>assignment</span>
        <span style={{ fontWeight: 600, fontSize: 15 }}>Project Status</span>
      </div>
      {projectStats.map((s) => (
        <div key={s.label} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, color: "#555", marginBottom: 2 }}>{s.label}</div>
          <ProgressBar value={s.value} />
        </div>
      ))}
    </div>
  );
}

export default function UserProfile() {
  
const [editing, setEditing] = useState(false);
const [editingLinks, setEditingLinks] = useState(false);
const [links, setLinks] = useState(() => {
  const saved = localStorage.getItem("socialLinks");
  return saved ? JSON.parse(saved) : socialLinks;
});
const [profileInfo, setProfileInfo] = useState(() => {
  const saved = localStorage.getItem("profileInfo");

  return saved
    ? JSON.parse(saved)
    : [
        { label: "Full Name", value: "Kenneth Valdez" },
        { label: "Email", value: "fip@jukmuh.al" },
        { label: "Phone", value: "(239) 816-9029" },
        { label: "Mobile", value: "(320) 380-4539" },
        { label: "Address", value: "Bay Area, San Francisco, CA" },
      ];
});
useEffect(() => {
  localStorage.setItem("profileInfo", JSON.stringify(profileInfo));
}, [profileInfo]);
useEffect(() => {
  localStorage.setItem("socialLinks", JSON.stringify(links));
}, [links]);
const handleChange = (index, value) => {
    const updated = [...profileInfo];
    updated[index].value = value;
    setProfileInfo(updated);
  };
 

const [profile, setProfile] = useState(() => {
  const saved = localStorage.getItem("profile");
  return saved
    ? JSON.parse(saved)
    : {
        name: "John Doe",
        role: "Full Stack Developer",
        location: "Bay Area, San Francisco, CA",
        photo: null,
      };
});
useEffect(() => {
  localStorage.setItem("profile", JSON.stringify(profile));
}, [profile]);
  return (
    <div style={styles.page}>
      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <a href="#" style={styles.breadcrumbLink}>Home</a>
        <span style={styles.breadcrumbSep}> / </span>
        <a href="#" style={styles.breadcrumbLink}>User</a>
        <span style={styles.breadcrumbSep}> / </span>
        <span style={{ color: "#666" }}>User Profile</span>
      </div>

      {/* Main grid */}
      <div style={styles.grid}>
        {/* Top-left: Profile card */}
       <div style={{ ...styles.card, ...styles.profileCard, position: "relative" }}>

  {/* Edit Button */}
 <button
  onClick={() => setEditing(!editing)}
  style={{
    position: "absolute",
    top: 12,
    right: 12,
    border: "none",
    background: "transparent",
    cursor: "pointer"
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="black"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
</button>

  {/* Avatar */}
  <div style={styles.avatarWrap}>
    {profile.photo ? (
      <img
        src={profile.photo}
        alt="profile"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ) : (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <circle cx="50" cy="50" r="50" fill="#dde3ea"/>
        <circle cx="50" cy="38" r="18" fill="#b0bec5"/>
        <ellipse cx="50" cy="85" rx="28" ry="20" fill="#b0bec5"/>
      </svg>
    )}
  </div>

  {editing && (
    <input
  type="file"
  onChange={(e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfile({
        ...profile,
        photo: reader.result
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }}
/>
  )}

  {/* Name */}
  {editing ? (
    <input
      value={profile.name}
      onChange={(e) =>
        setProfile({ ...profile, name: e.target.value })
      }
    />
  ) : (
    <div style={styles.profileName}>{profile.name}</div>
  )}

  {/* Role */}
  {editing ? (
    <input
      value={profile.role}
      onChange={(e) =>
        setProfile({ ...profile, role: e.target.value })
      }
    />
  ) : (
    <div style={styles.profileSub}>{profile.role}</div>
  )}

  {/* Location */}
  {editing ? (
    <input
      value={profile.location}
      onChange={(e) =>
        setProfile({ ...profile, location: e.target.value })
      }
    />
  ) : (
    <div style={styles.profileSub}>{profile.location}</div>
  )}
</div>

        {/* Top-right: Info card */}
        <div style={styles.card}>
          {profileInfo.map((item, i) => (
            <div
              key={item.label}
              style={{
                ...styles.infoRow,
                borderBottom: i < profileInfo.length - 1 ? "1px solid #f0f0f0" : "none",
              }}
            >
              <span style={styles.infoLabel}>{item.label}</span>
{editing ? (
  <input
    value={item.value}
    onChange={(e) => handleChange(i, e.target.value)}
    style={{
      flex: 1,
      padding: "6px",
      border: "1px solid #ddd",
      borderRadius: 4,
      fontSize: 13
    }}
  />
) : (
  <span style={styles.infoValue}>{item.value}</span>
)}            </div>
          ))}
          <div style={{ marginTop: 20 }}>
           <button
  style={{ ...styles.btn, background: "#3cb6a0", color: "#fff", padding: "8px 24px" }}
  onClick={() => setEditing(!editing)}
>
  {editing ? "Save" : "Edit"}
</button>
          </div>
        </div>

      
{/* Bottom-left: Social links */}
<div style={styles.card}>

  {/* Header */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    }}
  >
    <h3 style={{ margin: 0 }}>Social Links</h3>

    <button
      onClick={() => setEditingLinks(!editingLinks)}
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: 4
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeWidth="2"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    </button>
  </div>

  {/* Social links list */}
  {links.map((s, i) => {
    return (
      <div
        key={s.label}
        className="socialRow"
        style={{
          ...styles.socialRow,
          borderBottom:
            i < links.length - 1 ? "1px solid #f4f4f4" : "none",
        }}
      >

        <span style={styles.socialIcon}>
          {socialLinks[i].icon}
        </span>

        {editingLinks ? (

          <input
            value={s.value}
            placeholder="Paste link..."
            onChange={(e) => {
              const updated = [...links];
              updated[i].value = e.target.value;
              setLinks(updated);
            }}
            style={{
              flex: 1,
              padding: "6px",
              border: "1px solid #ddd",
              borderRadius: 4,
              fontSize: 13
            }}
          />

        ) : (

          <div className="socialText">

            <span className="label">
              {s.label}
            </span>

            <a
              href={
                s.value.startsWith("http")
                  ? s.value
                  : `https://${s.value}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {s.value}
            </a>

          </div>

        )}

      </div>
    );
  })}

</div>   {/* closes Social Links card */}
</div>   {/* closes main grid */}
    </div>
    );
  }
const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    background: "#e8ecf0",
    minHeight: "100vh",
    padding: "20px 24px",
    color: "#333",
  },
  breadcrumb: {
    fontSize: 13,
    marginBottom: 18,
    color: "#999",
  },
  breadcrumbLink: {
    color: "#4a90d9",
    textDecoration: "none",
  },
  breadcrumbSep: {
    margin: "0 4px",
    color: "#bbb",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "250px 1fr",
    gridTemplateRows: "auto auto",
    gap: 16,
    maxWidth: 860,
  },
  card: {
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    padding: "24px 20px",
  },
  profileCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 6,
  },
  avatarWrap: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    overflow: "hidden",
    marginBottom: 8,
    background: "#dde3ea",
  },
  profileName: {
    fontSize: 18,
    fontWeight: 700,
    color: "#222",
  },
  profileSub: {
    fontSize: 13,
    color: "#888",
  },
  btnRow: {
    display: "flex",
    gap: 10,
    marginTop: 8,
  },
  btn: {
    padding: "7px 18px",
    borderRadius: 5,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    transition: "opacity 0.15s",
  },
  btnPrimary: {
    background: "#4a90d9",
    color: "#fff",
  },
  btnOutline: {
    background: "#fff",
    color: "#4a90d9",
    border: "1.5px solid #4a90d9",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    padding: "12px 0",
    gap: 16,
  },
  infoLabel: {
    fontWeight: 600,
    fontSize: 13,
    color: "#444",
    minWidth: 90,
  },
  infoValue: {
    fontSize: 13,
    color: "#888",
  },
  socialRow: {
    display: "flex",
    alignItems: "center",
    padding: "11px 0",
    gap: 12,
  },
  socialIcon: {
    color: "#555",
    display: "flex",
    alignItems: "center",
  },
  socialLabel: {
    fontSize: 13,
    fontWeight: 500,
    color: "#444",
    flex: 1,
  },
  socialValue: {
    fontSize: 13,
    color: "#888",
  },
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
};