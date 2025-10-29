import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "../../withoutauth/Stylesheets/Filterpages/PageSearch.css";
import searchIcon from "../../withoutauth/assets/icons/Search.svg"
function PageSearch() {
  return (
    <>
     <section className='search_wrapper'>
        <Container>
           <div>
             <Row>
                <Col lg={6}> 
                   <h3>Discover events in near you</h3>
                </Col>
                <Col lg={6} className=' position-relative sech_icon'>
                    <span><img src={searchIcon}  /></span>
                   <input type="text" className='form-control' placeholder='Search Venue/Sports location' name="" id="" />
                </Col>
             </Row>
           </div>
        </Container>
     </section>
    </>
  )
}

export default PageSearch
