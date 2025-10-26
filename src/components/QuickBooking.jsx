import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // ✅ import navigate hook
import "./StyleSheets/QuickBooking.css";

// Import all images
import book from "../assets/images/home/quickbooking/book.png";
import play from "../assets/images/home/quickbooking/play.png";
import run from "../assets/images/home/quickbooking/run.png";
import coach from "../assets/images/home/quickbooking/coach.png";
import events from "../assets/images/home/quickbooking/events.png";
import gym from "../assets/images/home/quickbooking/gym.png";

function QuickBooking() {
  const navigate = useNavigate(); 

  
  const cardsData = [
    { title: "Book", texts: ["Book Sports Turf", "Book Sports Turf"], img: book, path: "/venue" },
    { title: "Play", texts: ["Find Players Fast", "Find Players Fast"], img: play, path: "/Host" },
    { title: "Run", texts: ["Join Run Clubs", "Join Run Clubs"], img: run, path: "/run" },
    { title: "Coach", texts: ["Expert Coaches", "Expert Coaches"], img: coach, path: "/coach" },
    { title: "Event", texts: ["Book Fit Events", "Registered Event"], img: events, path: "/Events" },
    { title: "Gym", texts: ["Pay Per Workout", "Pay Per Workout"], img: gym, path: "/Gym" },
  ];

  // Index state for each card
  const [indexes, setIndexes] = useState(Array(cardsData.length).fill(0));
  const [fadeStates, setFadeStates] = useState(Array(cardsData.length).fill(true));

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeStates(Array(cardsData.length).fill(false)); // fade out all

      setTimeout(() => {
        setIndexes((prevIndexes) =>
          prevIndexes.map((val, i) => (val + 1) % cardsData[i].texts.length)
        );
        setFadeStates(Array(cardsData.length).fill(true)); // fade in all
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [cardsData.length]);

  return (
    <section className="quick_booking_section">
      <Container>
        <div className="section_title">
          <h2>Quick Booking</h2>
        </div>
        <Row>
          {cardsData.map((card, i) => (
            <Col key={i} lg={2} md={3} className="col-6">
              <Card
                className="border-0 quick-card"
                onClick={() => navigate(card.path)} // ✅ navigate on click
                style={{ cursor: "pointer" }} // cursor style
              >
                <div className="card_img_booking">
                  <img src={card.img} alt={card.title} />
                </div>
                <div className="card_txt text-center pt-2 pb-3">
                  <h3>{card.title}</h3>
                  <p className={`fade-text ${fadeStates[i] ? "fade-in-up" : "fade-out"}`}>
                    {card.texts[indexes[i]]}
                  </p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default QuickBooking;
