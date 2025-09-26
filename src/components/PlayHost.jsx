import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./StyleSheets/PlayHost.css";
import  './/StyleSheets/BookVenues.css';

// Example assets (replace with real icons/images)
import profile1 from "../assets/images/home/playhost/user1.png";
import profile2 from "../assets/images/home/playhost/user2.png";
import calendarIcon from "../assets/images/home/bookrun/date.svg";
import locationIcon from "../assets/images/home/bookrun/map.svg";

function PlayHost() {
  return (
    <section className="play_host_section py-4">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="section_title">
            <h2>Play / Host</h2>
          </div>
          <div className="see_all">
            <a href="#!">See All</a>
          </div>
        </div>

        <Row className="g-3">
          <Col lg={3} md={6} sm={6}>
            <Card className="playhost_card p-3 shadow-sm">
              <div className="badge_label">
                <p>Regular</p>
              </div>

              <div className="d-flex align-items-center my-3">
                <div className="profile_group d-flex">
                  <img src={profile1} alt="player" className="profile_img" />
                  <img
                    src={profile2}
                    alt="player"
                    className="profile_img overlap"
                  />
                </div>
                <p className="m-0 ps-3 fw-semibold">4 Going</p>
              </div>

              <h2>Host By: Sahil Khan</h2>

              <div className="d-flex align-items-center mb-2">
                <img src={calendarIcon} alt="calendar" className="icon me-2" />
                <span>11 Jun | 4PM - 6PM</span>
              </div>

              <div className="d-flex align-items-center mb-3">
                <img src={locationIcon} alt="location" className="icon me-2" />
                <span>Chandhe Patil Sports Zone, Aundh (~5.7 Km)</span>
              </div>

              <div className="d-flex justify-content-between align-items-center border-top pt-3">
                <span className="fw-bold text-primary">Novice</span>
                <div className="offer">
                  <a href="">Join Now</a>
                </div>
              </div>
            </Card>
          </Col>
           <Col lg={3} md={6} sm={6}>
            <Card className="playhost_card p-3 shadow-sm">
              <div className="badge_label">
                <p>Regular</p>
              </div>

              <div className="d-flex align-items-center my-3">
                <div className="profile_group d-flex">
                  <img src={profile1} alt="player" className="profile_img" />
                  <img
                    src={profile2}
                    alt="player"
                    className="profile_img overlap"
                  />
                </div>
                <p className="m-0 ps-3 fw-semibold">4 Going</p>
              </div>

              <h2>Host By: Sahil Khan</h2>

              <div className="d-flex align-items-center mb-2">
                <img src={calendarIcon} alt="calendar" className="icon me-2" />
                <span>11 Jun | 4PM - 6PM</span>
              </div>

              <div className="d-flex align-items-center mb-3">
                <img src={locationIcon} alt="location" className="icon me-2" />
                <span>Chandhe Patil Sports Zone, Aundh (~5.7 Km)</span>
              </div>

              <div className="d-flex justify-content-between align-items-center border-top pt-3">
                <span className="fw-bold text-primary">Novice</span>
                <div className="offer">
                  <a href="">Join Now</a>
                </div>
              </div>
            </Card>
          </Col>
           <Col lg={3} md={6} sm={6}>
            <Card className="playhost_card p-3 shadow-sm">
              <div className="badge_label">
                <p>Regular</p>
              </div>

              <div className="d-flex align-items-center my-3">
                <div className="profile_group d-flex">
                  <img src={profile1} alt="player" className="profile_img" />
                  <img
                    src={profile2}
                    alt="player"
                    className="profile_img overlap"
                  />
                </div>
                <p className="m-0 ps-3 fw-semibold">4 Going</p>
              </div>

              <h2>Host By: Sahil Khan</h2>

              <div className="d-flex align-items-center mb-2">
                <img src={calendarIcon} alt="calendar" className="icon me-2" />
                <span>11 Jun | 4PM - 6PM</span>
              </div>

              <div className="d-flex align-items-center mb-3">
                <img src={locationIcon} alt="location" className="icon me-2" />
                <span>Chandhe Patil Sports Zone, Aundh (~5.7 Km)</span>
              </div>

              <div className="d-flex justify-content-between align-items-center border-top pt-3">
                <span className="fw-bold text-primary">Novice</span>
                <div className="offer">
                  <a href="">Join Now</a>
                </div>
              </div>
            </Card>
          </Col>
           <Col lg={3} md={6} sm={6}>
            <Card className="playhost_card p-3 shadow-sm">
              <div className="badge_label">
                <p>Regular</p>
              </div>

              <div className="d-flex align-items-center my-3">
                <div className="profile_group d-flex">
                  <img src={profile1} alt="player" className="profile_img" />
                  <img
                    src={profile2}
                    alt="player"
                    className="profile_img overlap"
                  />
                </div>
                <p className="m-0 ps-3 fw-semibold">4 Going</p>
              </div>

              <h2>Host By: Sahil Khan</h2>

              <div className="d-flex align-items-center mb-2">
                <img src={calendarIcon} alt="calendar" className="icon me-2" />
                <span>11 Jun | 4PM - 6PM</span>
              </div>

              <div className="d-flex align-items-center mb-3">
                <img src={locationIcon} alt="location" className="icon me-2" />
                <span>Chandhe Patil Sports Zone, Aundh (~5.7 Km)</span>
              </div>

              <div className="d-flex justify-content-between align-items-center border-top pt-3">
                <span className="fw-bold text-primary">Novice</span>
                <div className="offer">
                  <a href="">Join Now</a>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default PlayHost;
