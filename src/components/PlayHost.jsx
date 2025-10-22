import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./StyleSheets/PlayHost.css";
import "./StyleSheets/BookVenues.css";

import calendarIcon from "../assets/images/home/bookrun/date.svg";
import locationIcon from "../assets/images/home/bookrun/map.svg";
import profile1 from "../assets/images/home/playhost/user1.png";
import profile2 from "../assets/images/home/playhost/user2.png";

import { useFetchHostList } from "../hooks/Hostlist/useFetchHostList.jsx";

// Time formatting (same as old HostCarousel)
function formatTime(timeStr = "00:00") {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  const h = Number(parts[0] || 0);
  const m = Number(parts[1] || 0);
  const s = parts.length > 2 ? Number(parts[2]) : 0;
  const dt = new Date();
  dt.setHours(h, m, s);
  return dt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function PlayHost() {
  const { lat, lng } = useSelector((state) => state.location);
  const { data, isLoading, error } = useFetchHostList({ lat, lng });

  const hosts = data?.result || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading hosts: {error.message}</p>;

  return (
    <section className="play_host_section py-4">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="section_title">
            <h2>Play / Host</h2>
          </div>
          <div className="see_all">
            <Link to="/Host">See All</Link>
          </div>
        </div>

        <Row className="g-3">
          {hosts.slice(0, 4).map((host) => {
            const attendees =
              host?.userProfile_image?.length > 0
                ? host.userProfile_image
                : [
                    { profile_image: profile1 },
                    { profile_image: profile2 },
                  ];

            const dateText = `${
              new Date(host?.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              }) || ""
            } | ${formatTime(host?.start_time)} - ${formatTime(
              host?.end_time?.slice(0, 5)
            )}`;

            return (
              <Col lg={3} md={6} sm={6} key={host.id}>
                <Card className="playhost_card p-3 shadow-sm">
                  <div className="badge_label">
                    <p>{host.activity_type || "Regular"}</p>
                  </div>

                  <div className="d-flex align-items-center my-3">
                    <div className="profile_group d-flex">
                      {attendees.slice(0, 2).map((a, i) => (
                        <img
                          key={i}
                          src={a.profile_image || profile1}
                          alt="player"
                          className={`profile_img ${i > 0 ? "overlap" : ""}`}
                        />
                      ))}
                    </div>
                    <p className="m-0 ps-3 fw-semibold">
                      {host.going || 0} Going
                    </p>
                  </div>

                  <h2>Host By: {host.host_name || "Unknown"}</h2>

                  <div className="d-flex align-items-center mb-2">
                    <img
                      src={calendarIcon}
                      alt="calendar"
                      className="icon me-2"
                    />
                    <span>{dateText}</span>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={locationIcon}
                      alt="location"
                      className="icon me-2"
                    />
                    <span>
                      {host.full_address || "Address not available"} (
                      ~{host.distance_km?.toFixed(1) || "0"} km)
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center border-top pt-3">
                    <span className="fw-bold text-primary">
                      {host.game_skill || "Novice"}
                    </span>
                    {/* <div className="offer">
                      <Link to={`/Host/${host.id}`}>Join Now</Link>
                    </div> */}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}

export default PlayHost;
