import React from "react";
import ".//StyleSheets/BookCoach.css";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import star from "../assets/images/home/bookvenues/star.svg";
import likeIcon from "../assets/images/home/bookvenues/like.svg";
import shareIcon from "../assets/images/home/bookvenues/share.svg";
import dateIcon from "../assets/images/home/bookrun/date.svg";
import mapIcon from "../assets/images/home/bookrun/map.svg";
import gymImg from "../assets/images/home/bookcoach/coach1.png";
import sportIcons from "../assets/images/home/bookcoach/Basketball.svg"
import "bootstrap/dist/css/bootstrap.min.css";


function BookCoach() {
  return (
    <>
      <section className="coach_section_home">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <div className="section_title">
              <h2>Book Coach</h2>
            </div>
            <div className="see_all">
              <a href="">See All</a>
            </div>
          </div>
          <Row className="g-3">
            <Col lg={3} md={6}>
              <div className="card border-0">
                <div className="card_img">
                    <img src={gymImg} alt="" />
                </div>
                <div className="card_icons">
                    <img src={likeIcon} className="like" alt="" />
                    <img src={shareIcon} className="share" alt="" />
                </div>
                <div className="rating">
                    <img src={star} alt="" /><span>4.0 (175)</span>
                </div>
                <div className="trainerbox">
                    <span>Trainer</span>
                </div>
                <div className="txt_wrapper">
                    <div className="d-flex justify-content-between">
                        <h2 className="text_wrap2 card_heading m-0">Preak Arya</h2>
                        <p className="adult m-0">Adults</p>
                    </div>
                    <div className="sport_icon d-flex mt-3">
                        <div className="sport">
                            <img src={sportIcons} alt="" />
                        </div>
                         <div className="sport ms-2">
                            <img src={sportIcons} alt="" />
                        </div>
                    </div>
                    <div className="d-flex">
                        <p className="card_date mb-3"> <span className="me-2"><img src={mapIcon} alt="" /></span> Connaught Place, New Delhi</p>
                    </div>
                    <div className="card_line m-0"></div>
                    <div className="offer mt-3">
                        <a href="">Enquire Now</a>
                    </div>
                </div>
              </div>
            </Col>
             <Col lg={3} md={6}>
              <div className="card border-0">
                <div className="card_img">
                    <img src={gymImg} alt="" />
                </div>
                <div className="card_icons">
                    <img src={likeIcon} className="like" alt="" />
                    <img src={shareIcon} className="share" alt="" />
                </div>
                <div className="rating">
                    <img src={star} alt="" /><span>4.0 (175)</span>
                </div>
                <div className="trainerbox">
                    <span>Trainer</span>
                </div>
                <div className="txt_wrapper">
                    <div className="d-flex justify-content-between">
                        <h2 className="text_wrap2 card_heading m-0">Preak Arya</h2>
                        <p className="adult m-0">Adults</p>
                    </div>
                    <div className="sport_icon d-flex mt-3">
                        <div className="sport">
                            <img src={sportIcons} alt="" />
                        </div>
                         <div className="sport ms-2">
                            <img src={sportIcons} alt="" />
                        </div>
                    </div>
                    <div className="d-flex">
                        <p className="card_date mb-3"> <span className="me-2"><img src={mapIcon} alt="" /></span> Connaught Place, New Delhi</p>
                    </div>
                    <div className="card_line m-0"></div>
                    <div className="offer mt-3">
                        <a href="">Enquire Now</a>
                    </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default BookCoach;
