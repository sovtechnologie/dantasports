import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ReactSlickSlider from '../components/ReactSlickSlider'
import "../Stylesheets/VenuePageSection.css";
import BookBtn from '../components/BookBtn';
import save from "./../assets/downloadAppLogo/save.svg";
import share from "./../assets/downloadAppLogo/share.svg";
import whaitestart from "./../assets/downloadAppLogo/white-star.svg";
import users from "../assets/downloadAppLogo/team-u1.svg"
import SortBy from '../components/SortBy';
import Filter from '../components/Filter';
import SortModal from '../components/SortModal';
import FliterModal from '../components/FliterModal';
import AppDownloadBanner from '../components/AppDownloadBanner';


function VenuePage() {

  
  
 const userList = [
    { id: 1, type: "img", src: users, alt: "User1" },
    { id: 2, type: "img", src: users, alt: "User2" },
    { id: 3, type: "img", src: users, alt: "User3" },
    { id: 5, type: "img", src: users, alt: "User4" },
    { id: 5, type: "img", src: users, alt: "User5" },
   
  ];
  return (
    <>
    <section className='venue_page_section pt-3 pt-lg-5 pb-lg-5 pb-3' style={{background:"#F1F3F2"}}>
      <Container>
        <Row className='g-3'>
          <Col lg="3" md="5" className='d-none d-lg-block d-md-block'>
          <Filter/>
          <SortBy/>
          </Col>
          <Col className='d-lg-none d-md-none text-end'>
          <FliterModal/>
          <SortModal/>

          </Col>
          <Col lg="9" md="7">
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 position-relative">
              <div className="card">
                <div className="card_slider">
                  <ReactSlickSlider/>
                </div>
                 <div className="reating">
                   <div className="start">
                     <img src={whaitestart} alt="" /><span className='ps-2'>4.0 (175)</span>
                   </div>
                   <div className="save_btn">
                         <span><a href=""><img src={save} alt="" /></a></span>
                      </div>
                      <div className='share_btn'>
                        <span><a href=""><img src={share} alt="" /></a></span>
                      </div>
                 </div>
                <div className="inner_txt">
                   <div className="d-flex justify-content-between mb-3 align-content-center align-items-center">
                    <h2 className='m-0'>Red Meadows</h2>
                    <p className='m-0'>~1.8 km</p>
                 </div>
                 <div className="no_off_users">
                    <ul className="d-flex p-0 align-items-center">
                      {userList.map((user) => (
                        <li key={user.id} className='me-2'>
                          {user.type === "img" ? (
                            <img src={user.src} alt={user.alt} />
                          ) : (
                            user.name
                          )}
                        </li>
                      ))}
                      <span style={{color:"#858585"}}>+5 more</span>
                    </ul>
                  </div>
                  <div className="offers d-flex justify-content-between">
                    <span>Upto 50% Off</span>
                    <p className='mb-0'>₹1000 onwards</p>
                  </div>
                  <hr className='mb-3'/>
                  <BookBtn/>
                </div>
              </div>
            </div>
              <div className="col-lg-4 col-md-6 position-relative">
              <div className="card">
                <div className="card_slider">
                  <ReactSlickSlider/>
                </div>
                 <div className="reating">
                   <div className="start">
                     <img src={whaitestart} alt="" /><span className='ps-2'>4.0 (175)</span>
                   </div>
                   <div className="save_btn">
                         <span><a href=""><img src={save} alt="" /></a></span>
                      </div>
                      <div className='share_btn'>
                        <span><a href=""><img src={share} alt="" /></a></span>
                      </div>
                 </div>
                <div className="inner_txt">
                   <div className="d-flex justify-content-between mb-3 align-content-center align-items-center">
                    <h2 className='m-0'>Red Meadows</h2>
                    <p className='m-0'>~1.8 km</p>
                 </div>
                 <div className="no_off_users">
                    <ul className="d-flex p-0 align-items-center">
                      {userList.map((user) => (
                        <li key={user.id} className='me-2'>
                          {user.type === "img" ? (
                            <img src={user.src} alt={user.alt} />
                          ) : (
                            user.name
                          )}
                        </li>
                      ))}
                      <span style={{color:"#858585"}}>+5 more</span>
                    </ul>
                  </div>
                  <div className="offers d-flex justify-content-between">
                    <span>Upto 50% Off</span>
                    <p className='mb-0'>₹1000 onwards</p>
                  </div>
                  <hr className='mb-3'/>
                  <BookBtn/>
                </div>
              </div>
            </div>
              <div className="col-lg-4 col-md-6 position-relative">
              <div className="card">
                <div className="card_slider">
                  <ReactSlickSlider/>
                </div>
                 <div className="reating">
                   <div className="start">
                     <img src={whaitestart} alt="" /><span className='ps-2'>4.0 (175)</span>
                   </div>
                   <div className="save_btn">
                         <span><a href=""><img src={save} alt="" /></a></span>
                      </div>
                      <div className='share_btn'>
                        <span><a href=""><img src={share} alt="" /></a></span>
                      </div>
                 </div>
                <div className="inner_txt">
                   <div className="d-flex justify-content-between mb-3 align-content-center align-items-center">
                    <h2 className='m-0'>Red Meadows</h2>
                    <p className='m-0'>~1.8 km</p>
                 </div>
                 <div className="no_off_users">
                    <ul className="d-flex p-0 align-items-center">
                      {userList.map((user) => (
                        <li key={user.id} className='me-2'>
                          {user.type === "img" ? (
                            <img src={user.src} alt={user.alt} />
                          ) : (
                            user.name
                          )}
                        </li>
                      ))}
                      <span style={{color:"#858585"}}>+5 more</span>
                    </ul>
                  </div>
                  <div className="offers d-flex justify-content-between">
                    <span>Upto 50% Off</span>
                    <p className='mb-0'>₹1000 onwards</p>
                  </div>
                  <hr className='mb-3'/>
                  <BookBtn/>
                </div>
              </div>
            </div>
              <div className="col-lg-4 col-md-6 position-relative">
              <div className="card">
                <div className="card_slider">
                  <ReactSlickSlider/>
                </div>
                 <div className="reating">
                   <div className="start">
                     <img src={whaitestart} alt="" /><span className='ps-2'>4.0 (175)</span>
                   </div>
                   <div className="save_btn">
                         <span><a href=""><img src={save} alt="" /></a></span>
                      </div>
                      <div className='share_btn'>
                        <span><a href=""><img src={share} alt="" /></a></span>
                      </div>
                 </div>
                <div className="inner_txt">
                   <div className="d-flex justify-content-between mb-3 align-content-center align-items-center">
                    <h2 className='m-0'>Red Meadows</h2>
                    <p className='m-0'>~1.8 km</p>
                 </div>
                 <div className="no_off_users">
                    <ul className="d-flex p-0 align-items-center">
                      {userList.map((user) => (
                        <li key={user.id} className='me-2'>
                          {user.type === "img" ? (
                            <img src={user.src} alt={user.alt} />
                          ) : (
                            user.name
                          )}
                        </li>
                      ))}
                      <span style={{color:"#858585"}}>+5 more</span>
                    </ul>
                  </div>
                  <div className="offers d-flex justify-content-between">
                    <span>Upto 50% Off</span>
                    <p className='mb-0'>₹1000 onwards</p>
                  </div>
                  <hr className='mb-3'/>
                  <BookBtn/>
                </div>
              </div>
            </div>
              <div className="col-lg-4 col-md-6 position-relative">
              <div className="card">
                <div className="card_slider">
                  <ReactSlickSlider/>
                </div>
                 <div className="reating">
                   <div className="start">
                     <img src={whaitestart} alt="" /><span className='ps-2'>4.0 (175)</span>
                   </div>
                   <div className="save_btn">
                         <span><a href=""><img src={save} alt="" /></a></span>
                      </div>
                      <div className='share_btn'>
                        <span><a href=""><img src={share} alt="" /></a></span>
                      </div>
                 </div>
                <div className="inner_txt">
                   <div className="d-flex justify-content-between mb-3 align-content-center align-items-center">
                    <h2 className='m-0'>Red Meadows</h2>
                    <p className='m-0'>~1.8 km</p>
                 </div>
                 <div className="no_off_users">
                    <ul className="d-flex p-0 align-items-center">
                      {userList.map((user) => (
                        <li key={user.id} className='me-2'>
                          {user.type === "img" ? (
                            <img src={user.src} alt={user.alt} />
                          ) : (
                            user.name
                          )}
                        </li>
                      ))}
                      <span style={{color:"#858585"}}>+5 more</span>
                    </ul>
                  </div>
                  <div className="offers d-flex justify-content-between">
                    <span>Upto 50% Off</span>
                    <p className='mb-0'>₹1000 onwards</p>
                  </div>
                  <hr className='mb-3'/>
                  <BookBtn/>
                </div>
              </div>
            </div>
              <div className="col-lg-4 col-md-6 position-relative">
              <div className="card">
                <div className="card_slider">
                  <ReactSlickSlider/>
                </div>
                 <div className="reating">
                   <div className="start">
                     <img src={whaitestart} alt="" /><span className='ps-2'>4.0 (175)</span>
                   </div>
                   <div className="save_btn">
                         <span><a href=""><img src={save} alt="" /></a></span>
                      </div>
                      <div className='share_btn'>
                        <span><a href=""><img src={share} alt="" /></a></span>
                      </div>
                 </div>
                <div className="inner_txt">
                   <div className="d-flex justify-content-between mb-3 align-content-center align-items-center">
                    <h2 className='m-0'>Red Meadows</h2>
                    <p className='m-0'>~1.8 km</p>
                 </div>
                 <div className="no_off_users">
                    <ul className="d-flex p-0 align-items-center">
                      {userList.map((user) => (
                        <li key={user.id} className='me-2'>
                          {user.type === "img" ? (
                            <img src={user.src} alt={user.alt} />
                          ) : (
                            user.name
                          )}
                        </li>
                      ))}
                      <span style={{color:"#858585"}}>+5 more</span>
                    </ul>
                  </div>
                  <div className="offers d-flex justify-content-between">
                    <span>Upto 50% Off</span>
                    <p className='mb-0'>₹1000 onwards</p>
                  </div>
                  <hr className='mb-3'/>
                  <BookBtn/>
                </div>
              </div>
            </div>
            
          </div>

          </Col>
        </Row>
        <AppDownloadBanner/>
      </Container>
    </section>
    </>
  )
}

export default VenuePage
