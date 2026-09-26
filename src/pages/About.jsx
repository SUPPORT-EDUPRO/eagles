import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaHeart, FaPalette, FaRegLightbulb } from 'react-icons/fa';

import SEOManager from '../components/SEO/SEOManager';
import PageHero from '../components/marketing/PageHero';
import { homeStoryPhotos } from '../data/publicPhotos';

const values = [
  {
    icon: FaHeart,
    title: 'Care',
    description: 'A warm welcome, kind attention, and a sense of belonging.',
  },
  {
    icon: FaRegLightbulb,
    title: 'Curiosity',
    description: 'Space to ask questions, try things, and learn through play.',
  },
  {
    icon: FaPalette,
    title: 'Creativity',
    description: 'Everyday chances to make, imagine, and express ideas.',
  },
];

function About() {
  return (
    <div className="ye-page ye-about">
      <SEOManager
        title="Our Story | Young Eagles Day Care"
        description="Get to know Young Eagles, a day-care centre in Mamelodi guided by care, play and creativity."
        keywords="about Young Eagles, Mamelodi day care, Young Eagles story"
        url="https://www.youngeagles.org.za/about"
      />

      <PageHero
        kicker="Our story"
        title="Where learning meets love."
        lede="Young Eagles is a day-care centre in Mamelodi, built around a simple belief: children deserve room to feel cared for, curious and creative."
      />

      <section className="ye-about-story">
        <div className="ye-wrap ye-about-story__layout">
          <div className="ye-about-story__copy">
            <p className="ye-eyebrow">A little history</p>
            <h2>A Mamelodi story, since 2009.</h2>
            <p>
              Young Eagles began in 2009 with the aim of giving children a caring place to spend
              their day and grow through play, creativity and connection.
            </p>
            <p>
              We are proud to be part of the Mamelodi community. Families are welcome to get in
              touch, ask questions and learn more about the school.
            </p>
            <Link className="ye-text-link" to="/contact">
              Get in touch <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
          <figure className="ye-about-story__photo">
            <img
              src={homeStoryPhotos.heritage.src}
              alt={homeStoryPhotos.heritage.alt}
              loading="lazy"
            />
            <figcaption>{homeStoryPhotos.heritage.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="ye-about-values" aria-labelledby="ye-values-title">
        <div className="ye-wrap">
          <div className="ye-section-heading">
            <p className="ye-eyebrow">What matters here</p>
            <h2 id="ye-values-title">Care. Curiosity. Creativity.</h2>
            <p>These are the ideas behind “Where learning meets love.”</p>
          </div>
          <div className="ye-values-list">
            {values.map((value, index) => (
              <article className="ye-value" key={value.title}>
                <span className="ye-value__index">0{index + 1}</span>
                {React.createElement(value.icon, { className: 'ye-value__icon', 'aria-hidden': true })}
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ye-about-visit">
        <div className="ye-wrap ye-about-visit__layout">
          <div>
            <p className="ye-eyebrow ye-eyebrow--light">Come say hello</p>
            <h2>Get to know Young Eagles in person.</h2>
            <p>Contact us to ask a question or arrange a time to visit.</p>
          </div>
          <div className="ye-actions">
            <Link className="ye-btn ye-btn-light" to="/contact">Plan a visit</Link>
            <Link className="ye-btn ye-btn-on-dark" to="/programs">Explore programmes</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
