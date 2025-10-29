import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "../../Stylesheets/Filterpages/HostPlayFilter.css";

import { useFetchHostList } from "../../../../hooks/Hostlist/useFetchHostList";
import { VenueListShimmer } from "../../components/Shimmer/VenueListShimmer";
import AppDownloadBanner from "../../components/AppDownloadBanner";
import SortBy from "../../components/SortBy";
import SortModal from "../../components/SortModal";

import calendarIcon from "../../assets/playhost/date.svg";
import mapIcon from "../../assets/playhost/map.svg";
import profilePlaceholder from "../../assets/playhost/user1.png"; // fallback image

// Time formatter function
function formatTime(timeStr = "00:00") {
  const [h, m] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(h, m);
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}

export default function HostPlayFilterPage() {
  const { lat, lng } = useSelector((state) => state.location);

  const [hostList, setHostList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);

  const { data: AllHostdata, isLoading, isError, error } = useFetchHostList({ lat, lng });

  useEffect(() => {
    if (AllHostdata?.status === 200) {
      setHostList(AllHostdata.result || []);
    }
  }, [AllHostdata]);

  const SKILL_MAP = {
    0: { label: "Novice", color: "#18429F" },
    1: { label: "Learner", color: "#0FA903" },
    2: { label: "Skilled", color: "#FFA200" },
    3: { label: "Expert", color: "#E65B00" },
    4: { label: "Elite", color: "#4C2DFF" },
  };

  const ACTIVITY_TYPE_LABEL = {
    1: "Regular",
    2: "Coaching",
    3: "Tournament",
    // add more if needed
  };

  // Filter by search or selected time
  const filteredHosts = useMemo(() => {
    return (hostList || []).filter((host) => {
      if (search && !host.host_name?.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedTime && host.start_time && host.end_time) {
        const [startH, startM] = host.start_time.split(":").map(Number);
        const [endH, endM] = host.end_time.split(":").map(Number);
        const [selH, selM] = selectedTime.split(":").map(Number);

        const selMin = selH * 60 + selM;
        const startMin = startH * 60 + startM;
        const endMin = endH * 60 + endM;

        return selMin >= startMin && selMin <= endMin;
      }
      return true;
    });
  }, [hostList, search, selectedTime]);

  if (isLoading) return <VenueListShimmer />;
  if (isError) return <div>Error loading hosts: {error.message}</div>;

  return (
    <section style={{ background: "#F1F3F2" }} className="pt-3 pt-lg-5 pb-lg-5 pb-3">
      <Container>
        <Row>
          {/* Left Sort Section */}
          <Col lg={3} md={5} className="d-none d-lg-block d-md-block">
            <SortBy />
          </Col>

          {/* Mobile Sort Modal */}
          <Col className="d-lg-none d-md-none text-end mb-4">
            <SortModal />
          </Col>

          {/* Host Cards Section */}
          <Col lg={9} md={7}>
            <Row className="g-3">
              {filteredHosts.length > 0 ? (
                filteredHosts.map((host) => (
                  <Col lg={4}  key={host.id}>
                    <Card className="card card_payhost">
                      {/* Label */}
                      <div className="badge_label mb-2">
                        <p>{ACTIVITY_TYPE_LABEL[host.activity_type] || "Regular"}</p>
                      </div>



                      {/* Profile group */}
                      <div className="d-flex align-items-center my-2">
                        <div className="profile_group d-flex">

                          <img
                            src={host.host_image || profilePlaceholder}
                            alt="host"
                            className="profile_img"
                            style={{
                              width: "35px",
                              height: "35px",
                              borderRadius: "50%",
                              border: "2px solid #fff",
                            }}
                          />
                          <img
                            src={
                              (Array.isArray(host.userProfile_image) &&
                                host.userProfile_image[0]?.profile_image) ||
                              profilePlaceholder
                            }
                            alt="player"
                            className="profile_img overlap"
                            style={{
                              width: "35px",
                              height: "35px",
                              borderRadius: "50%",
                              border: "2px solid #fff",
                              marginLeft: "-10px",
                            }}
                          />
                        </div>

                        <p className="m-0 ps-3 going">{host.going || 0} Going</p>
                      </div>

                      <h2>Host By: {host.host_name || "Unknown"}</h2>


                      <div className="d-flex align-items-center mb-2">
                        <img src={calendarIcon} alt="calendar" className="icon me-2" />
                        <span>
                          {host.date
                            ? new Date(host.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                            })
                            : ""}{" "}
                          | {formatTime(host.start_time)} - {formatTime(host.end_time)}
                        </span>
                      </div>

                      {/* Location */}
                      <div className="d-flex align-items-center mb-3">
                        <img src={mapIcon} alt="location" className="icon me-2" />
                        <span>
                          {host.city || "Address not available"} {host.state || "Address not available"}(~{host.distance_km || 0} Km)
                        </span>
                      </div>

                      {/* Bottom */}
                      <div className="d-flex justify-content-between align-items-center  pt-3">
                        <span
                          className="novice_txt"
                          style={{
                            color: SKILL_MAP[host.game_skill]?.color || "#18429F",
                          }}
                        >
                          {SKILL_MAP[host.game_skill]?.label || "Novice"}
                        </span>
                      </div>
                      <div className="card_line"></div>
                      <div className="offer">
                        <a href="">Join Now</a>
                      </div>

                    </Card>
                  </Col>
                ))
              ) : (
                <div className="text-center py-5 fw-semibold text-muted">
                  No hosts found
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Footer Banner */}
      <Container>
        <div className={styled.event_footer_banner}>
          <AppDownloadBanner />
        </div>
      </Container>
    </section>
  );
}
