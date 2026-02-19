import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "../stylesheets/AccountDeactivate.css";
import delt from "../features/withoutauth/assets/account/delete.svg"
import days from "../features/withoutauth/assets/account/days.svg";
import months from "../features/withoutauth/assets/account/months.svg";
import years from "../features/withoutauth/assets/account/years.svg";

function AccountDeactivate() {
  return (
    <>
     <section className='pt-lg-5 pb-lg-5 pt-3 pb-3 account_deactive_section' style={{background:"#F1F3F2"}}>
        <Container>
            <Row>
                <Col>
                  <div className="account_titel">
                    <h1>Account Deactivate & Data Retention Policy</h1>
                     <p>Last updated: 28 Sep 2025</p>
                  </div>
                  <div className="account_titel mt-lg-5 mt-3">
                    <h1>Overview</h1>
                     <p>Last updated: 28 Sep 2025</p>
                  </div>
                
                </Col>
            </Row>
              <div className="bder"></div>
            <Row className='mt-lg-5 mt-3'>
                <Col> 
                   <div className="listing">
                      <h2>How to Request Account Deactivate</h2>
                      <ol className='ps-3'>
                        <li> Open the DantaSports App & Web.</li>
                        <li>Go to Profile → Settings → Account → Delete Account.</li>
                        <li>Confirm via OTP or email verification.</li>
                        <li>You will receive an email confirmation once deletion completes.</li>
                      </ol>
                      <p>
                        Alternatively, email us at <a href="mailto:support@dantasports.com"> support@dantasports.com </a> from your registered email address with the subject "Delete my account".
                        </p>
                   </div>
                </Col>
            
            </Row>
             <div className="bder"></div>
             <Row>
                <Col lg={6}>
                  <div className="listing">
                    <h2>Data Deactivate Upon Account Deletion</h2>
                    <ul className='ps-3 mt-3'>
                        <li>Personal profile information (name, email, phone)</li>
                        <li>Authentication identifiers</li>
                        <li>User-generated content (posts, uploads)</li>
                        <li>App activity data (booking history, preferences)</li>
                        <li>Session tokens and device mappings</li>

                    </ul>
                  </div>
                </Col>
                <Col lg={6}>
                        <div className="listing">
                            <h2>Data Retained</h2>
                            <p> We keep limited data for compliance, fraud prevention, and accounting:</p>
                            <ul className='ps-3 mt-3'>
                                <li> <strong>Payments & invoices: </strong>Up to 10 years (tax and audit)</li>
                                <li><strong>Customer support communications:</strong> 12 months</li>
                                <li><strong>Security & fraud logs:</strong> 24 months</li>
                                <li><strong>Aggregated or anonymized analytics:</strong> Retained indefinitely (non-identifiable)</li>
                            </ul>
                        </div>
                </Col>
             </Row>
              <div className="bder"></div>
              <Row className='g-3'>
                 <div className="tite">
                    <h2 className='mb-4'>Retention Timeline</h2>
                 </div>
                <Col lg="3" md={4} sm={6} className='col-12'>
                  <div className="card">
                    <div className="card_logo">
                        <img src={delt} alt="" />
                    </div>
                    <h3 className='mt-2 mb-0'>Immediate Deletion</h3>
                    <p>User data removed</p>
                  </div>
                </Col>
                  <Col lg="3" md={4} sm={6} className='col-12'>
                  <div className="card">
                    <div className="card_logo">
                        <img src={days} alt="" />
                    </div>
                    <h3 className='mt-2 mb-0'>90 Days</h3>
                    <p>Backups purged</p>
                  </div>
                </Col>
                  <Col lg="3" md={4} sm={6} className='col-12'>
                  <div className="card">
                    <div className="card_logo">
                        <img src={months} alt="" />
                    </div>
                    <h3 className='mt-2 mb-0'>24 Months</h3>
                    <p>Logs & Support Records</p>
                  </div>
                </Col>
                  <Col lg="3" md={4} sm={6} className='col-12'>
                  <div className="card">
                    <div className="card_logo">
                        <img src={days} alt="" />
                    </div>
                    <h3 className='mt-2 mb-0'>10 years</h3>
                    <p>Financial Records</p>
                  </div>
                </Col>
                <Col className='pt-lg-5 pt-3'>
                   <p>Backups purge within 30 days; some records may persist longer in disaster-recovery archives but are inaccessible for normal processing.</p>
                </Col>
              </Row>
                <div className="bder"></div>
             <Row>
                        <Col lg={6}>
                        <div className="listing">
                            <h2 className='mb-3'>Region & Vendors</h2>
                            <p>Primary hosting: AWS (India region for Indian users; additional regions as required). Data processors and sub-processors are listed in our Privacy Policy. Cross-border transfers (if any) follow contractual safeguards.</p>
                        </div>
                        </Col>
                        <Col lg={6}>
                                <div className="listing">
                                    <h2 className='mb-3'>Deletion Exceptions</h2>
                                    <p>We may delay or decline deletion when required by law, to resolve disputes, collect fees, prevent fraud or abuse, or enforce our Terms of Service.</p>
                                </div>
                        </Col>
             </Row>
                <div className="bder"></div>
                 <Row className='mt-lg-5 mt-3'>
                <Col> 
                   <div className="listing">
                      <h2>Contact Us</h2>
                      <p> If you face any issues deleting your account or have questions about this policy, contact:</p>
                      <ul className='ps-3'>
                       <li>Email: <a href="mailto:support@dantasports.com">support@dantasports.com</a></li>
                       <li>Privacy Contact: <a href="mailto:privacy@dantasports.com">privacy@dantasports.com</a></li>
                       <li>Address: DantaSports Private Limited, [Your Registered Office Address as per MCA Certificate]</li>
                      </ul>
                     
                   </div>
                </Col>
            
            </Row>
        </Container>
     </section>
    </>
  )
}

export default AccountDeactivate
