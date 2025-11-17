import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../withoutauth/Stylesheets/Filterpages/PageSearch.css";
import searchIcon from "../../withoutauth/assets/icons/Search.svg";

const searchDetails = {
  defaultpage: {
    title: "Satish Sahu Venue Page",
    placeholder: ["Search Venue..", "Find Turf..", "Discover Gym.."],
  },
  venuepage: {
    title: "Discover Turf near you",
    placeholder: ["Search Turf..", "Find Playgrounds..", "Locate Turf Nearby.."],
  },
  HostPage: {
    title: "Discover Play near you",
    placeholder: ["Search Play..", "Find Host..", "Explore Playgrounds.."],
  },
  CoachPage: {
    title: "Discover Coaches near you",
    placeholder: ["Search Coach..", "Find Trainer..", "Explore Mentors.."],
  },
  EventPage: {
    title: "Discover events near you",
    placeholder: ["Search Events..", "Find Local Events..", "Explore Sports Meets.."],
  },
  RunPage: {
    title: "Discover Run near you",
    placeholder: ["Search Run..", "Find Race..", "Explore Running Events.."],
  },
  PlayPage: {
    title: "Discover Play near you",
    placeholder: ["Search Play..", "Find Game..", "Explore Sports.."],
  },
  GymPage: {
    title: "Discover Gym near you",
    placeholder: ["Search Gym..", "Find Fitness Center..", "Locate Gym Nearby.."],
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
              className={`form-control placeholder-anim ${fadeClass}`}
              placeholder={currentPlaceholder}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default PageSearch;
