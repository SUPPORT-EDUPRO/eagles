import React, { useMemo, useState } from 'react';
import SEOManager from '../components/SEO/SEOManager';
import SocialLinks from '../components/SocialLinks';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const images = [
    { src: '/campus/campus-1.jpeg', alt: 'Bright hallway to outdoor play at Young Eagles', caption: 'Our Welcoming Space', category: 'campus' },
    { src: '/campus/campus-2.jpeg', alt: 'Young Eagles uniform and branding', caption: 'Our Brand', category: 'branding' },
    { src: '/campus/campus-3.jpeg', alt: 'Safe, bright corridors at Young Eagles', caption: 'Safe & Bright Facilities', category: 'campus' },
    { src: '/campus/campus-4.jpeg', alt: 'Group activity in the hall', caption: 'Learning Together', category: 'learning' },
    { src: '/campus/campus-5.jpeg', alt: 'Our learners in uniform', caption: 'A Day at Young Eagles', category: 'learners' },
    { src: '/campus/campus-6.jpeg', alt: 'Outdoor patio and celebrations', caption: 'Events & Fun', category: 'events' },
    { src: '/campus/campus-7.jpeg', alt: 'Clean, connected campus spaces', caption: 'Our Campus', category: 'campus' },
    { src: '/campus/campus-8.jpeg', alt: 'Young Eagles preschool environment', caption: 'Campus Life', category: 'campus' },
    { src: '/campus/campus-9.jpeg', alt: 'Young Eagles preschool', caption: 'Our Environment', category: 'learning' },
    { src: '/campus/campus-10.jpeg', alt: 'Young Eagles Day Care Centre', caption: 'Where Learning Meets Love', category: 'branding' },
  ];

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'campus', label: 'Campus' },
    { id: 'learning', label: 'Learning' },
    { id: 'learners', label: 'Learners' },
    { id: 'events', label: 'Events' },
    { id: 'branding', label: 'Branding' },
  ];

  const filteredImages = useMemo(
    () => (activeCategory === 'all' ? images : images.filter((image) => image.category === activeCategory)),
    [activeCategory]
  );

  return (
    <>
      <SEOManager
        title="Photo Gallery - Young Eagles Education Platform"
        description="Explore moments from Young Eagles preschool. See our children learning, playing, and growing together."
        keywords="Young Eagles gallery, preschool photos, children activities, daycare moments"
        url="https://www.youngeagles.org.za/gallery"
      />

      <div className="min-h-screen bg-slate-50 pt-16 pb-10 md:pb-12">
        <section
          className="relative text-white py-14 md:py-20 overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, rgba(37, 99, 235, 0.84), rgba(79, 70, 229, 0.78), rgba(29, 78, 216, 0.84)), url('/campus/campus-1.jpeg')"
          }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Young Eagles Gallery</h1>
            <p className="text-base sm:text-lg md:text-2xl opacity-95 max-w-3xl mx-auto">
              Real moments from our campus, classrooms, and celebrations.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
              <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1.5 font-medium">Real campus photos</span>
              <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1.5 font-medium">Safe learning spaces</span>
              <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1.5 font-medium">Trusted by 200+ families</span>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="mt-8 md:mt-10 mb-7 md:mb-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-3.5 md:px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 aspect-square bg-white"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading={index < 6 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-bold text-lg">{image.caption}</h3>
                    <p className="text-sm opacity-90">{image.alt}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white">
                  <span className="font-semibold text-sm">{image.caption}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 md:mt-16 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Want to See More?</h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 opacity-95">
              Visit us in person and experience the Young Eagles difference firsthand!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/contact"
                className="inline-block bg-white text-indigo-700 px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Schedule a Tour
              </a>
              <a
                href="/programs"
                className="inline-block border border-white/60 bg-white/10 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-white/20 transition-all"
              >
                Explore Programs
              </a>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">Follow Young Eagles on Facebook, TikTok, and WhatsApp</p>
            <div className="flex justify-center">
              <SocialLinks
                linkClassName="text-slate-800 hover:text-indigo-700 focus-visible:outline-indigo-600"
                iconClassName="text-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
