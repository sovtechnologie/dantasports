import React, { useState, useEffect } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import "./StyleSheets/QuickBooking.css";

// Import all images
import book from "../assets/images/home/quickbooking/book.png";
import play from "../assets/images/home/quickbooking/play.png";
import run from "../assets/images/home/quickbooking/run.png";
import coach from "../assets/images/home/quickbooking/coach.png";
import events from "../assets/images/home/quickbooking/events.png";
import gym from "../assets/images/home/quickbooking/gym.png"; // <-- added gym image


function QuickBooking() {

  
  
  // Each card gets its own title, texts, and image
  const cardsData = [
    { title: "Book", texts: ["Reserve Nearby Turf", "Reserve Nearby.."], img: book },
    { title: "Play", texts: ["Find Players", "Play with Satish"], img: play },
    { title: "Run", texts: ["Run Clubs Near You", "Match Timings"], img: run },
    { title: "Coach", texts: ["Find Your Coach", "Find Your Teams"], img: coach },
    { title: "Event", texts: ["Upcoming Events", "Satish Registered Event"], img: events },
    { title: "Gym", texts: ["Flex Gym Access", "Satish Got Rewards"], img: gym },
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
    <section className='quick_booking_section'>
      <Container>
        <div className="section_title">
          <h2>Quick Booking</h2>
        </div>
        <Row>
          {cardsData.map((card, i) => (
            <Col key={i} lg={2} md={3} className='col-6'>
              <Card className='border-0'>
                <div className="card_img">
                  <img src={card.img} alt={card.title} />
                </div>
                <div className="card_txt text-center pt-2">
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
  )
}

export default QuickBooking;
