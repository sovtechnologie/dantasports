import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./StyleSheets/QuickBooking.css";

// Import images
import book from "../assets/images/home/quickbooking/Deckturf.png";
import play from "../assets/images/home/quickbooking/Deckplay.png";
import run from "../assets/images/home/quickbooking/DeckRun.png";
import coach from "../assets/images/home/quickbooking/Deckcoach.png";
import events from "../assets/images/home/quickbooking/DeckEvent.png";
import gym from "../assets/images/home/quickbooking/Deckgym.png";

function QuickBooking() {
  const navigate = useNavigate();

  const cardsData = [
    { title: "Turf", text: "Book Sports Turf", img: book, path: "/venue" },
    { title: "Play", text: "Find Players Fast", img: play, path: "/Host" },
    { title: "Run", text: "Join Run Clubs", img: run, path: "/run" },
    { title: "Coach", text: "Expert Coaches", img: coach, path: "/coach" },
    { title: "Event", text: "Book Fit Events", img: events, path: "/Events" },
    { title: "Gym", text: "Pay Per Workout", img: gym, path: "/Gym" },
  ];

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
                onClick={() => navigate(card.path)}
                style={{ cursor: "pointer" }}
              >
                <div className="card_img_booking">
                  <img src={card.img} alt={card.title} />
                </div>

                <div className="card_txt text-center pt-2 pb-3">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
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
