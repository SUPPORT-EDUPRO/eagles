import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaBookOpen,
  FaHeart,
  FaMapMarkerAlt,
  FaPalette,
  FaRegLightbulb,
  FaUserGraduate,
  FaWhatsapp,
} from 'react-icons/fa';

import SEOManager from '../components/SEO/SEOManager';
import {
  youngEaglesRegistrationUrl,
  youngEaglesWhatsAppUrl,
} from '../config/marketing';
import { homeStoryPhotos } from '../data/publicPhotos';

const moments = [
  {
    number: '01',
    title: 'Care & connection',
    description: 'A warm welcome and thoughtful care help each day begin well.',
    icon: FaHeart,
  },
  {
    number: '02',
    title: 'Play & discovery',
    description: 'Time to explore, ask questions, and learn through play.',
    icon: FaRegLightbulb,
  },
  {
    number: '03',
    title: 'Creativity & expression',
    description: 'Making, imagining, and sharing ideas are part of growing up.',
    icon: FaPalette,
  },
];

const trustIndicators = [
  { label: 'Safe & caring', icon: FaHeart, accent: 'pink' },
  { label: 'Qualified teachers', icon: FaUserGraduate, accent: 'gold' },
  { label: 'Learning through play', icon: FaRegLightbulb, accent: 'blue' },
  { label: 'Mamelodi community', icon: FaMapMarkerAlt, accent: 'pink' },
];

const programmeHighlights = [
  {
    title: 'Play & explore',
    description: 'Curiosity starts with trying things out. Play gives children room to move, notice, ask questions and discover.',
    icon: FaRegLightbulb,
    accent: 'blue',
  },
  {
    title: 'Make & create',
    description: 'Painting, making and building offer different ways for children to share what is in their imagination.',
    icon: FaPalette,
    accent: 'gold',
  },
  {
    title: 'Stories & togetherness',
    description: 'Stories and shared activities create space for listening, expressing ideas and enjoying time together.',
    icon: FaBookOpen,
    accent: 'pink',
  },
];

function ProductionHome() {
  return (
    <div className="ye-page ye-home">
      <SEOManager
        title="Young Eagles Day Care | Mamelodi"
        description="Young Eagles Day Care in Mamelodi. Where learning meets love, through play, care and creativity."
        keywords="Young Eagles, day care, Mamelodi, 2027 registration"
        url="https://www.youngeagles.org.za"
      />

      <section className="ye-home-hero">
        <div className="ye-wrap ye-home-hero__inner">
          <div className="ye-home-hero__copy">
            <p className="ye-eyebrow">Preschool &amp; day care in Mamelodi, Pretoria</p>
            <h1>A happy start for growing minds.</h1>
            <p className="ye-home-hero__lede">
              Safe, nurturing care where children learn through play, creativity and loving
              guidance.
            </p>
            <div className="ye-actions">
              <a
                className="ye-btn ye-btn-primary"
                href={youngEaglesRegistrationUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Register for 2027
                <FaArrowRight aria-hidden="true" />
              </a>
              <Link className="ye-btn ye-btn-outline" to="/programs">
                Explore programmes
              </Link>
            </div>
            <p className="ye-home-hero__reassurance">
              No payment required <span aria-hidden="true">•</span> We’ll guide you through the next steps
            </p>
          </div>

          <figure className="ye-home-hero__photo">
            <img
              src="/campus/campus-7-improved.png"
              alt="Children and a teacher playing together in the Young Eagles outdoor courtyard"
              fetchPriority="high"
              width="1086"
              height="1448"
            />
            <figcaption>Learning through play</figcaption>
          </figure>
        </div>
        <div className="ye-home-hero__edge" aria-hidden="true" />
      </section>

      <section className="ye-home-trust" aria-label="Young Eagles at a glance">
        <div className="ye-wrap">
          <ul className="ye-home-trust__list">
            {trustIndicators.map((indicator) => (
              <li key={indicator.label} className={`ye-home-trust__item ye-home-trust__item--${indicator.accent}`}>
                <span className="ye-home-trust__icon">
                  {React.createElement(indicator.icon, { 'aria-hidden': true })}
                </span>
                <span>{indicator.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ye-home-benefits" aria-labelledby="ye-benefits-title">
        <div className="ye-wrap">
          <div className="ye-home-benefits__heading">
            <h2 id="ye-benefits-title">Everything your child needs to thrive</h2>
          </div>
          <div className="ye-programme-highlights">
            {programmeHighlights.map((highlight) => (
              <article className={`ye-programme-highlight ye-programme-highlight--${highlight.accent}`} key={highlight.title}>
                <div className="ye-programme-highlight__icon">
                  {React.createElement(highlight.icon, { 'aria-hidden': true })}
                </div>
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
                <Link className="ye-text-link" to="/programs">
                  Explore programmes <FaArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ye-home-moments" aria-labelledby="ye-moments-title">
        <div className="ye-wrap">
          <div className="ye-section-heading">
            <p className="ye-eyebrow">The Young Eagles way</p>
            <h2 id="ye-moments-title">Little moments make a big beginning.</h2>
            <p>Our guiding idea is simple: learning should feel joyful, caring and full of possibility.</p>
          </div>
          <div className="ye-way-grid">
            {moments.map((moment) => (
              <article className={`ye-way-card ye-way-card--${moment.number}`} key={moment.number}>
                <span className="ye-moment__number">{moment.number}</span>
                {React.createElement(moment.icon, { className: 'ye-moment__icon', 'aria-hidden': true })}
                <div>
                  <h3>{moment.title}</h3>
                  <p>{moment.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ye-home-campus" aria-labelledby="ye-campus-title">
        <div className="ye-wrap ye-home-campus__layout">
          <div className="ye-home-campus__copy">
            <p className="ye-eyebrow">A glimpse of the day</p>
            <h2 id="ye-campus-title">Days worth sharing.</h2>
            <p>
              From shared activities to birthday celebrations, the school day is made up of small
              moments together.
            </p>
            <Link className="ye-text-link" to="/gallery">
              Explore school life <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="ye-photo-story">
            <figure className="ye-photo-story__large">
              <img
                src={homeStoryPhotos.funDay.src}
                alt={homeStoryPhotos.funDay.alt}
                loading="lazy"
                width="1800"
                height="1355"
              />
              <figcaption>{homeStoryPhotos.funDay.caption}</figcaption>
            </figure>
            <div className="ye-photo-story__stack">
              <figure className="ye-photo-story__small">
                <img
                  src={homeStoryPhotos.celebration.src}
                  alt={homeStoryPhotos.celebration.alt}
                  loading="lazy"
                  width="1800"
                  height="1355"
                />
                <figcaption>{homeStoryPhotos.celebration.caption}</figcaption>
              </figure>
              <figure className="ye-photo-story__small">
                <img
                  src={homeStoryPhotos.heritage.src}
                  alt={homeStoryPhotos.heritage.alt}
                  loading="lazy"
                  width="1800"
                  height="1355"
                />
                <figcaption>{homeStoryPhotos.heritage.caption}</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="ye-home-invite">
        <div className="ye-wrap ye-home-invite__inner">
          <div>
            <p className="ye-eyebrow ye-eyebrow--light">Your next step</p>
            <h2>Come and get to know Young Eagles.</h2>
            <p>Ask us about programmes, registration, or arranging a visit.</p>
          </div>
          <div className="ye-actions">
            <a
              className="ye-btn ye-btn-light"
              href={youngEaglesWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp aria-hidden="true" />
              Chat on WhatsApp
            </a>
            <a
              className="ye-btn ye-btn-on-dark"
              href={youngEaglesRegistrationUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Register for 2027
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductionHome;
