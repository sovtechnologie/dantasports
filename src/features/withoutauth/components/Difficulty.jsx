import React from "react";
import "../Stylesheets/Filterpages/FilterSystem.css";

const OPTIONS = [
  { value: 1, label: "Easy",     cls: "diff-easy", desc: "Beginner friendly" },
  { value: 0, label: "Moderate", cls: "diff-mod",  desc: "Some experience needed" },
  { value: 2, label: "Difficult",cls: "diff-hard", desc: "Advanced level" },
];

export default function Difficulty({ selectedDifficulty, setSelectedDifficulty }) {
  const toggle = (v) => setSelectedDifficulty(selectedDifficulty === v ? null : v);

  return (
    <div style={{ marginTop: 16 }}>
      <p className="filter_sub_title" style={{ marginBottom: 8 }}>⚡ Difficulty</p>
      <div className="difficulty-options">
        {OPTIONS.map((opt) => {
          const active = selectedDifficulty === opt.value;
          return (
            <div
              key={opt.value}
              className={`difficulty-option ${opt.cls}${active ? " diff-active" : ""}`}
              onClick={() => toggle(opt.value)}
              role="checkbox"
              aria-checked={active}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggle(opt.value)}
            >
              <div className="difficulty-label">
                <span className="difficulty-dot" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#172A39" }}>{opt.label}</div>
                  <div style={{ fontSize: 11, color: "#858585", fontFamily: "DM Sans,sans-serif" }}>{opt.desc}</div>
                </div>
              </div>
              <div className={`sort-checkbox${active ? " checked" : ""}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
