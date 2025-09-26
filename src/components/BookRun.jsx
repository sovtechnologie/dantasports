import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ".//StyleSheets/BookRun.css";
import star from "../assets/images/home/bookvenues/star.svg";
import like from "../assets/images/home/bookvenues/like.svg";
import share from "../assets/images/home/bookvenues/share.svg";
import date from "../assets/images/home/bookrun/date.svg";
import map from "../assets/images/home/bookrun/map.svg";
import bookrun from "../assets/images/home/bookrun/bookrun.png";

function BookRun() {
  return (
    <section className="book_venue_section">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div className="section_title">
            <h2>Book Run</h2>
          </div>
          <div className="see_all">
            <a href="">See All</a>
          </div>
        </div>
        <Row className="g-3">
          <Col lg={3} md={6} sm={6}>
            <Card>
              <div className="card_img">
                <img src={bookrun} className="w-100" alt="" />
              </div>
              <div className="card_icons">
                <a href="">
                  <img className="like" src={like} alt="like" />
                </a>
                <a href="">
                  <img className="share" src={share} alt="like" />
                </a>
              </div>
              <div className="txt_wrapper">
                <div className="card_txt">
                  <h2>Green Run Marathon</h2>
                   <p><span><img className="pe-2" src={date} alt="" /></span>22 Jun - 23 Jun l 6AM onwards</p>
                   <p><span><img className="pe-2" src={map} alt="" /></span>Palika Bazar Gate 1, Delhi-451200</p>
                </div>
                <div className="sports_title">
                  <p>Football, Cricket</p>
                </div>
                <div className="offer d-flex justify-content-between align-items-center">
                  <p>Upto 50%off</p>
                  <a href="">Join Now</a>
                </div>
              </div>
            </Card>
          </Col>
           <Col lg={3} md={6} sm={6}>
            <Card>
              <div className="card_img">
                <img src={bookrun} className="w-100" alt="" />
              </div>
              <div className="card_icons">
                <a href="">
                  <img className="like" src={like} alt="like" />
                </a>
                <a href="">
                  <img className="share" src={share} alt="like" />
                </a>
              </div>
              <div className="txt_wrapper">
                <div className="card_txt">
                  <h2>Green Run Marathon</h2>
                   <p><span><img className="pe-2" src={date} alt="" /></span>22 Jun - 23 Jun l 6AM onwards</p>
                   <p><span><img className="pe-2" src={map} alt="" /></span>Palika Bazar Gate 1, Delhi-451200</p>
                </div>
                <div className="sports_title">
                  <p>Football, Cricket</p>
                </div>
                <div className="offer d-flex justify-content-between align-items-center">
                  <p>Upto 50%off</p>
                  <a href="">Join Now</a>
                </div>
              </div>
            </Card>
          </Col>
           <Col lg={3} md={6} sm={6}>
            <Card>
              <div className="card_img">
                <img src={bookrun} className="w-100" alt="" />
              </div>
              <div className="card_icons">
                <a href="">
                  <img className="like" src={like} alt="like" />
                </a>
                <a href="">
                  <img className="share" src={share} alt="like" />
                </a>
              </div>
              <div className="txt_wrapper">
                <div className="card_txt">
                  <h2>Green Run Marathon</h2>
                   <p><span><img className="pe-2" src={date} alt="" /></span>22 Jun - 23 Jun l 6AM onwards</p>
                   <p><span><img className="pe-2" src={map} alt="" /></span>Palika Bazar Gate 1, Delhi-451200</p>
                </div>
                <div className="sports_title">
                  <p>Football, Cricket</p>
                </div>
                <div className="offer d-flex justify-content-between align-items-center">
                  <p>Upto 50%off</p>
                  <a href="">Join Now</a>
                </div>
              </div>
            </Card>
          </Col>
           <Col lg={3} md={6} sm={6}>
            <Card>
              <div className="card_img">
                <img src={bookrun} className="w-100" alt="" />
              </div>
              <div className="card_icons">
                <a href="">
                  <img className="like" src={like} alt="like" />
                </a>
                <a href="">
                  <img className="share" src={share} alt="like" />
                </a>
              </div>
              <div className="txt_wrapper">
                <div className="card_txt">
                  <h2>Green Run Marathon</h2>
                   <p><span><img className="pe-2" src={date} alt="" /></span>22 Jun - 23 Jun l 6AM onwards</p>
                   <p><span><img className="pe-2" src={map} alt="" /></span>Palika Bazar Gate 1, Delhi-451200</p>
                </div>
                <div className="sports_title">
                  <p>Football, Cricket</p>
                </div>
                <div className="offer d-flex justify-content-between align-items-center">
                  <p>Upto 50%off</p>
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

export default BookRun;
