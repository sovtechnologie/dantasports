import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./StyleSheets/HomeBanner.css";
import icon from "../assets/homebanner/icon.svg";
import blueArrow from "../assets/homebanner/blue-arrow.svg";
import white from "../assets/homebanner/white-arrow.svg";
import bannerimg from "../assets/homebanner/banner-img.png";
// import bannervdo from "../assets/homebanner/bannervdo.mp4";
import bannervdo from "../assets/homebanner/banner-img.gif";
import bannercard from "../assets/homebanner/bannercards.png";


function HomeBanner() {
  const texts = [
    "Reserve Nearby Turfs",
    "Find Players. Join Games.",
    "Join Local Run Clubs",
    "Find Your Coach",
    "Book Fitness Events",
    "Pay Per Workout"
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setFade(true); // fade-in
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="home_banner">
        <Container>
          <Row>
            <Col lg={7}>
              <div className="Join_Community">
                <img src={icon} height={30} width={30} alt="" />
                <span className="ps-3">Join The Community</span>
              </div>

              <div className="banner_txt">
                <h1
                  className={`fade-text ${fade ? "fade-in-up" : "fade-out"}`}
                  dangerouslySetInnerHTML={{ __html: texts[index] }}
                ></h1>

                <p>
                  Join India’s fastest growing fitness community.
                </p>
                <p>Play, host, run, train and compete with local teams - together, stronger.</p>

                <p> We Move as One. Keep India Fit.</p>
              </div>

              <div className="get_started mb-4 mb-lg-0">
                {/* <a href="" className="get_started_btn">
                  Get Started
                  <img className="blue_arrow" src={blueArrow} alt="" />
                </a> */}
                <a href={`/venue`} className="book_now">
                  Book a Turf{" "}
                  <img src={white} className="blue_arrow" alt="" />
                </a>
              </div>
              <div className="card_img1 mt-5 d-none d-lg-block">
                <img src={bannercard} className="w-75 h-100" alt="" />
              </div>
            </Col>

            <Col lg={5} md={7} className="text-end m-auto">
              <div className="img_container">
                {/* <video
                  className="w-100 h-100"
                  src={bannervdo}
                  autoPlay
                  loop
                  muted
                  playsInline
                /> */}
                <img src={bannervdo} className="w-100" alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default HomeBanner;
