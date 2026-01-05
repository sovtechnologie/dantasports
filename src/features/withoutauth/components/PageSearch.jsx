import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../withoutauth/Stylesheets/Filterpages/PageSearch.css";
import searchIcon from "../../withoutauth/assets/icons/Search.svg";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../../redux/Slices/searchSlice";

const searchDetails = {
  defaultpage: {
    title: "Satish Sahu Venue Page",
    placeholder: ["Search By Venue", "Search By City", " Search By Sport"],
  },
  venuepage: {
    title: "Discover Sports Venues Near You",
    placeholder: ["Search By Venue", "Search By City", "Search By Sport"],
  },
  HostPage: {
    title: "Discover Play near you",
    placeholder: ["Search By Games", "Search By Host", "Search By Skills", "Search By Game Type"],
  },
  CoachPage: {
    title: "Discover Coaches Near You",
    placeholder: ["Search By Coach", "Search By Services", "Search By Academy"],
  },
  EventPage: {
    title: "Discover Fitness Events Near You",
    placeholder: ["Search By Events", "Search By Difficulty", "Search By Event type"],
  },
  RunPage: {
    title: "Discover Runs & Marathons Near You",
    placeholder: ["Search By Runs", "Search By Community", "Search By Difficulty"],
  },
  PlayPage: {
    title: "Discover Play near you",
    placeholder: ["Search By Play", "Search By Find Game..", "Search By Explore Sports"],
  },
  GymPage: {
    title: "Discover Gyms Near You",
    placeholder: ["Search By Gyms", "Search By Location", "Search By Fitness centers"],
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

  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.searchTerm);

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };


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
              value={searchTerm}
              onChange={handleChange}
              placeholder={currentPlaceholder}
              className="form-control placeholder-anim"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default PageSearch;
