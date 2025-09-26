import React from 'react'
import { Container, Row, Col, Card } from "react-bootstrap";
import  './/StyleSheets/BookVenues.css';
import star from '../assets/images/home/bookvenues/star.svg'
import like from '../assets/images/home/bookvenues/like.svg';
import share from '../assets/images/home/bookvenues/share.svg';
import venues1 from '../assets/images/home/bookvenues/redmeadows.png';

function BookVenues() {
  return (

    <>
    
    <section className='book_venue_section'>
        <Container>
            <div className="d-flex justify-content-between align-items-center">
              <div className="section_title">
               <h2>Book Venues</h2>
            </div>
            <div className="see_all">
              <a href="">See All</a>
            </div>
            </div>
            <Row className='g-3'>
                <Col lg={3} md={6} sm={6}> 
                
                  <Card>
                    <div className="card_img">
                        <img src={venues1} className='w-100' alt="" />
                    </div>
                    <div className="card_icons">
                    <a href=""><img className='like' src={like} alt="like" /></a>
                     <a href=""><img className='share' src={share} alt="like" /></a>
                  </div>
                    <div className="txt_wrapper">
                    <div className="card_txt">
                      <h2>Red Meadows</h2>
                      <p><span className='star pe-2'><img src={star} alt="" /></span> <strong className='pe-2'>4.0 (175)</strong>~1.8 km</p>
                    </div>
                    <div className="sports_title">
                      <p>Football, Cricket</p>
                    </div>
                    <div className="offer d-flex justify-content-between align-items-center">
                       <p>Upto 50%off</p>
                       <a href="">Book Now</a>
                    </div>
                    </div>
                  </Card>
                </Col>
                 <Col lg={3} md={6} sm={6}> 
                
                  <Card>
                    <div className="card_img">
                        <img src={venues1} className='w-100' alt="" />
                    </div>
                    <div className="card_icons">
                    <a href=""><img className='like' src={like} alt="like" /></a>
                     <a href=""><img className='share' src={share} alt="like" /></a>
                  </div>
                    <div className="txt_wrapper">
                    <div className="card_txt">
                      <h2>Red Meadows</h2>
                      <p><span className='star pe-2'><img src={star} alt="" /></span> <strong className='pe-2'>4.0 (175)</strong>~1.8 km</p>
                    </div>
                    <div className="sports_title">
                      <p>Football, Cricket</p>
                    </div>
                    <div className="offer d-flex justify-content-between align-items-center">
                       <p>Upto 50%off</p>
                       <a href="">Book Now</a>
                    </div>
                    </div>
                  </Card>
                </Col>
                 <Col lg={3} md={6} sm={6}> 
                
                  <Card>
                    <div className="card_img">
                        <img src={venues1} className='w-100' alt="" />
                    </div>
                    <div className="card_icons">
                    <a href=""><img className='like' src={like} alt="like" /></a>
                     <a href=""><img className='share' src={share} alt="like" /></a>
                  </div>
                    <div className="txt_wrapper">
                    <div className="card_txt">
                      <h2>Red Meadows</h2>
                      <p><span className='star pe-2'><img src={star} alt="" /></span> <strong className='pe-2'>4.0 (175)</strong>~1.8 km</p>
                    </div>
                    <div className="sports_title">
                      <p>Football, Cricket</p>
                    </div>
                    <div className="offer d-flex justify-content-between align-items-center">
                       <p>Upto 50%off</p>
                       <a href="">Book Now</a>
                    </div>
                    </div>
                  </Card>
                </Col>
                 <Col lg={3} md={6} sm={6}> 
                
                  <Card>
                    <div className="card_img">
                        <img src={venues1} className='w-100' alt="" />
                    </div>
                    <div className="card_icons">
                    <a href=""><img className='like' src={like} alt="like" /></a>
                     <a href=""><img className='share' src={share} alt="like" /></a>
                  </div>
                    <div className="txt_wrapper">
                    <div className="card_txt">
                      <h2>Red Meadows</h2>
                      <p><span className='star pe-2'><img src={star} alt="" /></span> <strong className='pe-2'>4.0 (175)</strong>~1.8 km</p>
                    </div>
                    <div className="sports_title">
                      <p>Football, Cricket</p>
                    </div>
                    <div className="offer d-flex justify-content-between align-items-center">
                       <p>Upto 50%off</p>
                       <a href="">Book Now</a>
                    </div>
                    </div>
                  </Card>
                </Col>
                 
            </Row>
        </Container>
    </section>
    </>
  )
}

export default BookVenues
