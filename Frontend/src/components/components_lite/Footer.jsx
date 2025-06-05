import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f8f9fa",
        borderTop: "1px solid #e0e0e0",
        padding: "30px 20px",
        fontFamily: "'Segoe UI', Tahoma, sans-serif",
        fontSize: "14px",
        color: "#6c757d",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "16px" }}>
          <Link
            to="/PrivacyPolicy"
            style={{
              color: "#6c757d",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.color = "#343a40")}
            onMouseOut={(e) => (e.target.style.color = "#6c757d")}
          >
            Privacy Policy
          </Link>
          <span>|</span>
          <Link
            to="/TermsofService"
            style={{
              color: "#6c757d",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.color = "#343a40")}
            onMouseOut={(e) => (e.target.style.color = "#6c757d")}
          >
            Terms of Service
          </Link>
        </div>
        <p style={{ margin: 0 }}>© 2025 All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
