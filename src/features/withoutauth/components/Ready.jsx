import React from 'react'
import { Link } from 'react-router-dom'

function Ready() {
  return (
    <>
      <section
        className="who_section py-lg-5 py-4"
        style={{ background: "#1163C7" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 m-auto text-center facility-text">
              <h2 className="mb-lg-4 mb-3 text-white">
                Ready to Grow With DantaSports?
              </h2>
              <p className="text-white">
                Join a platform designed to help you earn more, manage better,
                and grow faster-without heavy commissions.
              </p>

              <div className="mt-3">
                <Link
                  to=""
                  className="btn btn-light rounded-pill px-4 py-2 fw-semibold m-2" style={{color: "#1163C7"}}
                >
                  Request a Demo
                </Link>
                 <Link
                  to=""
                  className="btn btn-light rounded-pill px-4 py-2 fw-semibold m-2"style={{color: "#1163C7"}}
                >
                 Book a Call With Us
                </Link>
                 <Link
                  to=""
                  className="btn btn-light rounded-pill px-4 py-2 fw-semibold m-2"style={{color: "#1163C7"}}
                >
                  Become a Partner
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Ready
