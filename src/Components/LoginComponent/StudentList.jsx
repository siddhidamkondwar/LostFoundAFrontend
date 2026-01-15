// src/Components/Admin/StudentList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteUser,
  getAllStudents,
  getRole,
} from "../../Services/LoginService";
import "./StudentList.css";
import claimifyLogo from "./clamify-logo.png"; // logo added


const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [roleChecked, setRoleChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  // success modal state
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  // check role once
  useEffect(() => {
    getRole()
      .then((res) => {
        const roleStr =
          typeof res.data === "string" ? res.data : res.data?.role || "";
        if (!roleStr || roleStr.toLowerCase() !== "admin") {
          navigate("/");
          return;
        }
        setRoleChecked(true);
      })
      .catch(() => navigate("/"));
  }, [navigate]);

  // load all students
  useEffect(() => {
    if (!roleChecked) return;
    setLoading(true);
    setError(null);
    getAllStudents()
      .then((res) => setStudents(res.data || []))
      .catch((err) =>
        setError(
          err.response?.data || err.message || "Failed to load students"
        )
      )
      .finally(() => setLoading(false));
  }, [roleChecked]);

  const removeStudent = (username) => {
    deleteUser(username)
      .then(() => {
        setStudents((prev) =>
          prev.filter((student) => student.username !== username)
        );
        setShowSuccess(true);
      })
      .catch((err) => {
        console.error("Delete error:", err);
        setError("Failed to delete student");
      });
  };

  const filtered = students.filter((s) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      (s.personalName || "").toLowerCase().includes(q) ||
      (s.email || "").toLowerCase().includes(q) ||
      (s.username || "").toLowerCase().includes(q)
    );
  });

  if (loading) return <div className="student-page">Loading...</div>;
  if (error) return <div className="student-page error">{error}</div>;

  return (
    <div className="student-page">
      {/* top bar with site name + back button (optional) */}
      <header className="studentlist-header">
  <div className="site-name">
    <img
      src={claimifyLogo}
      alt="Claimify Lost & Found"
      className="studentlist-logo"
    />
  </div>
  <button className="back-btn" onClick={() => navigate(-1)}>
    Back
  </button>
</header>


      <h2 className="student-title">Student List</h2>
      <p className="student-subtitle">
        Visible to admins only — shows student name, email and username.
      </p>

      <div className="search-wrapper">
        <span className="search-icon"></span>
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, email or username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="table-card">
        <table className="student-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>E‑mail</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student, index) => (
              <tr key={student.username}>
                <td>{index + 1}</td>
                <td>{student.personalName}</td>
                <td>{student.email}</td>
                <td>{student.username}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => removeStudent(student.username)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="no-data">
                  No students match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* success modal */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <h3>Student deleted successfully</h3>
            <div className="tick-wrapper">
              <div className="tick-circle">
                <span className="tick-mark">✓</span>
              </div>
            </div>
            <button
              className="success-ok-btn"
              onClick={() => setShowSuccess(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
