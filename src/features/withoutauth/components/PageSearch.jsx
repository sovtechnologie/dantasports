import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../withoutauth/Stylesheets/Filterpages/PageSearch.css";
import searchIcon from "../../withoutauth/assets/icons/Search.svg";

const searchDetails = {
  defaultpage: {
    title: "Satish Sahu Venue Page",
    placeholder: ["Search Venue", "City", "Sport"],
  },
  venuepage: {
    title: "Discover Sports Venues Near You",
    placeholder: ["Search Venue", "City", "Sport"],
  },
  HostPage: {
    title: "Discover Play near you",
    placeholder: ["Search Games", "Host", "Skills","Game Type"],
  },
  CoachPage: {
    title: "Discover Coaches Near You",
    placeholder: ["Search Coach", "Services", "Academy"],
  },
  EventPage: {
    title: "Discover Fitness Events Near You",
    placeholder: ["Search Events", "Difficulty", "Event type"],
  },
  RunPage: {
    title: "Discover Runs & Marathons Near You",
    placeholder: ["Search Runs", "Community", "Difficulty"],
  },
  PlayPage: {
    title: "Discover Play near you",
    placeholder: ["Search Play..", "Find Game..", "Explore Sports.."],
  },
  GymPage: {
    title: "Discover Gyms Near You",
    placeholder: ["Search Gyms", "Location", "Fitness centers"],
  },
};

function PageSearch({ searchValue = "defaultpage" }) {
  const details = searchDetails[searchValue] || searchDetails.defaultpage;
  const { title, placeholder } = details;

  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder[0]);
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        index = (index + 1) % placeholder.length;
        setCurrentPlaceholder(placeholder[index]);
        setFadeClass("fade-in");
      }, 500); // fade-out duration
    }, 2500); // change every 2.5 seconds

    return () => clearInterval(interval);
  }, [placeholder]);

  return (
    <section className="search_wrapper">
      <Container>
        <Row className="justify-content-center align-items-center g-3">
          <Col lg={6} md={6}>
            <h3>{title}</h3>
          </Col>
          <Col lg={6} md={6} className="position-relative sech_icon">
            <span>
              <img src={searchIcon} alt="search icon" />
            </span>
            <input
              type="text"
              className="form-control placeholder-anim"
              placeholder={currentPlaceholder}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default PageSearch;
