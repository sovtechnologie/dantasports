import React, { useState } from 'react';
import './StyleSheets/Testimonials.css';
import userAvatar from '../assets/UserAvator.png'; // Replace with actual image path
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";


const testimonials = [
  {
    name: 'Amit Verma',
    role: 'Certified Personal Trainer | Pune',
    message: `“DantaSports has simplified how I work with my clients. I can create training plans, track
sessions, schedule workouts, and manage all my clients in one place. I don’t need
spreadsheets or WhatsApp follow-ups anymore. It helps me stay organised and deliver better
results consistently.”`,
    image: userAvatar,
  },
  {
    name: 'Rahul Mehta',
    role: 'Football Enthusiast | Bengaluru',
    message: `“I moved to a new city and didn’t know anyone to play with. Through DantaSports, I found
football games near me, joined sessions with strangers, and eventually made friends. I’ve even
hosted my own games now. It feels less like an app and more like a real sports community.”`,
    image: userAvatar,
  },
  {
    name: 'Suresh Patil',
    role: 'Turf Owner | Mumbai',
    message: `“What I liked about DantaSports is the no-commission approach. Onboarding was simple,
and the dashboard makes it easy to manage bookings, track usage, and handle
customers without manual calls. It feels like software built for venue owners, not against
them.”
`,
    image: userAvatar,
  },
  {
    name: 'Carlos Méndez',
    role: 'Future Stars FC',
    message: `Superb experience! The recommendations were spot-on, and I secured a spot in a top sports university. Totally worth it.`,
    image: userAvatar,
  },

];


const Testimonials = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = window.innerWidth <= 600 ? 1 : 3;

  const next = () => {
    setCurrentIndex((prev) =>
      prev + visibleCards < testimonials.length ? prev + 1 : 0
    );
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - visibleCards : prev - 1
    );
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + visibleCards
  );


  return (
    <section className="testimonials-section">
      <h2>Testimonials</h2>
      <h5 className='my-4'>What Our Community Says</h5>

      <div className="testimonials-wrapper">
        {visibleTestimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <div className="testimonial-header">
              <img src={testimonial.image} alt={testimonial.name} />
              <div>
                <h4>{testimonial.name}</h4>
                <span>{testimonial.role}</span>
              </div>
            </div>
            <p className="testimonial-message">{testimonial.message}</p>
          </div>
        ))}
      </div>
      <div className="testimonial-controls">
        <button onClick={prev}><img src={leftArrow} /></button>
        <button onClick={next}><img src={rightArrow} /></button>
      </div>
    </section>
  );
};

export default Testimonials;
