import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "../../withoutauth/Stylesheets/Filterpages/PageSearch.css";
import searchIcon from "../../withoutauth/assets/icons/Search.svg"

const searchDetails = {

     defaultpage:{
      title:"satsih sahu venue page",
      placeholder: "binod venue",
      
   },

   venuepage:{
      title:"Discover Turf in near you",
      placeholder: "Search Turf..",
      
   },
   HostPage: {

      title: "Discover Play in near you",
       placeholder: "Search Play..",

   },
   CoachPage:{
      title: "Discover Coach’s in near you",
      placeholder: "Search Coach..",
   },
     EventPage: {

      title: "Discover events in near you",
       placeholder: "Search Events..",

   },
       RunPage: {

      title: "Discover Run in near you",
       placeholder: "Search Run..",

   },
        PlayPage: {

      title: "Discover Play in near you",
       placeholder: "Search Play..",

   }
}
function PageSearch({searchValue = "defaultpage"}) {

   console.log(searchValue);
   

   // const { title, placeholder } = searchDetails[searchValue];
   const details = searchDetails[searchValue] || searchDetails.defaultpage;
  const { title, placeholder } = details;

  return (
    <>
     <section className='search_wrapper'>
        <Container>
          <Row className=' justify-content-center align-items-center g-3 '>
                <Col lg={6} md={6}> 
                   <h3>{title}</h3>
                </Col>
                <Col lg={6} md={6} className=' position-relative sech_icon'>
                    <span><img src={searchIcon}  /></span>
                   <input type="text" className='form-control' placeholder={placeholder} name="" id="" />
                </Col>
             </Row>
        </Container>
     </section>
    </>
  )
}

export default PageSearch
