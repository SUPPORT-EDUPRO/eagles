import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

import SEOManager from '../components/SEO/SEOManager';
import PageHero from '../components/marketing/PageHero';
import { youngEaglesRegistrationUrl } from '../config/marketing';

const experiences = [
  {
    number: '01',
    title: 'Play & explore',
    description:
      'Curiosity starts with trying things out. Play gives children room to move, notice, ask questions and discover.',
    image: '/young-eagles-life/fun-day-circle.webp',
    alt: 'Children sitting in a circle during a Young Eagles Fun Day activity',
    note: 'Learning together',
  },
  {
    number: '02',
    title: 'Make & create',
    description:
      'Painting, making and building offer different ways for children to share what is in their imagination.',
    image: '/campus/campus-9.jpeg',
    alt: 'Small tables and colourful materials in a learning space',
    note: 'Time to make',
  },
  {
    number: '03',
    title: 'Stories & togetherness',
    description:
      'Stories and shared activities create space for listening, expressing ideas and enjoying time together.',
    image: '/young-eagles-life/fun-day-together.webp',
    alt: 'Children sitting together at a Young Eagles Fun Day event',
    note: 'Time together',
  },
];

function Programs() {
  return (
    <div className="ye-page ye-programmes">
      <SEOManager
        title="Programmes | Young Eagles Day Care"
        description="Explore how Young Eagles brings learning, play, care and creativity together in Mamelodi."
        keywords="Young Eagles programmes, Mamelodi day care, play and creativity"
        url="https://www.youngeagles.org.za/programs"
      />

      <PageHero
        kicker="How we learn"
        title="Play, care and creativity."
        lede="Every child brings their own curiosity. At Young Eagles, there is room to explore, make things and share ideas."
      />

      <section className="ye-experiences" aria-label="Learning experiences">
        <div className="ye-wrap">
          {experiences.map((experience, index) => (
            <article
              className={'ye-experience ' + (index % 2 === 1 ? 'ye-experience--reverse' : '')}
              key={experience.number}
            >
              <figure className="ye-experience__photo">
                <img src={experience.image} alt={experience.alt} loading="lazy" />
                <figcaption>{experience.note}</figcaption>
              </figure>
              <div className="ye-experience__copy">
                <p className="ye-experience__number">{experience.number}</p>
                <h2>{experience.title}</h2>
                <p>{experience.description}</p>
                <Link className="ye-text-link" to="/contact">
                  Ask us about programmes <FaArrowRight aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ye-page-cta">
        <div className="ye-wrap ye-page-cta__inner">
          <div>
            <p className="ye-eyebrow ye-eyebrow--light">Let’s talk</p>
            <h2>Find out what a day at Young Eagles could look like.</h2>
            <p>Contact us with your questions or arrange a time to visit.</p>
          </div>
          <div className="ye-actions">
            <Link className="ye-btn ye-btn-light" to="/contact">Contact us</Link>
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

export default Programs;
