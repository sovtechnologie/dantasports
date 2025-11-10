import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "../../Stylesheets/Filterpages/HostPlayFilter.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { useFetchHostList } from "../../../../hooks/Hostlist/useFetchHostList";
import { VenueListShimmer } from "../../components/Shimmer/VenueListShimmer";
import AppDownloadBanner from "../../components/AppDownloadBanner";
import SortBy from "../../components/SortBy";
import SortModal from "../../components/SortModal";

import calendarIcon from "../../assets/playhost/date.svg";
import mapIcon from "../../assets/playhost/map.svg";
import profilePlaceholder from "../../assets/playhost/user1.png";
import PageSearch from "../../components/PageSearch";
import sortIcon from "../../assets/icons/sort.svg"

function formatTime(timeStr = "00:00") {
  const [h, m] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(h, m);
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}

export default function HostPlayFilterPage() {

  const [showSort, setShowSort] = useState(false);
  const { lat, lng } = useSelector((state) => state.location);

  const [hostList, setHostList] = useState([]);
  const [filteredHosts, setFilteredHosts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [sortBy, setSortBy] = useState([]);

  const { data: AllHostdata, isLoading, isError, error } = useFetchHostList({ lat, lng });

  useEffect(() => {
    if (AllHostdata?.status === 200) {
      setHostList(AllHostdata.result || []);
      setFilteredHosts(AllHostdata.result || []);
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
  };

  useEffect(() => {
    const sortArray = Array.isArray(sortBy) ? sortBy : sortBy ? [sortBy] : [];

    if (sortArray.length === 0) {
      setFilteredHosts(AllHostdata?.result || []);
      return;
    }

    const sortHosts = (hosts) => {
      let sorted = [...hosts];

      // favourite first
      if (sortArray.includes("favourite")) {
        sorted = sorted.filter((h) => h.favourite === true);
      }

      // nearby
      if (sortArray.includes("nearby")) {
        sorted.sort((a, b) => (a.distance_km || 0) - (b.distance_km || 0));
      }

      // popularity
      if (sortArray.includes("popularity")) {
        sorted.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
      }


      if (sortArray.includes("priceLow")) {
        sorted.sort((a, b) => (a.pricing || 0) - (b.pricing || 0));
      }

      return sorted;
    };

    const sortedData = sortHosts(hostList);
    setFilteredHosts(sortedData);
  }, [sortBy, AllHostdata]);

  // ✅ Filter by search or time
  const visibleHosts = useMemo(() => {
    return (filteredHosts || []).filter((host) => {
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
  }, [filteredHosts, search, selectedTime]);

  if (isLoading) return <VenueListShimmer />;
  if (isError) return <div>Error loading hosts: {error.message}</div>;

  return (
    <section style={{ background: "#F1F3F2" }} className="pb-lg-4 pb-3">
      <PageSearch />
      <Container>
        <Row>
          {/* Left Sort Section */}
          <Col lg={3} md={12} className="d-none d-lg-block ">
            <SortBy sortBy={sortBy} setSortBy={setSortBy} />
          </Col>

          {/* Mobile Sort Modal */}
          <Col className="d-lg-none  text-end mb-4">
            {/* <SortBy sortBy={sortBy} setSortBy={setSortBy} /> */}
            {/* <button
          className="border-0 bg-transparent"
          onClick={() => setShowSort((prev) => !prev)}
          aria-expanded={showSort}
        >
          <img src={sortIcon} alt="Sort" />
        </button>

        {showSort && (
          <div className="mt-2">
            <SortBy sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        )} */}


           <div className="modal_wraper">
              <div
                  class="modal fade"
                  id="exampleModalToggle"
                  aria-hidden="true"
                  aria-labelledby="sortby"
                  tabindex="-1"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <SortBy />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="modal fade"
                  id="exampleModalToggle2"
                  aria-hidden="true"
                  aria-labelledby="exampleModalToggleLabel2"
                  tabindex="-1"
                ></div>

                <button
                  class="btn_mobile"
                  data-bs-toggle="modal"
                  href="#exampleModalToggle"
                  role="button"
                >
                  <img src={sortIcon} alt="" />
                </button>
           </div>
           



          </Col>

          {/* Host Cards Section */}
          <Col lg={9} md={12}>
            <Row className="g-3">
              {visibleHosts.length > 0 ? (
                visibleHosts.map((host) => (
                  <Col lg={6} xl={4} md={6} key={host.id}>
                    <Card className="card card_payhost">
                      <div className="badge_label mb-2">
                        <p>{ACTIVITY_TYPE_LABEL[host.activity_type] || "Regular"}</p>
                      </div>

                      <div className="d-flex align-items-center my-2">
                        <div className="profile_group d-flex">
                          <img
                            src={host.host_image || profilePlaceholder}
                            alt="host"
                            className="profile_img"
                          />
                          <img
                            src={
                              (Array.isArray(host.userProfile_image) &&
                                host.userProfile_image[0]?.profile_image) ||
                              profilePlaceholder
                            }
                            alt="player"
                            className="profile_img overlap"
                          />
                        </div>
                        <div className="blue_dot"></div>
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

                      <div className="d-flex align-items-center mb-3">
                        <img src={mapIcon} alt="location" className="icon me-2" />
                        <span>
                          {host.city || "Address not available"} {host.state || ""} (~
                          {host.distance_km || 0} Km)
                        </span>
                      </div>

                      <div className="d-flex justify-content-between align-items-center pt-3">
                        <span
                          className="novice_txt"
                          style={{
                            color: SKILL_MAP[host.game_skill]?.color || "#18429F",
                          }}
                        >
                          {SKILL_MAP[host.game_skill]?.label || "Novice"}
                        </span>
                      </div>

                      <div className="card_line2"></div>
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

      <Container>
        <div className={styled.event_footer_banner}>
          <AppDownloadBanner />
        </div>
      </Container>
    </section>
  );
}
