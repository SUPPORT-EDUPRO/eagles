import React, { useState } from 'react';
import { FaArrowRight, FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

import SEOManager from '../components/SEO/SEOManager';
import SocialLinks from '../components/SocialLinks';
import PageHero from '../components/marketing/PageHero';
import databaseService from '../services/DatabaseService';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  childAge: '',
  message: '',
  program: '',
  visitPreference: '',
};

const schoolAddress = '7118 Section U Shabangu Street, Mamelodi Pretoria 0122';
const navigationPin = '848 Shabanbu Avenue, Mamelodi, Pretoria 0122';

function Contact() {
  const [formData, setFormData] = useState(emptyForm);
  const [submissionError, setSubmissionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (submissionError) setSubmissionError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionError('');
    setIsSubmitting(true);

    const subjects = {
      programmes: 'Programme question',
      registration: 'Registration question',
      visit: 'Visit request',
      other: 'General question',
    };
    const additionalDetails = [
      formData.childAge ? 'Child’s age: ' + formData.childAge : '',
      formData.visitPreference ? 'Preferred visit time: ' + formData.visitPreference : '',
    ].filter(Boolean);
    const message = [formData.message.trim(), ...additionalDetails].filter(Boolean).join('\n\n');

    try {
      const result = await databaseService.submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: subjects[formData.program] || 'General enquiry',
        message,
      });

      if (!result?.success) {
        setSubmissionError(
          'We could not send your enquiry just now. No message was sent. Please call 081 523 6000 or email info@youngeagles.org.za; your answers are still in the form.'
        );
        return;
      }

      setFormData(emptyForm);
      setIsSubmitted(true);
    } catch {
      setSubmissionError(
        'We could not send your enquiry just now. No message was sent. Please call 081 523 6000 or email info@youngeagles.org.za; your answers are still in the form.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ye-page ye-contact">
      <SEOManager
        title="Contact Young Eagles | Mamelodi"
        description="Contact Young Eagles Day Care in Mamelodi by phone, email, or visit."
        keywords="contact Young Eagles, Mamelodi day care, arrange a visit"
        url="https://www.youngeagles.org.za/contact"
      />

      <PageHero
        kicker="Talk to us"
        title="We’re here to help you take the next step."
        lede="Ask about registration, programmes, or arranging a visit to Young Eagles in Mamelodi."
      />

      <section className="ye-contact-main" aria-label="Contact Young Eagles">
        <div className="ye-wrap ye-contact-layout">
          <div className="ye-contact-details">
            <div className="ye-contact-details__intro">
              <p className="ye-eyebrow">Young Eagles Day Care</p>
              <h2>Choose the easiest way to reach us.</h2>
              <p>We’re happy to hear from families with questions about the school.</p>
            </div>

            <div className="ye-contact-detail">
              <span className="ye-contact-detail__icon"><FaPhone aria-hidden="true" /></span>
              <div>
                <h3>Call</h3>
                <a href="tel:+27815236000">081 523 6000 (Main)</a>
                <a href="tel:+27674942359">067 494 2359 (Secondary)</a>
              </div>
            </div>

            <div className="ye-contact-detail">
              <span className="ye-contact-detail__icon"><FaEnvelope aria-hidden="true" /></span>
              <div>
                <h3>Email</h3>
                <a href="mailto:info@youngeagles.org.za">info@youngeagles.org.za</a>
                <a href="mailto:admin@youngeagles.org.za">admin@youngeagles.org.za</a>
              </div>
            </div>

            <div className="ye-contact-detail">
              <span className="ye-contact-detail__icon"><FaMapMarkerAlt aria-hidden="true" /></span>
              <div>
                <h3>Visit</h3>
                <p>{schoolAddress}</p>
                <p className="ye-contact-detail__note">Directions pin: {navigationPin}</p>
                <a
                  className="ye-text-link ye-contact-map"
                  href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(navigationPin)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open address in Maps <FaArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="ye-contact-detail">
              <span className="ye-contact-detail__icon"><FaClock aria-hidden="true" /></span>
              <div>
                <h3>Hours listed by the school</h3>
                <p>Monday–Friday: 7:00 AM–6:00 PM</p>
                <p>Saturday: 8:00 AM–4:00 PM</p>
              </div>
            </div>

            <div className="ye-contact-social">
              <h3>Follow Young Eagles</h3>
              <SocialLinks
                linkClassName="ye-contact-social__link"
                iconClassName="text-lg"
              />
            </div>
          </div>

          <div className="ye-contact-form-wrap">
            <div className="ye-contact-form-heading">
              <p className="ye-eyebrow">Send an enquiry</p>
              <h2>What would you like to know?</h2>
              <p>Share a few details and we’ll help you find the right next step.</p>
            </div>

            {submissionError && (
              <p className="ye-form-error" role="alert">
                {submissionError}
              </p>
            )}

            {isSubmitted ? (
              <div className="ye-form-success" role="status">
                <h3>Thank you for getting in touch.</h3>
                <p>Your enquiry has been sent to Young Eagles.</p>
                <button className="ye-btn ye-btn-outline" type="button" onClick={() => setIsSubmitted(false)}>
                  Send another enquiry
                </button>
              </div>
            ) : (
            <form className="ye-contact-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
              <div className="ye-form-row">
                <label>
                  <span>Full name <span aria-hidden="true">*</span></span>
                  <input
                    autoComplete="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </label>
                <label>
                  <span>Email address <span aria-hidden="true">*</span></span>
                  <input
                    autoComplete="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>

              <div className="ye-form-row">
                <label>
                  <span>Phone number</span>
                  <input
                    autoComplete="tel"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                  />
                </label>
                <label>
                  <span>Child’s age, if relevant</span>
                  <input
                    name="childAge"
                    value={formData.childAge}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </label>
              </div>

              <label>
                <span>Question about</span>
                <select name="program" value={formData.program} onChange={handleChange}>
                  <option value="">Choose a topic</option>
                  <option value="programmes">Programmes</option>
                  <option value="registration">Registration</option>
                  <option value="visit">Arranging a visit</option>
                  <option value="other">Something else</option>
                </select>
              </label>

              <fieldset className="ye-visit-preference">
                <legend>Preferred time to visit, if arranging a visit</legend>
                <div>
                  {[
                    { value: 'morning', label: 'Morning' },
                    { value: 'afternoon', label: 'Afternoon' },
                    { value: 'weekend', label: 'Weekend' },
                  ].map((option) => (
                    <label key={option.value}>
                      <input
                        type="radio"
                        name="visitPreference"
                        value={option.value}
                        checked={formData.visitPreference === option.value}
                        onChange={handleChange}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label>
                <span>Your message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write your question here"
                />
              </label>

              <button
                className="ye-btn ye-btn-primary ye-contact-submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Send enquiry'}
                {!isSubmitting && <FaArrowRight aria-hidden="true" />}
              </button>
              <p className="ye-form-note">
                If you prefer, you can contact the school directly using the phone or email details
                on this page.
              </p>
            </form>
            )}
          </div>
        </div>
      </section>

      <section className="ye-contact-questions">
        <div className="ye-wrap ye-contact-questions__inner">
          <div>
            <p className="ye-eyebrow">A good first conversation</p>
            <h2>Bring the questions that matter to your family.</h2>
          </div>
          <ul>
            <li>Which programmes are currently available?</li>
            <li>What should we know before registering?</li>
            <li>When can we arrange a visit?</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Contact;
