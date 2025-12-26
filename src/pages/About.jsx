import React, { useEffect, useState } from "react";
import "../stylesheets/About.css";

import caroselImage from "../assets/carousel-image1.png";
import caroselImage2 from "../assets/carousel-image2.png";
import DantaStats from "../components/DantaStats";
import visionImg from "../assets/Mission-Image.png";
import CultureValues from "../components/CultureValues";
import Testimonials from "../components/Testimonials";
import DownloadAppSection from "../components/DownloadAppSection";
import { Col, Container, Row } from "react-bootstrap";

const images = [caroselImage, caroselImage2, caroselImage, caroselImage2];

function About() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <section>
        <div>
          <div className="container">
            <div className="Corporate-header">
            <div className="header-left">
              <h1>
                Building India’s Largest
                <br />
                <span>Fitness Community</span>
              </h1>
              <p>
                DantaSports is a unified fitness platform built to bring people
                together through play, training, and community.
              </p>
              <p>
                We help sports and fitness enthusiasts discover venues, join games,
                stay active consistently, and grow together on and off the field
              </p>
              <div className="button-group">
                <button className="primary-btn">Get Started </button>
                <button className="secondary-btn"> Book a Venue</button>
              </div>
            </div>

            <div className="header-right">
              <img
                src={images[currentImage]}
                alt="Corporate Wellness"
                className="carousel-img"
              />
              <div className="pagination-dots">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${i === currentImage ? "active" : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>
          </div>
          <div className="container">
            <DantaStats />
          </div>

          <section className="mission-vision-section">
            <div className="container">
              <div className="content-block">
                <img src={visionImg} alt="Mission" className="content-image" />
                <div className="text-block">
                  <h3>
                    Our <span className="highlight">Mission</span>
                  </h3>
                  <p>To make fitness a daily lifestyle, not a luxury</p>
                  <p>
                    We aim to empower individuals and communities across India by
                    creating an accessible, structured, and inclusive fitness
                    ecosystem-where anyone can play, train, improve, and belong,
                    regardless of skill level.
                  </p>
                  <p>
                    <b>Keep India Fit.</b>
                  </p>
                </div>
              </div>

              <div className="content-block reverse">
                <img src={visionImg} alt="Vision" className="content-image" />
                <div className="text-block">
                  <h3>
                    Our <span className="highlight">Vision</span>
                  </h3>
                  <p>
                    To build India’s most trusted and scalable fitness
                    ecosystem-where community meets consistency, participation turns
                    into habit, and everyday players become lifelong athletes.
                  </p>
                  <p>
                    We envision a future where fitness is not occasional, isolated,
                    or intimidating-but social, connected, and sustainable.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="culture-wrapper">
            <CultureValues />
          </div>
          <Container>
            <Row className="my-lg-5 my-3">
              <Col className="col-12 text-center">
                <h2 className="culture-heading">
                  A Note from the <span className="highlight">Founder</span>{" "}
                </h2>
              </Col>
              <Col className="col-12">
                <div className="text-block">
                  <p>
                    When I started DantaSports, it wasn’t to build just another
                    sports app
                  </p>
                  <p>
                    It came from a simple observation:{" "}
                    <b>
                      India doesn’t lack talent or intent-it lacks structure and
                      connection.
                    </b>
                  </p>
                  <p>
                    People want to play. They want to stay fit. They want to belong.
                    But the ecosystem makes it harder than it should be.
                  </p>
                  <p>DantaSports was built to change that.</p>
                  <p>
                    We are creating a platform where fitness is not intimidating,
                    fragmented, or transactional-but
                    <b>human, social, and consistent.</b> Where venues grow
                    sustainably, communities thrive organically, and individuals
                    stay active not because they have to-but because they{" "}
                    <b>want to.</b>
                  </p>
                  <p>At its core, DantaSports is about moving together.</p>
                  <p>About progress over perfection</p>
                  <p>About building habits that last.</p>
                  <p>Thank you for being part of this journey.</p>
                  <p>
                    <b>We Move as One.</b>
                  </p>
                  <p>
                    <b>- Sabyasachi Mangaraj</b>
                  </p>
                  <p>CoFounder, DantaSports</p>
                </div>
              </Col>
            </Row>
          </Container>
          <div className="container">
            <Testimonials />
          </div>
          <div className="DownloadApp-wrapper">
            <DownloadAppSection />
          </div>
        </div>
      </section>
    </>

  );
}

export default About;
