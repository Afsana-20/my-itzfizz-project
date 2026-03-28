"use client";

import { useEffect, useRef, useState } from "react";

const links = ["Home", "About", "Services", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2.5rem",
        height: "64px",
        background: scrolled ? "rgba(20,20,20,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        transition: "background 0.35s ease, border 0.35s ease, backdrop-filter 0.35s ease",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "linear-gradient(135deg, #f97316, #4ade80)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: "1rem", fontWeight: 900, color: "#fff" }}>IZ</span>
        </div>
        <span style={{
          fontWeight: 800,
          fontSize: "1.15rem",
          letterSpacing: "0.12em",
          color: scrolled ? "#fff" : "#111",
          transition: "color 0.35s",
        }}>
          ITZFIZZ
        </span>
      </div>

      {/* Nav links */}
      <ul style={{
        display: "flex", gap: "2.2rem", listStyle: "none",
        margin: 0, padding: 0,
      }}>
        {links.map((l) => (
          <li key={l}>
            <a
              href="#"
              style={{
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                letterSpacing: "0.06em",
                color: scrolled ? "#e5e5e5" : "#222",
                transition: "color 0.25s, opacity 0.25s",
                opacity: 0.85,
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "1"; (e.target as HTMLElement).style.color = "#4ade80"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "0.85"; (e.target as HTMLElement).style.color = scrolled ? "#e5e5e5" : "#222"; }}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <button
        style={{
          padding: "8px 22px",
          borderRadius: "999px",
          border: "2px solid #f97316",
          background: "transparent",
          color: scrolled ? "#f97316" : "#f97316",
          fontWeight: 700,
          fontSize: "0.85rem",
          letterSpacing: "0.05em",
          cursor: "pointer",
          transition: "background 0.25s, color 0.25s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#f97316";
          (e.currentTarget as HTMLElement).style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "transparent";
          (e.currentTarget as HTMLElement).style.color = "#f97316";
        }}
      >
        Get Started
      </button>
    </nav>
  );
}
