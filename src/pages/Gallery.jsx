import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaExpand, FaTimes } from 'react-icons/fa';

import SEOManager from '../components/SEO/SEOManager';
import SocialLinks from '../components/SocialLinks';
import PageHero from '../components/marketing/PageHero';
import { galleryCategories, galleryPhotos } from '../data/publicPhotos';

function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const returnFocusRef = useRef(null);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  const filteredImages = useMemo(
    () => (activeCategory === 'all'
      ? galleryPhotos
      : galleryPhotos.filter((image) => image.category === activeCategory)),
    [activeCategory]
  );

  const selectedIndex = selectedPhotoId
    ? filteredImages.findIndex((image) => image.id === selectedPhotoId)
    : -1;
  const selectedPhoto = selectedIndex >= 0 ? filteredImages[selectedIndex] : null;

  const closeLightbox = useCallback(() => {
    setSelectedPhotoId(null);
    requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);

  const openLightbox = (photo, trigger) => {
    returnFocusRef.current = trigger;
    setSelectedPhotoId(photo.id);
  };

  const showPhoto = useCallback((offset) => {
    const nextIndex = (selectedIndex + offset + filteredImages.length) % filteredImages.length;
    setSelectedPhotoId(filteredImages[nextIndex].id);
  }, [filteredImages, selectedIndex]);

  useEffect(() => {
    if (!selectedPhoto) return undefined;

    closeButtonRef.current?.focus();
    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showPhoto(-1);
      if (event.key === 'ArrowRight') showPhoto(1);
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeLightbox, selectedPhoto, showPhoto]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setSelectedPhotoId(null);
  };

  return (
    <div className="ye-page ye-gallery">
      <SEOManager
        title="Gallery | Young Eagles Day Care"
        description="See school life, celebrations, Fun Day and Heritage Day photographs from Young Eagles in Mamelodi."
        keywords="Young Eagles gallery, Mamelodi school photos, Fun Day, Heritage Day"
        url="https://www.youngeagles.org.za/gallery"
      />

      <PageHero
        kicker="A look around"
        title="The moments that make up a school day."
        lede="From everyday learning to celebrations and special days, this is a glimpse of life at Young Eagles."
      />

      <section className="ye-gallery-content" aria-label="Young Eagles photo gallery">
        <div className="ye-wrap">
          <div className="ye-gallery-toolbar">
            <p aria-live="polite">
              <strong>{filteredImages.length}</strong> {filteredImages.length === 1 ? 'photo' : 'photos'} to explore
            </p>
            <div className="ye-gallery-filters" role="group" aria-label="Filter photos by category">
              {galleryCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={activeCategory === category.id}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="ye-gallery-grid">
            {filteredImages.map((image, index) => (
              <article
                className="ye-gallery-item"
                key={image.id}
                data-gallery-index={index % 6}
              >
                <button
                  type="button"
                  aria-label={`Open photo: ${image.caption}`}
                  onClick={(event) => openLightbox(image, event.currentTarget)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index < 3 ? 'eager' : 'lazy'}
                  />
                  <span className="ye-gallery-item__caption" aria-hidden="true">
                    <span>{image.caption}</span>
                    <FaExpand />
                  </span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ye-gallery-visit">
        <div className="ye-wrap ye-gallery-visit__inner">
          <div>
            <p className="ye-eyebrow ye-eyebrow--light">See it for yourself</p>
            <h2>There’s more to a school than a photograph.</h2>
            <p>Talk to us about arranging a visit to Young Eagles.</p>
          </div>
          <Link className="ye-btn ye-btn-light" to="/contact">
            Arrange a visit <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="ye-gallery-social">
        <div className="ye-wrap">
          <p>Keep up with Young Eagles</p>
          <SocialLinks
            linkClassName="ye-gallery-social__link"
            iconClassName="text-lg"
          />
        </div>
      </div>

      {selectedPhoto && (
        <div
          className="ye-lightbox"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <section
            ref={dialogRef}
            className="ye-lightbox__dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`Photo: ${selectedPhoto.caption}`}
          >
            <div className="ye-lightbox__topbar">
              <p>{selectedPhoto.caption}</p>
              <button
                ref={closeButtonRef}
                className="ye-lightbox__close"
                type="button"
                onClick={closeLightbox}
                aria-label="Close photo"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>
            <div className="ye-lightbox__media">
              <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
            </div>
            <div className="ye-lightbox__controls">
              <button type="button" onClick={() => showPhoto(-1)}>
                <FaArrowLeft aria-hidden="true" /> Previous
              </button>
              <p>{selectedIndex + 1} of {filteredImages.length}</p>
              <button type="button" onClick={() => showPhoto(1)}>
                Next <FaArrowRight aria-hidden="true" />
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Gallery;
