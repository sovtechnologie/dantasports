import React, { useState } from 'react';
import './StyleSheets/Testimonials.css';
import userAvatar from '../assets/UserAvator.png'; // Replace with actual image path
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";


const testimonials = [
  {
    name: 'Alice Johnson',
    role: 'Team Velocity',
    message: `This AI platform made the entire process so simple! I found the perfect program and received a scholarship I never thought I could get. I’m now thriving in my final year.`,
    image: userAvatar,
  },
  {
    name: 'Ravi Patel',
    role: 'Cricket United',
    message: `I never imagined I'd get this much support. From admissions to visa, the tool helped me at every step. Grateful for the opportunity it unlocked for me!`,
    image: userAvatar,
  },
  {
    name: 'Lina Zhang',
    role: 'Falcon Flyers',
    message: `From the moment I signed up, I felt guided. It found three great matches and even helped with documentation and timelines. I'm finally pursuing my dream career!`,
    image: userAvatar,
  },
  {
    name: 'Carlos Méndez',
    role: 'Future Stars FC',
    message: `Superb experience! The recommendations were spot-on, and I secured a spot in a top sports university. Totally worth it.`,
    image: userAvatar,
  },
  {
    name: 'Emily Smith',
    role: 'Champion Makers',
    message: `This tool is a game changer. I got clarity, structure, and support—plus I found a program that was the perfect fit for my career goals.`,
    image: userAvatar,
  },
  {
    name: 'Tariq Al Habibi',
    role: 'Desert Hawks',
    message: `I’ve tried many platforms before, but nothing compares to this. Fast, intuitive, and incredibly accurate with matching me to the right opportunities.`,
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
        <button onClick={prev}><img src={leftArrow}/></button>
        <button onClick={next}><img src={rightArrow}/></button>
      </div>
    </section>
  );
};

export default Testimonials;
