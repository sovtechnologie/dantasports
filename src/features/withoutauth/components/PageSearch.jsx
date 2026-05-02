import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../Stylesheets/Filterpages/FilterSystem.css";
import searchIcon from "../assets/icons/Search.svg";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../../redux/Slices/searchSlice";

const PAGE_CONFIG = {
  defaultpage: {
    title: "Find What You're Looking For",
    sub: "Search across venues, sports, and cities",
    placeholders: ["Search by venue", "Search by city", "Search by sport"],
  },
  VenuePage: {
    title: "Discover Sports Venues Near You",
    sub: "Book turfs, courts, and grounds instantly",
    placeholders: ["Search by venue name", "Search by city", "Search by sport"],
  },
  venuepage: {
    title: "Discover Sports Venues Near You",
    sub: "Book turfs, courts, and grounds instantly",
    placeholders: ["Search by venue name", "Search by city", "Search by sport"],
  },
  HostPage: {
    title: "Find Games & Players Near You",
    sub: "Join a game or host your own",
    placeholders: ["Search by game type", "Search by host", "Search by skill level"],
  },
  CoachPage: {
    title: "Find Expert Coaches Near You",
    sub: "Train with certified coaches and academies",
    placeholders: ["Search by coach name", "Search by sport", "Search by academy"],
  },
  EventPage: {
    title: "Discover Fitness Events Near You",
    sub: "Tournaments, marathons, and fitness challenges",
    placeholders: ["Search by event name", "Search by difficulty", "Search by event type"],
  },
  RunPage: {
    title: "Discover Runs & Marathons Near You",
    sub: "Join run clubs and community events",
    placeholders: ["Search by run name", "Search by community", "Search by difficulty"],
  },
  GymPage: {
    title: "Discover Gyms Near You",
    sub: "Pay per workout, no long-term commitment",
    placeholders: ["Search by gym name", "Search by location", "Search by fitness type"],
  },
};

export default function PageSearch({ searchValue = "defaultpage" }) {
  const config = PAGE_CONFIG[searchValue] || PAGE_CONFIG.defaultpage;
  const { title, sub, placeholders } = config;

  const [phIdx, setPhIdx]     = useState(0);
  const [fadeClass, setFade]  = useState("fade-in");
  const [focused, setFocused] = useState(false);

  const dispatch   = useDispatch();
  const searchTerm = useSelector((s) => s.search.searchTerm);

  // Rotate placeholder
  useEffect(() => {
    const id = setInterval(() => {
      setFade("fade-out");
      setTimeout(() => {
        setPhIdx((p) => (p + 1) % placeholders.length);
        setFade("fade-in");
      }, 450);
    }, 2800);
    return () => clearInterval(id);
  }, [placeholders.length]);

  const handleChange = (e) => dispatch(setSearchTerm(e.target.value));
  const handleClear  = () => dispatch(setSearchTerm(""));

  return (
    <section className="search_wrapper">
      <Container style={{ position: "relative", zIndex: 2 }}>
        <Row className="align-items-center g-3">
          {/* Title */}
          <Col lg={5} md={5}>
            <h3 style={{ margin: 0 }}>{title}</h3>
            <p style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: 13,
              color: "rgba(255,255,255,.72)",
              margin: "4px 0 0",
            }}>
              {sub}
            </p>
          </Col>

          {/* Search input */}
          <Col lg={7} md={7}>
            <div
              className="sech_icon"
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Search icon */}
              <span style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                width: 20,
                height: 20,
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
              }}>
                <img src={searchIcon} alt="" style={{ width: "100%", height: "100%", opacity: .6 }} />
              </span>

              <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={placeholders[phIdx]}
                className={`form-control placeholder-anim ${fadeClass}`}
                style={{
                  paddingLeft: 48,
                  paddingRight: searchTerm ? 40 : 16,
                  height: 48,
                  borderRadius: 50,
                  border: focused
                    ? "1.5px solid #1163C7"
                    : "1.5px solid rgba(17,99,199,.25)",
                  boxShadow: focused
                    ? "0 4px 24px rgba(17,99,199,.2), 0 0 0 3px rgba(17,99,199,.1)"
                    : "0 4px 20px rgba(0,0,0,.1)",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 14,
                  color: "#172A39",
                  background: "white",
                  transition: "border-color .25s ease, box-shadow .25s ease",
                  outline: "none",
                }}
              />

              {/* Clear button */}
              {searchTerm && (
                <button
                  onClick={handleClear}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "#e0e0e0",
                    border: "none",
                    borderRadius: "50%",
                    width: 22,
                    height: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: 12,
                    color: "#555",
                    zIndex: 2,
                    transition: "background .2s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#ccc")}
                  onMouseLeave={(e) => (e.target.style.background = "#e0e0e0")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
